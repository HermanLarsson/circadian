const maxDistances = {
  temperature: 10,
  humidity: 10,
  light: 50,
  sound: 30,
};

const optimalValues = {
  temperature: 19,
  humidity: 50,
  light: 30,
  sound: 40,
};

export function getAverages(sensorData) {
  const avgData = {
    temperature: [],
    humidity: [],
    light: [],
    sound: [],
  };

  sensorData.forEach((row) => avgData[row.type].push(parseFloat(row.value)));

  for (const [type, values] of Object.entries(avgData)) {
    avgData[type] = Math.round(
      values.reduce((acc, val) => acc + val, 0) / values.length,
    );
  }
  return avgData;
}

export function calculateScores(avgData) {
  // TODO:
  //VVVVVVV TO BE IMPORTED FROM SOMEWHERE ELSE
  let scores = {};
  for (const [type, value] of Object.entries(avgData)) {
    let diff = Math.abs(optimalValues[type] - value);

    //To test values, uncomment diff and set your own value!
    //diff = 5;

    // Two different scoring algorithms.
    //QUADRATIC SCORING
    //scores[type] = 100 * (1 - (diff / maxDistances[type]) ** 2);

    //LINEAR SCORING
    scores[type] = Math.round(100 * (1 - diff / maxDistances[type]));
    if (scores[type] < 0) {
      scores[type] = 0;
    }
  }

  console.log(scores);
  return scores;
}
