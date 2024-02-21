# SmartShelves

A shelf with an openCV based camera system to keep track of the mass of the contents in containers and enviornmental montioring. 

# Repository organization

### Container Labels
Contains labels to affix to 4 containers, additional labels can be generated used the provided python script. 
Labels should follow the following convention:
``` Container_X ``` 

### Firebase Setup
Contains the code and a json to setup the Firebase real time database. The code must be ran once to per scale to setup the real time database prior to use. 

Replace the following: 
``` 
ece-180-project-firebase-adminsdk-7eg04-74b6c29e0b.json

https://ece-180-project-default-rtdb.firebaseio.com/
``` 
with the proper infomration for your realtime database. 

Additioal help can be found at the following links:
```
https://www.freecodecamp.org/news/how-to-get-started-with-firebase-using-python/

https://firebase.google.com/docs/database 
```

### Shelf Code
Contains the code that will be ran on the scale, if you would like you can set this to automatically run after intial setup. A guide on how to do that can be found here:
```
https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
```

### Web Server
Contains all the code needed to run the web server. This project was bootstrapped with Create React App. More information can be found in the ```README.md``` found in the directory. The web server can be hosted locally or in the cloud with services such as AWS. Please note you will need to provide your own ```firebase.tsx``` and place it in ```src```.

# Shelf Hardware
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
```
# Installation

## Shelf Depedencies
Run the following commands to prepare the Raspberry Pi

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
## Running the Self's Code

```
cd Team7/Shelf Code
python main.py
```
