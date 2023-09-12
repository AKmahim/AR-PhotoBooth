#this the project demo for remove background and add background video with mirror effect


import numpy as np
import mediapipe as mp
import cv2

# Initialize the Selfie Segmentation model
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Load the video to use as the background
background_video = cv2.VideoCapture("gp.mp4")

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
    
    cv2.imshow("output", output)
    
    k = cv2.waitKey(30) & 0xFF
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
