# SmartShelves

A shelf with an openCV based camera system to keep track of the mass of the contents in containers and enviornmental montioring. 

# Shelf Hardware

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
