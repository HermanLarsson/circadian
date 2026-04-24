#include "lightSensor.h"
#include "iostream"
using namespace std;

lightSensor :: lightSensor(uint16_t pin) {
  this->pin = pin;
  pinMode(pin, INPUT);
}

uint16_t lightSensor :: getLightVal() {
  return this->lightVal;
}

void lightSensor :: setLightVal(uint16_t newLightVal) {
  this->lightVal = newLightVal;
}

uint16_t lightSensor :: getPin() {
  return this->pin;
}

bool lightSensor :: convertToLux(uint16_t lightVal) {
  float tmp = lightVal * (1000.0 / 1023.0);
  this->luxVal = (uint16_t)tmp;
  return true;
}

bool lightSensor :: updateSensorVal() {
  convertToLux(analogRead(pin));
  return true;
}

uint16_t lightSensor :: getLuxVal() {
  return this->luxVal;
}



