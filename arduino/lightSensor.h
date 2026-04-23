#include<Arduino.h>

class lightSensor {
  private: 
    int pin;
    int lightVal;

  public:
    lightSensor(int pin);
    int getLightVal();
    void setLightVal(int newLightVal);
    int getPin();
    bool updateSensorVal();
};