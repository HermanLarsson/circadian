import mqtt from "mqtt";
import { EventEmitter } from "events";

const options = {
  host: process.env.BROKER_URL,
  port: 8883,
  protocol: "mqtts",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

// create mqtt client
export const client = mqtt.connect(options);

// when the client connects, subscribe to the following topics
client.on("connect", () => {
  console.log("Connected to Circadian HiveMQ broker");

  const topics = [
    "circadian/sensors/temperature",
    "circadian/sensors/humidity",
    "circadian/sensors/light",
    "circadian/sensors/sound",
  ];
  client.subscribe(topics);
});

// when the client recieves a message, it is emitted internally so app.js can access it
client.on("message", (topic, message) => {
  console.log(`Recieved from ${topic}: ${message}`);
});
