#include <TFT_eSPI.h>
#include "lightSensor.h"
TFT_eSPI tft;
lightSensor theLightSensor(13);


void setup() {
  Serial.begin(115200);
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_RED);
}

void loop() {
   theLightSensor.updateSensorVal();
   tft.setTextColor(TFT_BLACK);
   tft.setTextSize(4);
   tft.fillScreen(TFT_WHITE);
   int light = theLightSensor.getLightVal();
   tft.drawNumber(light, 0, 0);
   delay(2000);
}