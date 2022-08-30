const testData = require('./testData');
const shuffle = require('./lib/shuffle');
const calculateEloChange = require('./lib/eloChange');

let output = [];

for (let i = 0; i < 10000; i++) {

  let drivers = shuffle(testData);

  for (let i = 0; i < drivers.length; i++) {
    drivers[i].position = i + 1;
  }

  const raceOutput = calculateEloChange(drivers)
  
  const sortedData = raceOutput.sort((a, b) => {
    return b.rating - a.rating;
  })

  output = sortedData;
}

console.log(output)