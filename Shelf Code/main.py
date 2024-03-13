import time
import board
from cedargrove_nau7802 import NAU7802
import adafruit_sht4x
import busio
import adafruit_ltr390
import cv2
from pyzbar.pyzbar import decode
import os 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import subprocess
import digitalio
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1305
from requests import get
import urllib.request
from berryIMU import *
import random

# Be sure to update this line
# i.e. "/Scale_2/"
scale_id = "/Scale_1/"

# Degree sign const for easy use later on
degree_sign = u'\N{DEGREE SIGN}'
# Tuned to account for small bumps on the scale when placing and removing containers
# units are grams, +/-1 gram 
thresholdMass = 27 

# Threshold in angles for IMU tilt warning
threshold = 5

# Prepare the display
i2c = busio.I2C(board.SCL, board.SDA)
oled_reset = digitalio.DigitalInOut(board.D4)
disp = adafruit_ssd1305.SSD1305_I2C(128, 32, i2c, reset=oled_reset)

# Clear display.
disp.fill(0)
disp.show()

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
width = disp.width
height = disp.height
image = Image.new("1", (width, height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Draw a black filled box to clear the image.
draw.rectangle((0, 0, width, height), outline=0, fill=0)

# Draw some shapes.
# First define some constants to allow easy resizing of shapes.
padding = -2
top = padding
bottom = height - padding
# Move left to right keeping track of the current x position for drawing shapes.
x = 0

# Load default font.
font = ImageFont.load_default()

""" Display status messages on the OLED """
def display_message(line1 = "", line2 = "", line3 ="", line4 = ""):

    # Draw a black filled box to clear the image.
    draw.rectangle((0, 0, width, height), outline=0, fill=0)

    # Draw our four lines of text
    draw.text((x, top + 0),  line1, font=font, fill=255)
    draw.text((x, top + 8),  line2, font=font, fill=255)
    draw.text((x, top + 16), line3, font=font, fill=255)
    draw.text((x, top + 25), line4, font=font, fill=255)

    # Display image.
    disp.image(image)
    disp.show()
    time.sleep(0.1)

def display_countdown_message(line1 = "", line2 = "", line3 ="", amountOfTime = 5):
    for i in reversed(range(amountOfTime)):
        display_message(line1, line2,  line3, "(" + str(i+1) + ")")
        time.sleep(1)

print("SSD1305 DISPLAY READY")

path = "Easter Egg Movies"
movie_list = os.listdir(path)
print("Movies in ", path, " Folder:")
print(movie_list)

def easterEgg():
    randomMovie = movie_list[random.randint(0, len(movie_list) - 1)]
    print("=====")
    print ("Now Playing: " + randomMovie.split('.')[0])
    display_message("Now Playing: ", randomMovie.split('.')[0])
    time.sleep(1)
    cap = cv2.VideoCapture("Easter Egg Movies/" + str(randomMovie))

    # Loop until the end of the video and while the toggle is on
    while (cap.isOpened() and get_easter_egg_status()):
    
        # Capture frame-by-frame
        ret, frame = cap.read()

        # If we reach the end of the movie
        if not ret:
            break 
    
        # Resize so it fits on our display
        frame = cv2.resize(frame, (width, height), interpolation = cv2.INTER_LINEAR)

        # Use the cvtColor() function to grayscale the image 
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) 
    
        # Converting to its binary form 
        ret, bw_img = cv2.threshold(frame, 127, 255, cv2.THRESH_BINARY) 

        # Clear the previous image
        disp.fill(0)

        # Traverse the image, if the value is 0 (black) do nothing, 
        #                     if it is 255 (white) set the pixel to white
        for i in range(width):
            for j in range(height):
                if (bw_img[j,i]): # Black pixels will be 0 (false)
                    disp.pixel(i,j,1)

        # Show the image
        disp.show()

        # Hold the frame on the display for half a second
        time.sleep(.5)

        # define q as the exit button
        # if cv2.waitKey(25) & 0xFF == ord('q'):
            # break
        
    # release the video capture object
    cap.release()

    print("Thanks for watching!")
    display_message("Thanks for", "watching!")

def display_logo():

    img = cv2.imread("Smart Shelves.png", 2) 

    img = cv2.resize(img, (width, height), interpolation = cv2.INTER_LINEAR)

    # Convert to binary
    ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 
    disp.fill(0)
    # Traverse the image, if the value is 0 (black) do nothing, 
    #                     if it is 255 (white) set the pixel to white
    for i in range(width):
        for j in range(height):
            if (bw_img[j,i]): # Black pixels will be 0 (false)
                disp.pixel(i,j,1)
    # Show the image
    disp.show()

display_logo()

# Fetch the service account key JSON file contents
cred = credentials.Certificate('ece-180-project-firebase-adminsdk-7eg04-74b6c29e0b.json')
#                               ^ DO NOT PUSH THIS JSON FILE TO GITHUB, CONTAINS ACCESS TOKENS!!!

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ece-180-project-default-rtdb.firebaseio.com/'
})

