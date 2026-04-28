#include "Arduino.h"

class soundSensor {
  private: 
    uint16_t pin;
    uint16_t soundVal;

  public:
    soundSensor(uint16_t pin);
    uint16_t getSoundVal();
    void setSoundVal(uint16_t newSoundVal);
    uint16_t getPin();
    //bool convertTo???(uint16_t soundVal);
    bool updateSensorVal();
    //uint16_t get???Val();
};