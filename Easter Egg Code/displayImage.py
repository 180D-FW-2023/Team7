# Requirements for the image conversion
import cv2 
import numpy as np
import random

# Requirements for the display 
from board import SCL, SDA, D4
import busio
import digitalio
import adafruit_ssd1305

# Setup the display
oled_reset = digitalio.DigitalInOut(D4)
i2c = busio.I2C(SCL, SDA)
display = adafruit_ssd1305.SSD1305_I2C(128, 32, i2c, addr=0x3C, reset=oled_reset)

  
# Read the image file 
files = ["Smart Shelves.png"]
img = cv2.imread(files[random.randint(0, len(files) - 1)], 2) 

# # Convert to gray scale
# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 

# Resize the image adding black boarders on the outside
# Screen resolution 
IMG_COL = 32 # length of columns 
IMG_ROW = 128 # length of rows
# Resize to fit resolution
border_v = 0
border_h = 0
if (IMG_COL/IMG_ROW) >= (img.shape[0]/img.shape[1]):
    border_v = int((((IMG_COL/IMG_ROW)*img.shape[1])-img.shape[0])/2)
else:
    border_h = int((((IMG_ROW/IMG_COL)*img.shape[0])-img.shape[1])/2)
img = cv2.copyMakeBorder(img, border_v, border_v, border_h, border_h, cv2.BORDER_CONSTANT, 0)
img = cv2.resize(img, (IMG_ROW, IMG_COL))

# Convert to binary (this must be in gray scale)
ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 

## Uncomment if testing on a computer
# cv2.imshow("Binary", bw_img) 
# cv2.waitKey(0) 
# cv2.destroyAllWindows() 

# initializes a 32 by 128 array matrix all with 0's
pixels =  np.zeros((IMG_COL, IMG_ROW))
# print("Creating 2D empty list of zeros: ", pixels)

for x in range(IMG_COL):
    pixels[x,:] = bw_img[x, :]

# Convert all the white pixels to 1
pixels[pixels == 255] = 1

# print(pixels[0,:])
# print(pixels.shape)

# Clear the display.  Always call show after changing pixels to make the display
# update visible!
display.fill(0)

for i in range(IMG_ROW):
    for j in range(IMG_COL):
        display.pixel(i,j,pixels[j,i])
display.show()