# Set the database reference, based on the scale_id set above
ref = db.reference(scale_id)

# update_firebase_container(Container Name, Parameter to Update, Value to Update to)
# Example usage update_firebase_container("Container_1", "Current Mass", val) 
# Note the container names have underscores while the parameters do not
def update_firebase_container(container, parameter, updated_value):
	ref.child(container).update({parameter:updated_value})

# update_firebase(Parameter to Update, Value to Update to)
# Example usage update_firebase_scale("Scale UV", val) 
def update_firebase_scale(parameter, updated_value):
	ref.update({parameter:updated_value})

# Pull the scale's gain from Firebase, returns a float
def get_scale_gain():
	return ref.child("Scale Gain").get()

def get_easter_egg_status():
    return db.reference("Easter Egg").child("Toggle").get()


# Pull the last known initial mass from Firebase
# If it is zero we register a new mass
# If it is less than what we measured, the initial mass = measured mass
def get_initial_mass(container):
    # Get a database reference to our posts
    initialMass = db.reference(scale_id + container + "/Initial Container Mass" )
    return initialMass.get()

# Pull the user's set container name from Firebase
# This is set in the UI
def get_name(container):
    # Get a database reference to our posts
    name = db.reference(scale_id + container + "/Container Name" )
    return name.get()

"""" Obtain the local and public IP address of the Pi + print to console + display """
cmd = "hostname -I | cut -d' ' -f1"
local_ip = str(subprocess.check_output(cmd, shell=True).decode("utf-8"))
print("Local IP: " + local_ip)
external_ip = urllib.request.urlopen('https://4.ident.me').read().decode('utf8')
print("Public IP: " + str(external_ip))
update_firebase_scale("External IP", str(external_ip))
update_firebase_scale("Local IP", str(local_ip))
# display_message("Local IP", local_ip, "External IP", external_ip)

# define the variables that will store information, all are floats
loadCellMass = gain = 0.0 # Used for NAU7802 (ADC)
sht_temperature = sht_relative_humidity = 0.0 # Used for SHT40 (temp + humidity sensor)
ltr_uvi = ltr_lux = 0.0 # Used for LTR390 (UV + LUX sensor)

# Get readings and round them accordingly, this updates the variables defined above and pushes them to Firebase
def getSensorReadings():
    global loadCellMass
    global sht_temperature
    global sht_relative_humidity
    global ltr_uvi
    global ltr_lux

    # get the raw value around to a whole number and multiply by gain
    loadCellMass = round(read_raw_value() * gain, 1)
    if loadCellMass < 0.0:
         loadCellMass = 0.0

    # get the temperature (C) and round to one decimal
    sht_temperature = round(sht.temperature, 1)

    # get the humidity (%) and round to one decimal
    sht_relative_humidity = round(sht.relative_humidity, 1)

    # get the UV index and round to one decimal
    ltr_uvi = round(ltr.uvi, 1)

    # get the LUX level and round to whole number
    ltr_lux = round(ltr.lux)
    
    # push these values to Firebase 
    update_firebase_scale("Scale Mass",loadCellMass) 
    update_firebase_scale("Scale Temperature", sht_temperature) 
    update_firebase_scale("Scale Humidity", sht_relative_humidity) 
    update_firebase_scale("Scale UV", ltr_uvi) 
    update_firebase_scale("Scale Lux", ltr_lux) 

    # Print the sensor readings to console for logging purposes
    print("=====")

    print('NAU7802: Mass = ' + str(loadCellMass) + 'g')

    print('SHT4X: Temperature = ' + str(sht_temperature) + degree_sign + 'C, Humidity = ' + str(sht_relative_humidity) + '%')

    print('LTR390: UV Index = ' + str(ltr_uvi) + ', Lux = ' + str(ltr_lux))

