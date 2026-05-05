#include "arduino_secrets.h"
#include "TFT_eSPI.h"
#include "lightSensor.h"
#include "soundSensor.h"
#include "tempHumiditySensor.h"
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

void publishReading(value, topic, pubSubClient) {
    char reading[10];
    sprintf(reading, "%d", value);
    pubSubClient.publish("circadian/sensors/" + topic, value);
    Serial.println("Published: " + String(reading));
}

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor with built in pin
soundSensor theSoundSensor(3); //Instance of SoundSensor with pin 3
tempHumiditySensor thetempHumiditySensor(0, DHT11); //Instance of TempHumiditySensor with pin 0 and type DHT11
DHT dht(thetempHumiditySensor.getPin(), thetempHumiditySensor.getType());

int loopInterval = 2000;
int oldTime = 0;

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

  dht.begin();
}


void loop() {
  unsigned long newTime = millis();
  while (newTime - oldTime >= loopInterval) {
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
    publishReading(luxVal, light, mqttClient);

    //SoundSensor
    theSoundSensor.updateSensorVal();
    uint16_t dBVal = theSoundSensor.getCovertedSoundVal();
    tft.drawString("SOUND", 170, 10);
    tft.drawNumber(dBVal, 200, 50);
    publishReading(dBVal, sound, mqttClient);

    //TempHumiditySensor
    thetempHumiditySensor.updateSensorVal(dht);
    uint16_t percentVal = thetempHumiditySensor.getHumidityVal();
    tft.drawString("HUMI", 30, 130);
    tft.drawNumber(percentVal, 50, 170);
    publishReading(percentVal, humidity, mqttClient);

    uint16_t degreeVal = thetempHumiditySensor.getTempVal();
    tft.drawString("TEMP", 170, 130);
    tft.drawNumber(degreeVal, 200, 170);
    publishReading(degreeVal, temperature, mqttClient);


    oldTime = newTime; //Update while loop time
  }
}