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

//Simple averaging
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

//Calculate scores based on a Linear algorithm.
//Uses the Optimal Values and Max Distances to calculate the score.
//Is thus dynamic for each type of data and can easily be adjusted.
export function calculateScores(avgData) {
  let scores = {};
  for (const [type, value] of Object.entries(avgData)) {
    let diff = Math.abs(optimalValues[type] - value);

    //LINEAR SCORING
    scores[type] = Math.round(100 * (1 - diff / maxDistances[type]));
    if (scores[type] < 0) {
      scores[type] = 0;
    }
  }

  return scores;
}

//Front-end data requires separate arrays for each sensor.
//This function splits them up into different timelines.
export function generateTimelines(rows) {
  const timelines = {
    light: [],
    sound: [],
    temperature: [],
    humidity: [],
  };

  for (let i = 0; i < rows.length; i++) {
    const curr_type = rows[i]["type"];
    const curr_value = rows[i]["value"];
    rows[i][curr_type] = curr_value;

    timelines[curr_type].push(rows[i]);
  }

  return timelines;
}