# this defines the container data structure which will store information we have on each container
# containers will be identified via their numbers and their names can be adjusted in the web GUI
class container:
    def __init__(thisContainer, qr, initialMass, currentMass):
        # qr is an int, ranging from 1 - 4 as this project will only have at most 4 containers 
        # the qr codes should only store int values
        thisContainer.qr = qr
        
        # initialMass is an int >= 0 representing the container's initial mass
        # we will subtract out the known mass of the containers so that this value only reflects
        # the mass of the contents
        thisContainer.initialMass = initialMass

        # currentMass is an int >= 0 representing the amount of product left in the container
        # this value should always be within the following range 
        # initialMass >= currentMass >= 0
        thisContainer.currentMass = currentMass
    
    # this function returns the percentage of product in the container as an int
    # the percentage is rounded to the nearest whole number
    def updatePercentage(thisContainer):
        if thisContainer.initialMass == 0: # handle the edge case
             returnVal = 0
        else:
            returnVal = round(thisContainer.currentMass / thisContainer.initialMass * 100)
        update_firebase_container(thisContainer.qr,"Percentage Remaining", returnVal)
        print(str(thisContainer.qr) + ": Percentage updated, now " + str(returnVal) + "%")
        return returnVal
    
    def getPercentage(thisContainer):
        if thisContainer.initialMass == 0: # handle the edge case
             return str(0) + "%"
        else:
            return str(round(thisContainer.currentMass / thisContainer.initialMass * 100)) + "%"

    # this function updates the current mass locally and in Firebase, it accepts an int 
    # updates the % in Firebase also!
    def updateCurrentMass(thisContainer, newMass):
        thisContainer.currentMass = round(newMass,2)
        print(str(thisContainer.qr) + ": Current mass updated, now " + str(thisContainer.currentMass) + "g")
        update_firebase_container(thisContainer.qr,"Current Container Mass", round(newMass,2))
        if newMass > thisContainer.initialMass:
            thisContainer.initialMass = thisContainer.currentMass
            update_firebase_container(thisContainer.qr,"Initial Container Mass", round(newMass,2))
            print(str(thisContainer.qr) + ": Initial mass updated, now " + str(thisContainer.initialMass) + "g")
        thisContainer.updatePercentage()

# the dictionary to store containers, pulls the initial masses from firebase for % calculations
containerDict = dict()
containerDict["Container_1"] = container("Container_1", get_initial_mass("Container_1"), 0)
containerDict["Container_2"] = container("Container_2", get_initial_mass("Container_2"), 0)
containerDict["Container_3"] = container("Container_3", get_initial_mass("Container_3"), 0)
containerDict["Container_4"] = container("Container_4", get_initial_mass("Container_4"), 0)

# Zeros the ADC channel
def zero_channel():
    """Initiate internal calibration for current channel.Use when scale is started,
    a new channel is selected, or to adjust for measurement drift. Remove weight
    and tare from load cell before executing."""
    print(
        "channel %1d calibrate.INTERNAL: %5s"
        % (nau7802.channel, nau7802.calibrate("INTERNAL"))
    )
    print(
        "channel %1d calibrate.OFFSET:   %5s"
        % (nau7802.channel, nau7802.calibrate("OFFSET"))
    )
    print("...channel %1d zeroed" % nau7802.channel)

