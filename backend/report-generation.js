export function getAverages(sensorData) {
  const avgData = {
    temperature: [],
    humidity: [],
    light: [],
    sound: [],
  };

  sensorData.forEach((row) => avgData[row.type].push(parseFloat(row.value)));

  for (const [type, values] of Object.entries(avgData)) {
    avgData[type] = values.reduce((acc, val) => acc + val, 0) / values.length;
  }
  console.log(avgData);
}
