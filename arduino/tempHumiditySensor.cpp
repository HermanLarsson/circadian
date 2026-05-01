#include "tempHumiditySensor.h"
#include "iostream"
using namespace std;

tempHumiditySensor :: tempHumiditySensor(uint8_t pin, uint8_t type) {
    this->dht(pin, type);
}
tempHumiditySensor :: uint8_t getPin() {
    return this->pin;
}
tempHumiditySensor :: uint8_t getType() {
    return this->type;
}
tempHumiditySensor :: bool updateSensorVal() {
    return true;
}
tempHumiditySensor :: uint16_t getTempVal() {
    return 1;
}
tempHumiditySensor :: uint16_t getHumidityVal() {
    return 1; 
}