# Reads the raw values from the ADC, we take the average of 5 samples
def read_raw_value(samples=5):
    """Read and average consecutive raw sample values. Return average raw value."""
    sample_sum = 0
    sample_count = samples
    while sample_count > 0:
        while not nau7802.available():
            pass
        sample_sum = sample_sum + nau7802.read()
        sample_count -= 1
    return int(sample_sum / samples)

# Returns a gain value, we will store this and multiply read_raw_value's output to get the mass in grams 
empty_weight_reading = 0
def calibrate_weight_sensor():
    global gain
    global empty_weight_reading

    # Prompt the user to enter the weight in grams of the item they place on the scale
    print("Please place the calibration weight on the scale")
    display_countdown_message("Please place the","calibration weight", "on the shelf", 5)

    """ Replace this section with the calibration weight mass """
    # item_weight = float(input("Enter the weight of the item in grams: "))
    item_weight = 200 # grams

    # Read the value of the sensor with the item on it
    item_weight_reading = read_raw_value()

    # Calculate the calibration parameters
    gain = item_weight / (item_weight_reading - empty_weight_reading)

    # Print the calibration parameters
    print("Scale Gain:", gain)
    update_firebase_scale("Scale Gain", gain)
    display_countdown_message("Remove all items","from the shelf", "", 5)
    display_message("Calibration", "Completed!")
    print("Calibration completed!")

# Instantiate 24-bit load sensor ADC, one channel with default gain of 128
nau7802 = NAU7802(board.I2C(), address=0x2A, active_channels=1)

# Instantiate and calibrate load cell inputs
print("*** Instantiate and calibrate load cell")
# Enable NAU7802 digital and analog power
enabled = nau7802.enable(True)
print("Digital and analog power enabled:", enabled)

print("REMOVE WEIGHTS FROM LOAD CELLS")
display_countdown_message("Remove all items","from the shelf", "", 5)

# Calibrate and zero channel
nau7802.channel = 1
zero_channel()  

# Store in the event we need to determine the gain
empty_weight_reading = read_raw_value(10) 

# Tell the user we have zeroed the scale
display_message("The shelf has", "been zeroed")
time.sleep(1)

# Check if we have a gain stored in Firebase, if not obtain a new one
gain = get_scale_gain()
if(gain == 0.0):
    calibrate_weight_sensor()

print("ADC AND LOAD CELL READY")

sht = adafruit_sht4x.SHT4x(board.I2C())
print("SHT4X READY")

ltr = adafruit_ltr390.LTR390(i2c)
print("LTR390 READY")

#Initialise the accelerometer, gyroscope and compass
IMU.initIMU()
a = datetime.datetime.now()

getSensorReadings()

#Read the accelerometer,gyroscope and magnetometer values
ACCx = IMU.readACCx()
ACCy = IMU.readACCy()
ACCz = IMU.readACCz()
GYRx = IMU.readGYRx()
GYRy = IMU.readGYRy()
GYRz = IMU.readGYRz()
MAGx = IMU.readMAGx()
MAGy = IMU.readMAGy()
MAGz = IMU.readMAGz()
#Apply compass calibration
MAGx -= (magXmin + magXmax) /2
MAGy -= (magYmin + magYmax) /2
MAGz -= (magZmin + magZmax) /2
##Calculate loop Period(LP). How long between Gyro Reads
b = datetime.datetime.now() - a
a = datetime.datetime.now()
LP = b.microseconds/(1000000*1.0)
outputString = "Loop Time %5.2f " % ( LP )
#Convert Gyro raw to degrees per second
rate_gyr_x =  GYRx * G_GAIN
rate_gyr_y =  GYRy * G_GAIN
rate_gyr_z =  GYRz * G_GAIN
#Calculate the angles from the gyro.
gyroXangle+=rate_gyr_x*LP
gyroYangle+=rate_gyr_y*LP
gyroZangle+=rate_gyr_z*LP

#Convert Accelerometer values to degrees
AccXangle =  (math.atan2(ACCy,ACCz)*RAD_TO_DEG)
AccYangle =  (math.atan2(ACCz,ACCx)+M_PI)*RAD_TO_DEG
#convert the values to -180 and +180
if AccYangle > 90:
    AccYangle -= 270.0
