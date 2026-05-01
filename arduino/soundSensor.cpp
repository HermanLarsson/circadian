#include "soundSensor.h"
#include "iostream"
using namespace std;

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
  float avgDb = CALREF + 20 * log10((float)avgVal/AVGREF); //Calculate the average dB level
  float maxDb = CALREF + 20 * log10((float)maxVal/MAXREF); //Calculate the max dB level 
  this->convertedSoundVal = (avgDb + maxDb) / 2; //Calculate the average between avg and max dB levels
}

//Read new values from sensor
bool soundSensor :: updateSensorVal() {
  const uint8_t SAMPLE_COUNT = 100;
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
      
      //Find the highest sound value
      if (rawVal > maxVal) {
        maxVal = rawVal; 
      }

      sum = sum + rawVal; 
      oldTime = newTime;
      counter++;
    }
  }    

  float avgVal = sum / SAMPLE_COUNT; //Gets the average sound level
  sum = 0;
  convertToDecibels(avgVal, maxVal);
  return true;
}

//Get the decibel converted sound value
uint16_t soundSensor :: getCovertedSoundVal() {
  return this->convertedSoundVal;
}



