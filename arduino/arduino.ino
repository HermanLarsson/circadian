#include "TFT_eSPI.h"
#include "lightSensor.h"
#include "soundSensor.h"
#include "tempHumiditySensor.h"

TFT_eSPI tft;

lightSensor theLightSensor(WIO_LIGHT); //Instance of LightSensor with built in pin
soundSensor theSoundSensor(3); //Instance of SoundSensor with pin 3
tempHumiditySensor thetempHumiditySensor(0, DHT11); //Instance of TempHumiditySensor with pin 0 and type DHT11
DHT dht(thetempHumiditySensor.getPin(), thetempHumiditySensor.getType());
//DHT dht(0, DHT11);
int loopInterval = 2000;
int oldTime = 0;

void setup() {
  Serial.begin(115200);
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(4);
  Wire.begin();
  dht.begin();
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

    //TempHumiditySensor
    Serial.println(dht.readHumidity());
    Serial.println(dht.readTemperature());

    thetempHumiditySensor.updateSensorVal(dht);
    tft.drawString("HUMI", 30, 130);
    tft.drawNumber(thetempHumiditySensor.getHumidityVal(), 50, 170);
    
    tft.drawString("TEMP", 170, 130);
    tft.drawNumber(thetempHumiditySensor.getTempVal(), 200, 170);

    oldTime = newTime; //Update while loop time
  }
}