else:
    AccYangle += 90.0
#Complementary filter used to combine the accelerometer and gyro values.
CFangleX=AA*(CFangleX+rate_gyr_x*LP) +(1 - AA) * AccXangle
CFangleY=AA*(CFangleY+rate_gyr_y*LP) +(1 - AA) * AccYangle
#Kalman filter used to combine the accelerometer and gyro values.
kalmanY = kalmanFilterY(AccYangle, rate_gyr_y,LP)
kalmanX = kalmanFilterX(AccXangle, rate_gyr_x,LP)
#Calculate heading
heading = 180 * math.atan2(MAGy,MAGx)/M_PI
#Only have our heading between 0 and 360
if heading < 0:
    heading += 360
#Normalize accelerometer raw values.
accXnorm = ACCx/math.sqrt(ACCx * ACCx + ACCy * ACCy + ACCz * ACCz)
accYnorm = ACCy/math.sqrt(ACCx * ACCx + ACCy * ACCy + ACCz * ACCz)
#Calculate pitch and roll
pitch = math.asin(accXnorm)
roll = -math.asin(accYnorm/math.cos(pitch))
#Calculate the new tilt compensated values
#This needs to be taken into consideration when performing the calculations
#X compensation
magXcomp = MAGx*math.cos(pitch)+MAGz*math.sin(pitch)
#Y compensation
magYcomp = MAGx*math.sin(roll)*math.sin(pitch)+MAGy*math.cos(roll)-MAGz*math.sin(roll)*math.cos(pitch)
#Calculate tilt compensated heading
tiltCompensatedHeading = 180 * math.atan2(magYcomp,magXcomp)/M_PI
if tiltCompensatedHeading < 0:
    tiltCompensatedHeading += 360
##################### END Tilt Compensation ########################
if abs(CFangleX) >= threshold or abs(CFangleY) >= threshold:
    print('BerryIMU: Tilted')
    update_firebase_scale("Scale Tilted", 1)
else:
    print('BerryIMU: Not Tilted')
    update_firebase_scale("Scale Tilted", 0)

# We will remember the last 5 masses and compare to see if there is a jump 
prevMasses = [0.0, 0.0, 0.0, 0.0, 0.0]

# We are keeping track of what is here
presentContainers = {
  "Container_1": False,
  "Container_2": False,
  "Container_3": False,
  "Container_4": False
}

""" Find the new container that resulted in the mass change """
def findNewContainer(): # Returns a string with the name of the new container
    print ("Searching for the new container...")
    cap = cv2.VideoCapture(0)
    # For debugging purposes we will keep track of how long it takes to find the new container
    count = 1
    # In order to exit this loop we must find a new QR code 
    while True:
        # Get an image from the webcam
        success, img = cap.read()
        # If we can not get an image terminate the program
        if not success: 
            print("Could not get video feed, quitting")
            exit()
        # Read all the QR codes present in the frame
        decoded_list = decode(img)
        # Iterate through all the QR codes
        for code in decoded_list:
            # Get QR code contents
            decoded_data = code.data.decode("utf-8")
            # Check if it is in our presentContainers dictionary
            if decoded_data in presentContainers.keys():
                # If it is in the dictionary, check if it was previously there
                if presentContainers[decoded_data] == False:
                    # If that is the case, return the container's name
                    print("Success! Found " + decoded_data + " in " + str(count) + " iteration(s)!")
                    cap.release()
                    return decoded_data
        # If we don't find it let's keep trying
        print("Could not find the container in iteration: " + str(count) + " searching again")
        count += 1

