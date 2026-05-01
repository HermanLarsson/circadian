#include "TFT_eSPI.h"
#include "lightSensor.h"
#include "soundSensor.h"

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor
soundSensor theSoundSensor(3); //Instance of SoundSensor with pin 3

int loopInterval = 2000;
int oldTime = 0;

void setup() {
  Serial.begin(115200);
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(4);
}


void loop() {
  unsigned long newTime = millis(); 
  while (newTime - oldTime >= loopInterval) {
   
    tft.fillScreen(TFT_WHITE); //Paint over last screen
    tft.drawFastHLine(0, 120, 320, TFT_BLACK);
    tft.drawFastVLine(160, 0, 240, TFT_BLACK); 

    //LightSensor
    theLightSensor.updateSensorVal();
    uint16_t luxVal = theLightSensor.getLuxVal();
    tft.drawString("LIGHT", 30, 10);
    tft.drawNumber(luxVal, 50, 50);

    //SoundSensor
    theSoundSensor.updateSensorVal();
    tft.drawString("SOUND", 170, 10);
    tft.drawNumber(theSoundSensor.getCovertedSoundVal(), 200, 50);

    oldTime = newTime; //Update while loop time
  }
;
}