# SmartShelves

A shelf with an openCV based monitoring system to track respective quantities of products in containers. Incorporates environmental monitoring for products sensitive to light, temperature, or humidity. The shelf information is aggregated in a web interface for ease of use and is also displayed on a screen directly on the shelf.

# Repository Organization

### Container Labels
Contains labels to affix to 4 containers (```containerQRCodes.png```), additional labels can be generated using the provided python script (```qrCodeGenerator.py```). Labels should follow the following convention:
``` Container_X ``` 

### Firebase Setup
Contains the ```firebaseSetup.py``` setup script and ```scale_info.json``` which contains the structure of the Firebase real time database. The ```firebaseSetup.py``` must be run once per scale to set up the real time database prior to use, be sure to follow the comments in the file to ensure the database is configured correctly. Please note you will need to provide a json file with your real time database API keys in this folder.

Replace the following: 
``` 
ece-180-project-firebase-adminsdk-7eg04-74b6c29e0b.json

https://ece-180-project-default-rtdb.firebaseio.com/
``` 
with the proper information for your realtime database. 

Additional help can be found at the following links:
```
https://www.freecodecamp.org/news/how-to-get-started-with-firebase-using-python/

https://firebase.google.com/docs/database 
```

### Shelf Code
Contains the code that will be run on the scale, if you would like you can set this to automatically run after initial setup. A guide on how to do that can be found here:
```
https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
```

### Web Server
Contains all the code needed to run the web server. This project was bootstrapped with Create React App. More information can be found in the ```README.md``` found in the directory. The web server can be hosted locally or in the cloud with services such as AWS. Please note you will need to provide your own ```firebase.tsx``` and place it in ```src```.

# Shelf Hardware

<img src="https://github.com/180D-FW-2023/Team7/assets/105705018/9b200be9-9ad3-4c5c-ab37-63856f8ea5e1" width=25% height=25%>


```
Raspberry Pi 4 + Power Adaptor, SD Card, and Case
Adafruit 2.23" Monochrome OLED Bonnet
IDE 40-Pin Male to Female Hard Drive Extension Cable 30cm 
Adafruit Sensirion SHT40 Temperature & Humidity Sensor
Adafruit LTR390 UV Light Sensor
Adafruit NAU7802 24-Bit ADC
BerryIMU v3
STEMMA QT / Qwiic JST SH 4-Pin Cable (Several in various lengths, generic)
Strain Gauge Load Cell - 4 Wires (Generic)
Laser Cut Acrylic 
A Webcam (Any should work)
Containers (4 Matching ones)
```
# Installation
Assuming that the Pi has been configured to allow SSH and is connected to the network.

Run the following commands to prepare the Raspberry Pi:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git
git clone https://github.com/180D-FW-2023/Team7/
cd Team7
xargs sudo apt-get -y install < aptGetPackages.txt
git clone http://github.com/ozzmaker/BerryIMU.git
git clone https://github.com/CedarGroveStudios/CircuitPython_NAU7802
sudo cp -r ~/CircuitPython_NAU7802/cedargrove_nau7802.py /usr/local/lib/python3.9/dist-packages
cd ~ 
wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
sudo -E env PATH=$PATH python3 raspi-blinka.py
pip install -r pipPackages.txt
``` 

To run the shelf's Code

```
cd ~ 
cd Team7/Shelf Code
python main.py
```
