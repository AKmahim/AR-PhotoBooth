#here we will tring to overlay a png image over our live camera video

import cvzone 
import cv2
import numpy as np

# ================= this code is for overlay a png on image ========


#import main.jpg image
imgBack = cv2.imread("main.jpg")
#import watermark image
imgFront = cv2.imread("watermark.png",cv2.IMREAD_UNCHANGED)

#resize the image
imgFront = cv2.resize(imgFront,(0,0),None,0.2,0.2)

#find both image shape and position 
hf,wf,cf = imgFront.shape
hb,wb,cb = imgBack.shape

#overlay watermark on the main image
imgResult = cvzone.overlayPNG(imgBack,imgFront,[0,hb-hf])

#show the result
cv2.imshow("image",imgResult)

cv2.waitKey(0)
