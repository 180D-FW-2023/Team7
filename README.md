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
Contains the code that will be run on the scale (```main.py```), if you would like you can set this to automatically run after initial setup. A guide on how to do that can be found here:
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
Assuming that the Pi has been configured to allow SSH.

Wifi configuration for UCLA's eduroam, ignore if using a private network.
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```
Delete everything and replace with:
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev 
update_config=1 
country=US 

network={ 
      ssid="network_one_here" 
      psk="wpa_password" 
      id_str="home" 
} 

network={ 
      ssid="eduroam"
      scan_ssid=1
      key_mgmt=WPA-EAP
      eap=PEAP
      identity="yourusername@ucla.edu"
      password="yourpassword"
      phase1="peaplabel=0"
      phase2="auth=MSCHAPV2"
      id_str="school" 
}
```
Save, exit, and run the following command: 
```
sudo nano /etc/network/interfaces
```
Delete everything and replace with:
```
auto lo iface lo inet loopback 
iface eth0 inet manual 

allow-hotplug wlan0 iface wlan0 inet manual 
      wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf 

allow-hotplug wlan1 iface wlan1 inet manual 
      wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf 

iface home inet dhcp 
iface school inet dhcp
```
Now restart the Pi using the following command: 
``` 
sudo shutdown -r now
```
Test connectivity:
```
ping google.com
```


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

sudo -i

echo 'i2c-dev' >> /etc/modules
echo 'i2c-bcm2708' >> /etc/modules
echo 'dtparam=i2c_arm=on' >> /boot/config.txt
echo 'dtparam=i2c1=on' >> /boot/config.txt

exit
sudo shutdown -r now
``` 

To run the shelf's Code

```
cd ~ 
cd Team7/Shelf Code
python main.py
```

# Usage
 
### Initial Start Up
Allow the shelf to start up, upon first start up the scale will require calibration. The screen will prompt the user to remove all weights and then place an item of known mass on the scale. After following the prompts, the scale is ready for use and will not need to be calibrated again!

### Screen
The screen displays the four containers that are registered to the scale. Each container will display the name the user has set in the Web UI as well as the last known percentage of product remaining. A '*' character to the left of the container indicates that the container is present. 
```
* Container_1 10%
  Container_2 60%
  Container_3 30%
* Container_4 100%
```

### Basic Usage
Please place one container on the scale at a time, the screen will indicate when the container has been found and when the next container can be removed or placed on the scale. 

### WeB UI

Upon logging into the web UI all the shelves associated with the user's system will be displayed.
<img src="https://github.com/180D-FW-2023/Team7/assets/105705018/19138f32-b2ce-4319-be1d-6a72c2a126db" width=25% height=25%>

* Renaming 
If users would like to rename the shelf or the containers on the shelf, the edit button next to the name will allow the user to do so. This will update the name in the web UI as well as on the display within several seconds. 

* More information / Environmental Monitoring 
When clicking on a container's percentage gauge the user will be presented with a screen that looks like the following:

<img src="https://github.com/180D-FW-2023/Team7/assets/105705018/b94c4958-6a71-4475-8ac7-b5ddb1345590" width=25% height=25%>

Within this screen users will see more information on the containers, including the mass, initial mass, and environmental parameters. Using the sliders users can enable environmental monitoring parameters. When the set thresholds are surpassed, the user will be alerted on the home screen with a red notification in the top right of the screen. 
