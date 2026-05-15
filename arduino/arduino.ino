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

void publishReading(uint16_t value, const char* topic, PubSubClient& pubSubClient) {
    char reading[10];
    sprintf(reading, "%d", value);
    pubSubClient.publish(("circadian/sensors/" + String(topic)).c_str(), reading);
    Serial.println("Published: " + String(reading));
}

TFT_eSPI tft;

lightSensor lightSens(6); //Instance of LightSensor with pin 6
soundSensor soundSens(3); //Instance of SoundSensor with pin 3
tempHumiditySensor tempHumiditySens(0, DHT11); //Instance of TempHumiditySensor with pin 0 and type DHT11
DHT dht(tempHumiditySens.getPin(), tempHumiditySens.getType());

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
    lightSens.updateSensorVal();
    uint16_t luxVal = lightSens.getLuxVal();
    tft.drawString("LIGHT", 10, 10);
    tft.drawNumber(luxVal, 10, 50);
    tft.drawString("Lux", 90, 50);
    publishReading(luxVal, "light", mqttClient);

    //SoundSensor
    soundSens.updateSensorVal();
    uint16_t dBVal = soundSens.getCovertedSoundVal();
    tft.drawString("SOUND", 170, 10);
    tft.drawNumber(dBVal, 200, 50);
    tft.drawString("dB", 260, 50);
    publishReading(dBVal, "sound", mqttClient);

    //TempHumiditySensor
    tempHumiditySens.updateSensorVal(dht);
    uint16_t percentVal = tempHumiditySens.getHumidityVal();
    tft.drawString("HUMI", 30, 130);
    tft.drawNumber(percentVal, 50, 170);
    tft.drawString("%", 100, 170);
    publishReading(percentVal, "humidity", mqttClient);

    uint16_t degreeVal = tempHumiditySens.getTempVal();
    tft.drawString("TEMP", 170, 130);
    tft.drawNumber(degreeVal, 200, 170);
    tft.drawString("c", 250, 170);
    publishReading(degreeVal, "temperature", mqttClient);


    oldTime = newTime; //Update while loop time
  }
}