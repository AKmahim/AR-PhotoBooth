import numpy as np
import mediapipe as mp
import cv2
import time
from flask import Flask, render_template, Response

app = Flask(__name__)

# Initialize the Selfie Segmentation model
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Load the video to use as the background
background_video = cv2.VideoCapture("static/gp.mp4")

# Flag to track whether to capture a picture
capture_image = False

# Delay in seconds before capturing the picture (5 seconds)
delay_seconds = 5

@app.route('/')
def index():
    return render_template('index.html')

def gen():
    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            continue

        # Mirror the frame horizontally
        frame = cv2.flip(frame, 1)

        height, width, _ = frame.shape
        RGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = segmentation.process(RGB)
        mask = results.segmentation_mask

        rsm = np.stack((mask,) * 3, axis=-1)
        condition = rsm > 0.6

        # Read a frame from the background video
        ret_bg, frame_bg = background_video.read()

        # Check if the background video has ended, and loop it if necessary
        if not ret_bg:
            background_video.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret_bg, frame_bg = background_video.read()

        # Resize the background frame to match the video frame size
        frame_bg = cv2.resize(frame_bg, (width, height))

        output = np.where(condition, frame, frame_bg)

        # Encode the image to JPEG format
        _, buffer = cv2.imencode('.jpg', output)
        image_bytes = buffer.tobytes()

        # Check if it's time to capture the image
        if capture_image:
            # Generate a unique filename based on the current time
            current_time = time.strftime("%Y%m%d%H%M%S")
            filename = f"static/captured_image_{current_time}.jpg"
            # Save the image
            cv2.imwrite(filename, output)
            print(f"Image saved as {filename}")
            # Reset the capture_image flag
            capture_image = False

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

@app.route('/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/capture', methods=['POST'])
def capture():
    global capture_image
    capture_image = True
    return 'Image captured successfully!'

if __name__ == '__main__':
    app.run(debug=True)
