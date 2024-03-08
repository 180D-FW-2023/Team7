# Requirements for the image conversion
import cv2 
from PIL import Image 
import numpy as np

# Requirements for the display 
from board import SCL, SDA, D4
import busio
import digitalio
import adafruit_ssd1305

# Setup the display
oled_reset = digitalio.DigitalInOut(D4)
i2c = busio.I2C(SCL, SDA)
display = adafruit_ssd1305.SSD1305_I2C(128, 32, i2c, addr=0x3C, reset=oled_reset)

  
# read the image file 
img = cv2.imread('pikachu_test.jpg', 2) 

# Resize the image adding black boarders on the outside
# Screen resolution 
IMG_COL = 32
IMG_ROW = 128
# Resize to fit resolution
border_v = 0
border_h = 0
if (IMG_COL/IMG_ROW) >= (img.shape[0]/img.shape[1]):
    border_v = int((((IMG_COL/IMG_ROW)*img.shape[1])-img.shape[0])/2)
else:
    border_h = int((((IMG_ROW/IMG_COL)*img.shape[0])-img.shape[1])/2)
img = cv2.copyMakeBorder(img, border_v, border_v, border_h, border_h, cv2.BORDER_CONSTANT, 0)
img = cv2.resize(img, (IMG_ROW, IMG_COL))
  
ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 
  

# Convert to binary 
bw = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 

# cv2.imshow("Binary", bw_img) 
# cv2.waitKey(0) 
# cv2.destroyAllWindows() 

# initializes a 32 by 128 array matrix all with 0's
pixels =  np.zeros((32, 128))
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

display.show()


for x in range(128):
    for y in range(32):
        display.pixel(x,y,pixels[y,x])
# # Set a pixel in the origin 0,0 position.
# display.pixel(0, 0, 1)
# # Set a pixel in the middle 64, 16 position.
# display.pixel(64, 16, 1)
# # Set a pixel in the opposite 127, 31 position.
# display.pixel(127, 31, 1)
display.show()