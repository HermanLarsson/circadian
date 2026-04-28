#include "arduino_secrets.h"
#include "TFT_eSPI.h"
#include "lightSensor.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "Certs.h"
#include <rpcWiFi.h>

// Create WiFiClientSecure instance
WiFiClientSecure wifiClient;
// Use the wifiClient to construct a PubSubClient
PubSubClient mqttClient(wifiClient);

void setupWifi() {

    WiFi.mode(WIFI_STA);
    WiFi.disconnect();

    // Use global/static Wifi object
    WiFi.begin(WIFI_NAME, WIFI_PASSWORD);

    // Print message until WiFi connects
    while (WiFi.status() != WL_CONNECTED){
        delay(500);
        Serial.println("Connecting to wifi...");
        Serial.println(WiFi.status());
    }

    Serial.println("Connected to: " + String(WIFI_NAME));
    // Prints out WIO terminals IP Address
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

// sets the HiveMQ server to the mqttClient and connects
void connectToMqtt() {
    mqttClient.setServer(MQTT_URL, MQTT_PORT);

    while(!mqttClient.connected()){
        Serial.println("Attempting to Connect to MQTT broker...");
        if (mqttClient.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
            Serial.println("Connected to MQTT Broker");
        } else {
            Serial.println("Connection to MQTT broker failed, retrying...");
            delay(5000);
        }
    }
}

void publishReading(value, topic, mqttClient) {
    char reading[10];
    sprintf(reading, "%d", value);
    mqttClient.publish("circadian/sensors/" + topic, value);
    Serial.println("Published: " + String(reading));
}

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor

void setup() {
  Serial.begin(115200);

  while(!Serial);
  delay(1000);

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

   // publish light sensor data to MQTT broker
   // create char array to hold lightReading
   char lightReading[10];
   // converts luxVal into a string and writes to lightReading
   sprintf(lightReading, "%d", luxVal);
   // publishes to light topic
   mqttClient.publish("circadian/sensors/light", lightReading);
   Serial.println("Published: " + String(lightReading));

   publishReading(luxVal, light, mqttClient);
//    publishReading(dBVal, sound, mqttClient);
//    publishReading(degreeVal, temperature, mqttClient);
//    publishReading(percentVal, humidity, mqttClient);

   //Delay 2 sec for each read
   delay(2000);
}