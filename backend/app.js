import dotenv from "dotenv";
import express from "express";

dotenv.config();

// Dynamically imported so dotnev.config() runs first
// loads and runs mqtt.js file
// app.js has access to the created client and mqttEvents objects
const { client, mqttEvents } = await import("./mqtt.js");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Circadian");
});

mqttEvents.on("message", ({ topic, data }) => {
  // TODO: forward to frontend
});

mqttEvents.on("message", ({ topic, data }) => {
  // TODO: save to DB
});

app.listen(port, () => {
  console.log(`Circadian App on port ${port}`);
});
