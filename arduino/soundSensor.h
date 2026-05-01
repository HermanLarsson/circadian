#include "Arduino.h"

class soundSensor {
  private: 
    uint16_t pin;
    uint16_t convertedSoundVal;

  public:
    soundSensor(uint16_t pin);
    uint16_t getPin();
    bool convertToDecibels(float avgVal, float maxVal);
    bool updateSensorVal();
    uint16_t getCovertedSoundVal();
};