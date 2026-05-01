#include "Arduino.h"
#include "DHT.h"

class tempHumiditySensor {
    private:
        uint8_t pin;
        uint8_t type;
        DHT dht;
        uint16_t humidityVal;
        uint16_t tempVal;
    public:
        tempHumiditySensor(uint8_t pin, uint8_t type);
        uint8_t getPin();
        uint8_t getType();
        bool updateSensorVal();
        uint16_t getTempVal();
        uint16_t getHumidityVal();
}