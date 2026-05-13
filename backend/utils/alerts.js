import { optimalValues, tempRange, humRange } from "./optimalValues.js";
import {
  lowerTemp,
  raiseTemp,
  lowerHum,
  raiseHum,
  lowerLight,
  lowerSound,
} from "./recommendations.js";

function randomInt() {
  return Math.floor(Math.random(0, 5) * 5);
}

export function tempAlert(temp) {
  const alert = {
    sensor: "temperature",
    value: temp,
    unit: "°C",
    status: "",
    message: "",
    recommendation: "",
  };

  if (temp < tempRange.tempMin) {
    console.log(`${temp} is lower than the optimal level`);
    alert.status = "bad";
    alert.message = `Room temperature is ${(tempRange.tempMin - temp).toFixed(
      1
    )} degrees below the optimal level`;
    alert.recommendation = raiseTemp[randomInt()];
  } else if (temp > tempRange.tempMax) {
    console.log(`${temp} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room temperature is ${(temp - tempRange.tempMax).toFixed(
      1
    )} degrees above the optimal level`;
    alert.recommendation = lowerTemp[randomInt()];
  } else {
    console.log(`${temp} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room temperature is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}

export function humidityAlert(humidity) {
  const alert = {
    sensor: "humidity",
    value: humidity,
    unit: "%",
    status: "",
    message: "",
    recommendation: "",
  };

  if (humidity < humRange.humMin) {
    console.log(`${humidity} is lower than the optimal level`);
    alert.status = "bad";
    alert.message = `Room humidity is ${(humRange.humMin - humidity).toFixed(
      1
    )}% below the optimal level`;
    alert.recommendation = raiseHum[randomInt()];
  } else if (humidity > humRange.humMax) {
    console.log(`${humidity} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room humidity is ${(humidity - humRange.humMax).toFixed(
      1
    )}% above the optimal level`;
    alert.recommendation = lowerHum[randomInt()];
  } else {
    console.log(`${humidity} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room humidity is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}

export function lightAlert(light) {
  // TODO: Add functionality which uses user selected bedtime to alter optimalMax level.
  const alert = {
    sensor: "light",
    value: light,
    unit: "lux",
    status: "",
    message: "",
    recommendation: "",
  };

  if (light > optimalValues.light) {
    console.log(`${light} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room light is ${(light - optimalValues.light).toFixed(
      1
    )} lux above the optimal level`;
    alert.recommendation = lowerLight[randomInt()];
  } else {
    console.log(`${light} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room light is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}

export function soundAlert(sound) {
  const alert = {
    sensor: "sound",
    value: sound,
    unit: "dB",
    status: "",
    message: "",
    recommendation: "",
  };

  if (sound > optimalValues.sound) {
    console.log(`${sound} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room sound is ${(sound - optimalValues.sound).toFixed(
      1
    )} dB above the optimal level`;
    alert.recommendation = lowerSound[randomInt()];
  } else {
    console.log(`${sound} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room sound is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}
