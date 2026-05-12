import dotenv from "dotenv";
import express from "express";
import pg from "pg";
import {
  calculateScores,
  getAverages,
  generateTimelines,
} from "./report-generation.js";
import bodyParser from "body-parser";
import fs, { read } from "fs";
import path from "path";

dotenv.config();

// Dynamically imported so dotnev.config() runs first
// Now app.js has access to the created client
const { client } = await import("./mqtt.js");
const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT;

//parser to accept json data from requests
const jsonParser = bodyParser.json();

// user_id 0 for NO user
let user_id = 0;
readUser();

//Enables Express to parse incoming requests as JSON.
app.use(bodyParser.json());

const db = new pg.Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

await db.connect().then(() => console.log("Connected to Circadian DB"));

const topicTypeMap = {
  "circadian/sensors/temperature": "temperature",
  "circadian/sensors/humidity": "humidity",
  "circadian/sensors/light": "light",
  "circadian/sensors/sound": "sound",
};

const valuesToAverage = {
  temperature: [],
  humidity: [],
  light: [],
  sound: [],
};

client.on("message", (topic, message) => {
  if (topic in topicTypeMap) {
    const type = topicTypeMap[topic];
    const messageInt = parseFloat(message.toString());
    if (!isNaN(messageInt)) {
      valuesToAverage[type].push(messageInt);
    } else {
      console.log(`Error: Invalid message value`);
    }
  } else {
    console.log(`Error: Invalid sensor type`);
  }
});

// Function to run every 60 seconds => store an average of values to DB
setInterval(async () => {
  //Necessary time conversions to split date and time into two.
  const time_recorded = new Date();
  const curr_date =
    time_recorded.getFullYear() +
    "-" +
    (time_recorded.getMonth() + 1) +
    "-" +
    time_recorded.getDate();
  const curr_time =
    time_recorded.getHours() +
    ":" +
    time_recorded.getMinutes() +
    ":" +
    time_recorded.getSeconds();
  // loop through each sensor type
  for (const [type, values] of Object.entries(valuesToAverage)) {
    if (values.length == 0) continue;

    const valuesAverage =
      values.reduce((acc, val) => acc + val, 0) / values.length;
    try {
      await db.query(
        "INSERT INTO SENSOR_DATA (date_recorded, time_recorded, user_id, type, value) VALUES ($1, $2, $3, $4, $5)",
        [curr_date, curr_time, user_id, type, valuesAverage],
      );
      console.log(
        `Saved ${valuesAverage}, ${time_recorded}, ${user_id}, ${type} to SENSOR_DATA`,
      );
    } catch (error) {
      console.error("Data insertion error", error);
    }

    // reset values in list
    valuesToAverage[type] = [];
  }
}, 60000);

client.on("message", (topic, message) => {
  // TODO: forward to frontend
});

app.get("/", (req, res) => {
  res.send("Circadian");
});

app.get("/api/report/:date", jsonParser, async (req, res) => {
  let date = req.params.date + "%";

  let result = await db.query(
    "SELECT * FROM sensor_data WHERE CAST(date_recorded AS VARCHAR) LIKE $1 ORDER BY type, time_recorded",
    [date],
  );

  //Calls the functions from report-generation to consolidate the data
  let avgData = getAverages(result.rows);
  let scores = calculateScores(avgData);
  let timelines = generateTimelines(result.rows);
  const reportData = {
    scores: scores,
    avgData: avgData,
    timelines: timelines,
  };

  res.send(reportData);
});

app.post("/api/login", async (req, res) => {
  //Use response code 200 for OK login, 403 for NOT OK

  let result = await db.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [req.body.username, req.body.password],
  );
  if (result.rows.length == 1) {
    writeUser(result.rows[0].id);
    readUser();
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

function readUser() {
  const data = fs.readFileSync(path.join(__dirname, "/usr.cache"));
  user_id = data;
}

function writeUser(id) {
  id = id.toString();
  fs.writeFileSync(path.join(__dirname, "/usr.cache"), id);
}

app.listen(port, () => {
  console.log(`Circadian App on port ${port}`);
});
