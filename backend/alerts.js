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
    (alert.message = `Room temperature is ${
      temp - optimalMax
    } degrees above the optimal level`),
      (alert.recommendation = `Consider turning on a heater`);

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

export function humidityAlert() {}

export function lightAlert() {}

export function soundAlert() {}
