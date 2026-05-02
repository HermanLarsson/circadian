#include "Arduino.h"
#include "DHT.h"

class tempHumiditySensor {
    private:
        uint8_t pin;
        uint8_t type;
        float humidityVal;
        float tempVal;
    public:
        tempHumiditySensor(uint8_t pin, uint8_t type);
        uint8_t getPin();
        uint8_t getType();
        bool updateSensorVal(DHT dht);
        float getTempVal();
        float getHumidityVal();
};