#include"lightSensor.h"
#include<iostream>
using namespace std;

lightSensor :: lightSensor(int pin) {
  this->pin = pin;
  pinMode(pin, INPUT);
}

int lightSensor :: getLightVal() {
  return this->lightVal;
}

void lightSensor :: setLightVal(int newLightVal) {
  this->lightVal = newLightVal;
}

int lightSensor :: getPin() {
  return this->pin;
}

bool lightSensor :: updateSensorVal() {
  lightVal = analogRead(pin);
  cout << lightVal;
}