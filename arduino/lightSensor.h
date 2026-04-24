#include "Arduino.h"

class lightSensor {
  private: 
    uint16_t pin;
    uint16_t lightVal;
    uint16_t luxVal;

  public:
    lightSensor(uint16_t pin);
    uint16_t getLightVal();
    void setLightVal(uint16_t newLightVal);
    uint16_t getPin();
    bool convertToLux(uint16_t lightVal);
    bool updateSensorVal();
    uint16_t getLuxVal();
};