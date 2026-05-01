#include "soundSensor.h"
#include "iostream"
using namespace std;

int AVGREF = 90;
int MAXREF = 110;
int CALREF = 80.5;
int NOISEFLOOR = 35;

//Set Pin
soundSensor :: soundSensor(uint16_t pin) {
  this->pin = pin;
}

//Get Pin
uint16_t soundSensor :: getPin() {
  return this->pin;
}

//Convert to decibels
bool soundSensor :: convertToDecibels(float avgVal, float maxVal) {
  float avgDb = CALREF + 20 * log10((float)avgVal/AVGREF);
  float maxDb = CALREF + 20 * log10((float)maxVal/MAXREF); 
  this->convertedSoundVal = (avgDb + maxDb) / 2;
  
  //Serial.print("AVG: ");
  //Serial.println(avgDb);
  //Serial.print("MAX: ");
  //Serial.println(maxDb);
  //Serial.print("DAVG: ");
  //Serial.println(convertedSoundVal);
}

//Read new values from sensor
bool soundSensor :: updateSensorVal() {
  uint8_t SAMPLE_COUNT = 100;
  float maxVal = 0.0;
  int sum = 0;

  uint8_t interval = 1; //Take reading every 1ms
  int oldTime = 0; //Saves last time sensors data was read
  uint16_t counter = 0;

  while (counter < SAMPLE_COUNT) {
    unsigned long newTime = millis(); 

    if (newTime - oldTime >= interval) { //Only takes reading of 1ms has passed since last reading
      uint16_t rawVal = analogRead(pin);
      rawVal = abs(rawVal - NOISEFLOOR);
      
      if (rawVal > maxVal) {
        maxVal = rawVal; 
      }

      sum = sum + rawVal;
      oldTime = newTime;
      counter++;
    }
  }    

  float avgVal = sum / SAMPLE_COUNT;
  sum = 0;
  convertToDecibels(avgVal, maxVal);
  return true;
}

//Get the decibel converted sound value
uint16_t soundSensor :: getCovertedSoundVal() {
  return this->convertedSoundVal;
}



