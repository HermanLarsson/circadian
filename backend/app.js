import dotenv from "dotenv";
import express from "express";
import pg from "pg";
import cors from "cors";
import {
  calculateScores,
  getAverages,
  generateTimelines,
} from "./utils/reportGeneration.js";
import fs from "fs";
import path from "path";
import {
  humidityAlert,
  lightAlert,
  soundAlert,
  tempAlert,
} from "./utils/alerts.js";
import {
  isValidHumidity,
  isValidTemperature,
  isValidLux,
  isValidSound,
} from "./utils/sensorValidation.js";

dotenv.config();

// Dynamically imported so dotnev.config() runs first
// Now app.js has access to the created client
const { client } = await import("./mqtt.js");
const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// user_id 0 for NO user
let user_id = 0;
readUser();

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

// object to store logged in users details
let loggedInUser = {};

// single alert object containing all alerts
const allAlerts = {
  temperature: {
    sensor: "temperature",
    status: "pending",
    message: "Awaiting readings....",
    recommendation: "Analysing room...",
  },
  light: {
    sensor: "light",
    status: "pending",
    message: "Awaiting readings....",
    recommendation: "Analysing room...",
  },
  sound: {
    sensor: "sound",
    status: "pending",
    message: "Awaiting readings....",
    recommendation: "Analysing room...",
  },
  humidity: {
    sensor: "humidity",
    status: "pending",
    message: "Awaiting readings....",
    recommendation: "Analysing room...",
  },
};

function readUser() {
  const data = fs.readFileSync(path.join(__dirname, "/usr.cache"));
  user_id = data;
}

function writeUser(id) {
  id = id.toString();
  fs.writeFileSync(path.join(__dirname, "/usr.cache"), id);
}

// helper function to average a list of numbers
function average(nums) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

client.on("message", (topic, message) => {
  if (topic in topicTypeMap) {
    const type = topicTypeMap[topic];
    const messageInt = parseFloat(message.toString());

    let testResult;
    switch (type) {
      case "temperature":
        testResult = isValidTemperature(messageInt);
        break;
      case "humidity":
        testResult = isValidHumidity(messageInt);
        break;
      case "light":
        testResult = isValidLux(messageInt);
        break;
      case "sound":
        testResult = isValidSound(messageInt);
        break;
      default:
        testResult = false;
    }
    if (testResult) {
      valuesToAverage[type].push(messageInt);
    } else {
      console.log(`Error: Invalid message value`);
    }
  } else {
    console.log(`Error: Invalid sensor type`);
  }
});

// Store an average of values to DB every 60 seconds
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

    // average the sensor readings
    const valuesAverage = average(values);

    // save to db
    try {
      await db.query(
        "INSERT INTO SENSOR_DATA (date_recorded, time_recorded, user_id, type, value) VALUES ($1, $2, $3, $4, $5)",
        [curr_date, curr_time, user_id, type, valuesAverage]
      );
      console.log(
        `Saved ${valuesAverage}, ${time_recorded}, ${user_id}, ${type} to SENSOR_DATA`
      );
    } catch (error) {
      console.error("Data insertion error", error);
    }

    // reset values in list
    valuesToAverage[type] = [];
  }
}, 60000);

// update alerts every 5 seconds
setInterval(() => {
  for (const [type, values] of Object.entries(valuesToAverage)) {
    if (values.length == 0) continue;

    // takes the latest reading from the list of values being averaged and stored in DB
    const lastestReading = values[values.length - 1];

    if (type == "temperature") {
      allAlerts.temperature = tempAlert(lastestReading);
    } else if (type == "humidity") {
      allAlerts.humidity = humidityAlert(lastestReading);
    } else if (type == "light") {
      allAlerts.light = lightAlert(lastestReading);
    } else if (type == "sound") {
      allAlerts.sound = soundAlert(lastestReading);
    }
  }
}, 5000);

app.get("/", (req, res) => {
  res.send("Circadian");
});

app.get("/api/report/:date", async (req, res) => {
  let date = req.params.date + "%";

  let result = await db.query(
    "SELECT * FROM sensor_data WHERE CAST(date_recorded AS VARCHAR) LIKE $1 ORDER BY type, time_recorded",
    [date]
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

app.post("/api/signup", async (req, res) => {
  //first checks if the username is taken
  let result = await db.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);

  //Check any erroneous inputs
  let errors = [];
  if (result.rows.length > 0) {
    errors.push("Username already taken");
  }
  if (req.body.dob > "2011-01-01") {
    errors.push("Must be 15 years or older");
  }
  if (req.body.password != req.body.passwordCheck) {
    errors.push("Passwords don't match");
  }
  if (req.body.password.length < 8) {
    errors.push("Password needs to be 8 characters");
  }

  //Sends errors OR adds user depending on if any error occursed
  if (errors.length != 0) {
    res.statusCode = 403;
    res.send(errors);
  } else {
    let accQuery = await db.query(
      "INSERT INTO users (username, password, fname, mname, lname, dob) VALUES ($1, $2, $3, $4, $5, $6);",
      [
        req.body.username,
        req.body.password,
        req.body.fname,
        req.body.mname,
        req.body.lname,
        req.body.dob,
      ]
    );
    res.sendStatus(200);
  }
});

app.post("/api/login", async (req, res) => {
  //Use response code 200 for OK login, 403 for NOT OK

  let result = await db.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [req.body.username, req.body.password]
  );
  if (result.rows.length == 1) {
    writeUser(result.rows[0].id);
    readUser();
    loggedInUser = result.rows[0];
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

// endpoint to send loggedInUser details to various components
app.get("/api/user", async (req, res) => {
  res.json(loggedInUser);
});

app.get("/api/alerts", (req, res) => {
  res.json(allAlerts);
});

//Query for getting all dates for logged in user
app.get("/api/report/all/dates", async (req, res) => {
  let result = await db.query(
    "SELECT DISTINCT CAST(date_recorded AS VARCHAR) FROM sensor_data WHERE user_id=$1",
    [parseInt(user_id.toString())]
  );

  res.send(result.rows);
});

//Query for getting user details/settings for logged in user
app.get("/api/user/details", async (req, res) => {
  let result = await db.query(
    "SELECT fname, mname, lname, CAST(dob AS VARCHAR), bedtime, tracking_length FROM users, settings WHERE id=$1 AND user_id=$1",
    [parseInt(user_id.toString())]
  );

  res.send(result.rows);
});

//Query for updating logged in users details/settings
app.post("/api/user/update", async (req, res) => {
  const { fname, mname, lname, dob, bedtime, trackingLength } = req.body;

  //Query for user details
  await db.query(
    "UPDATE users SET fname=$1, mname=$2, lname=$3, dob=$4 WHERE id=$5",
    [fname, mname, lname, dob, parseInt(user_id.toString())],

    (err, result) => {
      if (err) {
        console.log(`Error: ${err} \nQuery Result: ${result}`);
        return;
      }
      //Second query for user settings
      db.query(
        "UPDATE settings SET bedtime=$1, tracking_length=$2 WHERE user_id=$3",
        [bedtime, trackingLength, parseInt(user_id.toString())],

        (err, result) => {
          if (err) {
            console.log(`Error: ${err} \nQuery Result: ${result}`);
            return;
          }
          res.json({ success: true });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Circadian App on port ${port}`);
});
