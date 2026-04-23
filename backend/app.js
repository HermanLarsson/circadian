import dotenv from "dotenv";
import express from "express";

dotenv.config();

// Dynamically imported so dotnev.config() runs first
// loads and runs mqtt.js file
const client = await import("./mqtt.js");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Circadian");
});

app.get("/test", (req, res) => {
  res.send("Testing");
});

app.listen(port, () => {
  console.log(`Circadian App on port ${port}`);
});
