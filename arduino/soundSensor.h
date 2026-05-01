#include "Arduino.h"

class soundSensor {
  private: 
    uint16_t pin;
    uint16_t convertedSoundVal;
    const uint16_t AVGREF = 90;;
    const uint16_t MAXREF = 110;;
    const uint16_t CALREF = 80.5;;
    const uint16_t NOISEFLOOR = 35;;

  public:
    soundSensor(uint16_t pin);
    uint16_t getPin();
    bool convertToDecibels(float avgVal, float maxVal);
    bool updateSensorVal();
    uint16_t getCovertedSoundVal();
};