#include "tempHumiditySensor.h"
#include "iostream"
using namespace std;

tempHumiditySensor :: tempHumiditySensor(uint8_t pin, uint8_t type) {
    this->pin = pin;
    this->type = type;
}
uint8_t tempHumiditySensor :: getPin() {
    return this->pin;
}
uint8_t tempHumiditySensor :: getType() {
    return this->type;
}

bool tempHumiditySensor :: updateSensorVal(DHT dht) {
    this->tempVal = dht.readTemperature(false); //false to convert to Celsius 
    this->humidityVal = dht.readHumidity();
    return true;
}
float tempHumiditySensor :: getTempVal() {
    return this->tempVal;
}
float tempHumiditySensor :: getHumidityVal() {
    return this->humidityVal; 
}