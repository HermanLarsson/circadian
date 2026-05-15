#!/bin/bash
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
export PATH=$PATH:$PWD/bin
arduino-cli core update-index --additional-urls https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
arduino-cli core install Seeeduino:samd --additional-urls https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
arduino-cli lib install "Adafruit NeoMatrix ZeroDMA library"
arduino-cli lib install "DHT sensor library"
arduino-cli lib install "PubSubClient"
arduino-cli lib install "Seeed Arduino rpcWiFi"


