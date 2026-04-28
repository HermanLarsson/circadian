#include "soundSensor.h"
#include "iostream"
using namespace std;

soundSensor :: soundSensor(uint16_t pin) {
  this->pin = pin;
}

uint16_t soundSensor :: getSoundVal() {
  return this->soundVal;
}

void soundSensor :: setSoundVal(uint16_t newSoundVal) {
  this->soundVal = newSoundVal;
}

uint16_t soundSensor :: getPin() {
  return this->pin;
}

//bool soundSensor :: convertTo???(uint16_t lightVal) {
//  float tmp = soundVal * ???;
//  this->???Val = (uint16_t)tmp;
//  return true;
//}

bool soundSensor :: updateSensorVal() {
  for (int i = 0; i < 20; i++) {
    
  }
  this->soundVal = analogRead(pin);
}

//uint16_t soundSensor :: get???Val() {
//  return this->???Val;
//}



