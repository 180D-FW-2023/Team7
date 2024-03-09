# importing the necessary libraries
import cv2
import time
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

# Get our display dimensions
displayWidth = display.width # 128 in this case
displayHeight = display.height # 32 in this case 

# Files for the code to choose from 
files = ["Phantom Menace.mp4", "Return Of The Jedi.gif", "New Hope.gif", "Empire Strikes Back.gif"]

# Creating a VideoCapture object to read the video, picks one of the movies
# Also prints what movie is playing (removes file extension)
randomVideo = files[random.randint(0, len(files) - 1)]
print ("Now Playing: " + randomVideo.split('.')[0])
cap = cv2.VideoCapture(randomVideo)

# Loop until the end of the video
while (cap.isOpened()):
 
    # Capture frame-by-frame
    ret, frame = cap.read()

    # If we reach the end of the movie
    if not ret:
        break 

    ## Display the current frame
    # cv2.imshow('Frame', frame)
 
    # Resize so it fits on our display
    frame = cv2.resize(frame, (displayWidth, displayHeight), interpolation = cv2.INTER_LINEAR)
    
    # Use the cvtColor() function to grayscale the image 
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) 
  
    # Converting to its binary form 
    ret, bw_img = cv2.threshold(frame, 127, 255, cv2.THRESH_BINARY) 
  
    ## Display the binary resized frame
    # cv2.imshow("Binary", bw_img) 

    # Clear the previous image
    display.fill(0)

    # Traverse the image, if the value is 0 (black) do nothing, 
    #                     if it is 255 (white) set the pixel to white
    for i in range(displayWidth):
        for j in range(displayHeight):
            if (bw_img[j,i]): # Black pixels will be 0 (false)
                display.pixel(i,j,1)

    # Show the image
    display.show()

    # Hold the frame on the display for half a second
    time.sleep(.5)

    # define q as the exit button
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break
 
# release the video capture object
cap.release()

# # Closes all the windows currently opened.
# cv2.destroyAllWindows()

print("Thanks for watching!")