""" Find the container that was removed """
def findRemovedContainer(): # Returns a string with the name of the container that was removed
    print ("Searching for the container that was removed...")
    cap = cv2.VideoCapture(0)
    # In order to exit this loop we must find a single container that has been removed
    # i.e. The candidates list must be reduced to one element 
    candidates = []
    # Populate the candidates list, with containers that were present on the scale before change in mass
    for key, value in presentContainers.items():
        if value == True:
            candidates.append(key)
    print("Candidate containers: ")
    print(' '.join(candidates))
        
    # For debugging purposes we will keep track of how long it takes to find the container
    count = 1
    # As long as we have more than one candidate in the list continue
    while (len(candidates) > 1):
        # Get an image from the webcam
        success, img = cap.read()
        # If we can not get an image terminate the program
        if not success: 
            print("Could not get video feed, quitting")
            exit()

        # Iterate through all the QR codes
        for code in decode(img):
            # Get QR code contents
            decoded_data = code.data.decode("utf-8")
            # Check if it is in our list of candidates
            if decoded_data in candidates:
                candidates.remove(decoded_data)
                print(decoded_data + " is still here.")

        # If we don't find it let's keep trying
        if (len(candidates) > 1):
            print("Could not find the container in iteration: " + str(count) + " searching again")
            print("Remaining Candidates: ")
            print(' '.join(candidates))
            count += 1
    # If we find that all the containers are still present
    if len(candidates) == 0:
        print("That's odd, all the containers are still here.")
        exit()
    # When we only have one candidate left, return that candidate
    else:
        print("The container that was removed is: " + str(candidates[0]))
        cap.release()
        return str(candidates[0])

""" Display container names and percentages on the OLED """
def update_display():
    # Gather the information to display for each container
    line1 = ("*" if presentContainers["Container_1"] else " ") + get_name("Container_1") + ": " + containerDict["Container_1"].getPercentage()
    line2 = ("*" if presentContainers["Container_2"] else " ") + get_name("Container_2") + ": " + containerDict["Container_2"].getPercentage()
    line3 = ("*" if presentContainers["Container_3"] else " ") + get_name("Container_3") + ": " + containerDict["Container_3"].getPercentage()
    line4 = ("*" if presentContainers["Container_4"] else " ") + get_name("Container_4") + ": " + containerDict["Container_4"].getPercentage()

    # Display the gathered information
    display_message(line1, line2, line3, line4)

