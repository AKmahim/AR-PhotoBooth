import numpy as np
import mediapipe as mp
import cv2

# Initialize the Selfie Segmentation model
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)

# Load the background image
background = cv2.imread("gphouse.jpeg")

# Initialize the webcam
cap = cv2.VideoCapture(1)

while cap.isOpened():
    ret, frame = cap.read()
    
    if not ret:
        continue
    
    height, width, _ = frame.shape
    RGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    results = segmentation.process(RGB)
    mask = results.segmentation_mask
    
    rsm = np.stack((mask,) * 3, axis=-1)
    condition = rsm > 0.6
    
    # Resize the background image to match the video frame size
    background = cv2.resize(background, (width, height))
    
    # Resize the condition mask to match the frame size
    condition = cv2.resize(condition.astype(np.uint8), (width, height))
    
    output = np.where(condition, frame, background)
    
    cv2.imshow("output", output)
    
    k = cv2.waitKey(30) & 0xFF
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
