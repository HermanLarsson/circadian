#include "TFT_eSPI.h"
#include "lightSensor.h"
#include <WiFiClient.h>

// Hardcoded values, change as needed
const char* wifi_name = "NETWORK_NAME";
const char* wifi_password = "NETWORK_PASSWORD";

void setup_wifi() {
    // Use global/static Wifi object
    WiFi.begin(wifi_name, wifi_password);

    // Print message until WiFi connects
    while (WiFi.status() != WL_CONNECTED){
        delay(500);
        Serial.println("Connecting...");
    }

    Serial.println("Connected!");
    // Prints out WIO terminals IP Address
    Serial.println(WiFi.localIP());
}

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor

void setup() {
  Serial.begin(115200);
  setup_wifi();

  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(4);
}

void loop() {
   
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