### Main loop
while True:
    if get_easter_egg_status():
        easterEgg()

    getSensorReadings()

    #Read the accelerometer,gyroscope and magnetometer values
    ACCx = IMU.readACCx()
    ACCy = IMU.readACCy()
    ACCz = IMU.readACCz()
    GYRx = IMU.readGYRx()
    GYRy = IMU.readGYRy()
    GYRz = IMU.readGYRz()
    MAGx = IMU.readMAGx()
    MAGy = IMU.readMAGy()
    MAGz = IMU.readMAGz()
    #Apply compass calibration
    MAGx -= (magXmin + magXmax) /2
    MAGy -= (magYmin + magYmax) /2
    MAGz -= (magZmin + magZmax) /2
    ##Calculate loop Period(LP). How long between Gyro Reads
    b = datetime.datetime.now() - a
    a = datetime.datetime.now()
    LP = b.microseconds/(1000000*1.0)
    outputString = "Loop Time %5.2f " % ( LP )
    #Convert Gyro raw to degrees per second
    rate_gyr_x =  GYRx * G_GAIN
    rate_gyr_y =  GYRy * G_GAIN
    rate_gyr_z =  GYRz * G_GAIN
    #Calculate the angles from the gyro.
    gyroXangle+=rate_gyr_x*LP
    gyroYangle+=rate_gyr_y*LP
    gyroZangle+=rate_gyr_z*LP

    #Convert Accelerometer values to degrees
    AccXangle =  (math.atan2(ACCy,ACCz)*RAD_TO_DEG)
    AccYangle =  (math.atan2(ACCz,ACCx)+M_PI)*RAD_TO_DEG
    #convert the values to -180 and +180
    if AccYangle > 90:
        AccYangle -= 270.0
    else:
        AccYangle += 90.0
    #Complementary filter used to combine the accelerometer and gyro values.
    CFangleX=AA*(CFangleX+rate_gyr_x*LP) +(1 - AA) * AccXangle
    CFangleY=AA*(CFangleY+rate_gyr_y*LP) +(1 - AA) * AccYangle
    #Kalman filter used to combine the accelerometer and gyro values.
    kalmanY = kalmanFilterY(AccYangle, rate_gyr_y,LP)
    kalmanX = kalmanFilterX(AccXangle, rate_gyr_x,LP)
    #Calculate heading
    heading = 180 * math.atan2(MAGy,MAGx)/M_PI
    #Only have our heading between 0 and 360
    if heading < 0:
        heading += 360
    #Normalize accelerometer raw values.
    accXnorm = ACCx/math.sqrt(ACCx * ACCx + ACCy * ACCy + ACCz * ACCz)
    accYnorm = ACCy/math.sqrt(ACCx * ACCx + ACCy * ACCy + ACCz * ACCz)
    #Calculate pitch and roll
    pitch = math.asin(accXnorm)
    roll = -math.asin(accYnorm/math.cos(pitch))
    #Calculate the new tilt compensated values
    #This needs to be taken into consideration when performing the calculations
    #X compensation
    magXcomp = MAGx*math.cos(pitch)+MAGz*math.sin(pitch)
    #Y compensation
    magYcomp = MAGx*math.sin(roll)*math.sin(pitch)+MAGy*math.cos(roll)-MAGz*math.sin(roll)*math.cos(pitch)
    #Calculate tilt compensated heading
    tiltCompensatedHeading = 180 * math.atan2(magYcomp,magXcomp)/M_PI
    if tiltCompensatedHeading < 0:
        tiltCompensatedHeading += 360
    ##################### END Tilt Compensation ########################
    if abs(CFangleX) >= threshold or abs(CFangleY) >= threshold:
        print('BerryIMU: Tilted')
        update_firebase_scale("Scale Tilted", 1)
    else:
        print('BerryIMU: Not Tilted')
        update_firebase_scale("Scale Tilted", 0)

    update_display()
    avgOfPrevMasses = sum(prevMasses) / len(prevMasses)
    # print("The average of the last 5 readings is : " + str(avgOfPrevMasses))

    differenceInMass = loadCellMass - avgOfPrevMasses

    # print("The difference in mass from the average is: " + str(differenceInMass))

    # CASE 1: INCREASE IN MASS
    if (differenceInMass > thresholdMass):
        # Tell the user we are searching for the new container
        display_message("Determining what was", "added...")

        # Find the new container
        newContainer = findNewContainer()

        # Mark it as here in our presentContainers dictionary
        presentContainers[newContainer] = True

        # Tell the user we determined what container it was
        display_message(get_name(newContainer),  "was put back!")
        time.sleep(.5)

        # Get a settled reading from the scale
        getSensorReadings()

        # Update the current mass of the container locally and in Firebase
        containerDict[newContainer].updateCurrentMass(loadCellMass - avgOfPrevMasses)

        # Make all the prevMasses the current mass so the next iteration doesn't think there was a change
        prevMasses = [loadCellMass, loadCellMass, loadCellMass, loadCellMass, loadCellMass]

    # CASE 2: DECREASE IN MASS
    elif (abs(differenceInMass) > thresholdMass):
        # wait one second so the QR is out of the frame 
        time.sleep(.5)

        # Tell the user we are searching for a container that was removed
        display_message("Determining what was", "removed...")
        
        # Find the container that was removed
        removedContainer = findRemovedContainer()

        # Mark it as not present in our presentContainers dictionary
        presentContainers[removedContainer] = False

        # Notify the user we found the container that was removed
        display_message(get_name(removedContainer), "was removed!")
        time.sleep(.5)

        # Make all the prevMasses the current mass so the next iteration doesn't think there was a change
        prevMasses = [loadCellMass, loadCellMass, loadCellMass, loadCellMass, loadCellMass]

    # CASE 3:  NO SIGNIFICANT CHANGE IN MASS
    else:
        # print("No significant change in mass.")
        # Remove the oldest mass from prevMasses (which is in front)
        prevMasses.pop(0)
        # Put in the back of prevMasses the newest mass
        prevMasses.append(loadCellMass)






