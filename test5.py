import numpy as np
import mediapipe as mp
import cv2
import time

# Initialize the Selfie Segmentation model
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Load the video to use as the background
background_video = cv2.VideoCapture("gp.mp4")

# Load the watermark image
watermark = cv2.imread("watermark2.png", -1)  # Use -1 to load the alpha channel

# Flag to track whether to capture a picture
capture_image = False

# Delay in seconds before capturing the picture (5 seconds)
delay_seconds = 5

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
    
    # Add the watermark in the bottom left corner
    watermark_height, watermark_width, _ = watermark.shape
    
    # Resize the watermark to fit the frame if it's too large
    if watermark_height > height or watermark_width > width:
        watermark = cv2.resize(watermark, (width // 2, height // 2))
        watermark_height, watermark_width, _ = watermark.shape
    
    y_offset = height - watermark_height
    x_offset = 0
    
    # Overlay the watermark onto the output frame
    for c in range(0, 3):
        output[y_offset:y_offset + watermark_height, x_offset:x_offset + watermark_width, c] = \
            output[y_offset:y_offset + watermark_height, x_offset:x_offset + watermark_width, c] + \
            watermark[:, :, c] * (watermark[:, :, 3] / 255.0)
    
    cv2.imshow("output", output)
    
    # Check if it's time to capture the image
    if capture_image:
        # Capture the current frame with the new background and watermark
        image_to_save = output.copy()
        # Generate a unique filename based on the current time
        current_time = time.strftime("%Y%m%d%H%M%S")
        filename = f"captured_image_{current_time}.jpg"
        # Save the image
        cv2.imwrite(filename, image_to_save)
        print(f"Image saved as {filename}")
        # Reset the capture_image flag
        capture_image = False
    
    # Wait for a key press
    k = cv2.waitKey(30) & 0xFF
    
    # Press 'c' to capture the image
    if k == ord('c'):
        capture_image = True
    
    # Press 'q' to exit
    if k == 27:
        break
    
    # Sleep for the specified delay
    if cv2.waitKey(1) & 0xFF == 27:
        start_time = time.time()
        while time.time() - start_time < delay_seconds:
            pass

cap.release()
cv2.destroyAllWindows()
