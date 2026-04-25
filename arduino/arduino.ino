#include "TFT_eSPI.h"
#include "lightSensor.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "Certs.h"

// Hardcoded values, change as needed
const char* wifiName = "NETWORK_NAME";
const char* wifiPassword = "NETWORK_PASSWORD";

// Create WiFiClientSecure instance
WiFiClientSecure wifiClient;
// Use the wifiClient to construct a PubSubClient
PubSubClient mqttClient(wifiClient);

void setupWifi() {
    // Use global/static Wifi object
    WiFi.begin(wifiName, wifiPassword);

    // Print message until WiFi connects
    while (WiFi.status() != WL_CONNECTED){
        delay(500);
        Serial.println("Connecting to wifi...");
    }

    Serial.println("Connected to: " + String(wifiName));
    // Prints out WIO terminals IP Address
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

// sets the HiveMQ server to the mqttClient and connects
void connectToMqtt() {
    mqttClient.setServer("80da5a8e43574b27838157b2dfb25bc9.s1.eu.hivemq.cloud", 8883);

    while(!mqttClient.connected()){
        Serial.println("Attempting to Connect to MQTT broker...");
        if (mqttClient.connect("WioTerminalClient", "GlimmeringGoose", "Goose123!")) {
            Serial.println("Connected to MQTT Broker");
        } else {
            Serial.println("Connection to MQTT broker failed, retrying...");
            delay(5000);
        }
    }
}

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor

void setup() {
  Serial.begin(115200);

  // give the wifiClient our HiveMQ certificate
  wifiClient.setCACert(hivemq_cert);
  setupWifi();
  connectToMqtt();

  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(4);
}

void loop() {
   // keeps the connection to MQTT alive
   mqttClient.loop();

   tft.fillScreen(TFT_WHITE); //Paint over last screen
   tft.drawFastHLine(0, 120, 320, TFT_BLACK);
   tft.drawFastVLine(160, 0, 240, TFT_BLACK); 

   //LightSensor
   theLightSensor.updateSensorVal();
   uint16_t luxVal = theLightSensor.getLuxVal();
   tft.drawString("LIGHT", 30, 10);
   tft.drawNumber(luxVal, 50, 50);

   //Delay 2 sec for each read
   delay(2000);
}