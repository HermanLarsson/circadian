function randomInt() {
  return Math.floor(Math.random(0, 5) * 5);
}

export function tempAlert(temp) {
  const optimalMax = 19;
  const optimalMin = 15;

  const lowerTemp = [
    "Open windows after sunset to let cooler air into the room",
    "Run a fan facing outward to push hot air outside",
    "Keep blinds closed all evening to trap less heat indoors",
    "Turn off lights and electronics before bed to reduce warmth",
    "Place a fan near the window to pull in cooler night air",
    "Consider opening a window for a few minutes",
  ];

  const raiseTemp = [
    "Close windows and curtains early to keep warm air inside",
    "Turn on a small lamp or warm light to add gentle heat",
    "Use thick curtains to reduce drafts from windows",
    "Keep doors closed to trap heat in the room",
    "Run a fan on low near a radiator to spread warm air evenly",
  ];

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
    alert.recommendation = raiseTemp[randomInt()];
  } else if (temp > optimalMax) {
    console.log(`${temp} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room temperature is ${(temp - optimalMax).toFixed(
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
  const optimalMax = 50;
  const optimalMin = 30;

  const lowerHum = [
    "Open a window briefly to let air escape",
    "Run a fan to improve airflow",
    "Keep the bathroom door closed after showering",
    "Turn on an exhaust fan to remove moist air",
    "Avoid drying clothes indoors before bed",
  ];

  const raiseHum = [
    "Place a bowl of water near a radiator or heater",
    "Leave the bathroom door open after a warm shower",
    "Hang damp towels in the room for a short time",
    "Use a humidifier before going to sleep",
    "Keep a small container of warm water near your bed",
  ];

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
    alert.recommendation = raiseHum[randomInt()];
  } else if (humidity > optimalMax) {
    console.log(`${humidity} is higher than the optimal level`);
    alert.status = "bad";
    alert.message = `Room humidity is ${(humidity - optimalMax).toFixed(
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
  const optimalMax = 10;

  const lowerLight = [
    "Turn down the lights an hour before bed",
    "Close curtains or blinds to block outside light",
    "Switch to warm lamps instead of bright ceiling lights",
    "Turn off unused lights around the room",
    "Reduce screen brightness in the evening",
  ];

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
  const optimalMax = 30;

  const lowerSound = [
    "Close windows to block outside noise",
    "Turn off TVs or speakers before bed",
    "Use soft furnishings to absorb sound",
    "Run a fan for gentle white noise",
    "Make sure your phone is switched to silent mode",
  ];

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
    alert.recommendation = lowerSound[randomInt()];
  } else {
    console.log(`${sound} is within the optimal range`);
    alert.status = "good";
    alert.message = `Room sound is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;
  }

  return alert;
}
