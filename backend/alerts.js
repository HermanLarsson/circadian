export function tempAlert(temp) {
  const optimalMax = 19;
  const optimalMin = 15;

  const alert = {
    message: "",
    recommendation: "",
  };

  if (temp < optimalMin) {
    console.log(`${temp} is lower than the optimal level`);
    alert.message = `Room temperature is ${
      optimalMin - temp
    } degrees below the optimal level`;
    alert.recommendation = `Consider opening a window for a few minutes`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else if (temp > optimalMax) {
    console.log(`${temp} is higher than the optimal level`);
    alert.message = `Room temperature is ${
      temp - optimalMax
    } degrees above the optimal level`;
    alert.recommendation = `Consider turning on a heater`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else {
    console.log(`${temp} is within the optimal range`);
    alert.message = `Room temperature is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;

    console.log(alert.message);
    console.log(alert.recommendation);
  }

  return alert;
}

export function humidityAlert(humidity) {
  const optimalMax = 50;
  const optimalMin = 30;

  const alert = {
    message: "",
    recommendation: "",
  };

  if (humidity < optimalMin) {
    console.log(`${humidity} is lower than the optimal level`);
    alert.message = `Room humidity is ${
      optimalMin - humidity
    }% below the optimal level`;
    alert.recommendation = `Consider turning on a humidifier`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else if (humidity > optimalMax) {
    console.log(`${humidity} is higher than the optimal level`);
    alert.message = `Room humidity is ${
      humidity - optimalMax
    }% above the optimal level`;
    alert.recommendation = `Consider turning on an air conditioner or dehumidifier`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else {
    console.log(`${humidity} is within the optimal range`);
    alert.message = `Room humidity is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;

    console.log(alert.message);
    console.log(alert.recommendation);
  }

  return alert;
}

export function lightAlert(light) {
  // TODO: Add functionality which uses user selected bedtime to alter optimalMax level.
  const optimalMax = 10;

  const alert = {
    message: "",
    recommendation: "",
  };

  if (light > optimalMax) {
    console.log(`${light} is higher than the optimal level`);
    alert.message = `Room light is ${
      light - optimalMax
    } lux above the optimal level`;
    alert.recommendation = `Time to loxwer the lights and close the curtains`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else {
    console.log(`${light} is within the optimal range`);
    alert.message = `Room light is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;

    console.log(alert.message);
    console.log(alert.recommendation);
  }

  return alert;
}

export function soundAlert(sound) {
  const optimalMax = 30;

  const alert = {
    message: "",
    recommendation: "",
  };

  if (light > optimalMax) {
    console.log(`${sound} is higher than the optimal level`);
    alert.message = `Room sound is ${
      sound - optimalMax
    } dB above the optimal level`;
    alert.recommendation = `Time to loxwer the noise in the room`;

    console.log(alert.message);
    console.log(alert.recommendation);
  } else {
    console.log(`${sound} is within the optimal range`);
    alert.message = `Room sound is within the optimal level`;
    alert.recommendation = `You're perfectly set up for a great sleep`;

    console.log(alert.message);
    console.log(alert.recommendation);
  }

  return alert;
}
