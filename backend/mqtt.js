import mqtt from "mqtt";

const options = {
  host: process.env.BROKER_URL,
  port: 8883,
  protocol: "mqtts",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(options);

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

client.on("message", (topic, message) => {
  console.log(`Recieved from ${topic}: ${message}`);
  // handle/process values recieved from the MQTT broker
  // either send to frontend or DB
});

export default client;
