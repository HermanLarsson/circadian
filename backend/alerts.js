export function tempAlert(temp) {
  const optimalMax = 19;
  const optimalMin = 15;

  const alert = {
    sensor: "temperature",
    value: temp,
    unit: "°C",
    status: "",
    message: "",
    recommendation: "",
  };

  if (temp < optimalMin) {
    console.log(`${temp} is lower than the optimal level`);
    alert.status = "bad";
    alert.message = `Room temperature is ${(optimalMin - temp).toFixed(
      1
    )} degrees below the optimal level`;
    alert.recommendation = `Consider turning on a heater`;
  } else if (temp > optimalMax) {
    console.log(`${temp} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room temperature is ${(temp - optimalMax).toFixed(
      1
    )} degrees above the optimal level`;
    alert.recommendation = `Consider opening a window for a few minutes`;
  } else {
    console.log(`${temp} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room temperature is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}

export function humidityAlert(humidity) {
  const optimalMax = 50;
  const optimalMin = 30;

  const alert = {
    sensor: "humidity",
    value: humidity,
    unit: "%",
    status: "",
    message: "",
    recommendation: "",
  };

  if (humidity < optimalMin) {
    console.log(`${humidity} is lower than the optimal level`);
    alert.status = "bad";
    alert.message = `Room humidity is ${(optimalMin - humidity).toFixed(
      1
    )}% below the optimal level`;
    alert.recommendation = `Consider turning on a humidifier`;
  } else if (humidity > optimalMax) {
    console.log(`${humidity} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room humidity is ${(humidity - optimalMax).toFixed(
      1
    )}% above the optimal level`;
    alert.recommendation = `Consider turning on an air conditioner or dehumidifier`;
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
  const optimalMax = 10;

  const alert = {
    sensor: "light",
    value: light,
    unit: "lux",
    status: "",
    message: "",
    recommendation: "",
  };

  if (light > optimalMax) {
    console.log(`${light} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room light is ${(light - optimalMax).toFixed(
      1
    )} lux above the optimal level`;
    alert.recommendation = `Time to lower the lights and close the curtains`;
  } else {
    console.log(`${light} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room light is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}

export function soundAlert(sound) {
  const optimalMax = 30;

  const alert = {
    sensor: "sound",
    value: sound,
    unit: "dB",
    status: "",
    message: "",
    recommendation: "",
  };

  if (sound > optimalMax) {
    console.log(`${sound} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room sound is ${(sound - optimalMax).toFixed(
      1
    )} dB above the optimal level`;
    alert.recommendation = `Time to lower the noise in the room`;
  } else {
    console.log(`${sound} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room sound is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}
