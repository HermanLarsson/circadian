#!/bin/bash
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
export PATH=$PATH:$PWD/bin
arduino-cli core update-index
arduino-cli core install Seeeduino:samd
arduino-cli lib install "TFT_eSPI"
arduino-cli lib install "Adafruit NeoMatrix ZeroDMA library"
arduino-cli lib install "DHT sensor library"
