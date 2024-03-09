# importing the necessary libraries
import cv2
import numpy as np
import time
 
# Requirements for the display 
from board import SCL, SDA, D4
import busio
import digitalio
import adafruit_ssd1305

# Setup the display
oled_reset = digitalio.DigitalInOut(D4)
i2c = busio.I2C(SCL, SDA)
display = adafruit_ssd1305.SSD1305_I2C(128, 32, i2c, addr=0x3C, reset=oled_reset)

  


# Creating a VideoCapture object to read the video
cap = cv2.VideoCapture('PhantomMenace.mp4')
 
 
# Loop until the end of the video
while (cap.isOpened()):
 
    # Capture frame-by-frame
    ret, frame = cap.read()

    # # Display the current frame
    # cv2.imshow('Frame', frame)
 
    # Resize so it fits on our display
    frame = cv2.resize(frame, (128, 32), interpolation = cv2.INTER_LINEAR)
    
    # Use the cvtColor() function to grayscale the image 
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
  
    # Converting to its binary form 
    ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 
  
    # # Display the binary resized frame
    # cv2.imshow("Binary", bw_img) 

    # initializes a 32 by 128 array matrix all with 0's
    pixels =  np.zeros((32, 128))
    # print("Creating 2D empty list of zeros: ", pixels)

    for x in range(32):
        pixels[x,:] = bw_img[x, :]

    # Convert all the white pixels to 1
    pixels[pixels == 255] = 1

    display.fill(0)

    display.show()

    for i in range(128):
        for j in range(32):
            display.pixel(i,j,pixels[j,i])
    display.show()

    time.sleep(.5)
    # define q as the exit button
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break
 
# release the video capture object
cap.release()
# # Closes all the windows currently opened.
# cv2.destroyAllWindows()