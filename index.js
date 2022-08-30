const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');
const testData = require('./testData');
const shuffle = require('./shuffle');

const elo = new EloRank(15);

function calculateEloChange(inputData) {
  const drivers = Object.keys(inputData);
  // generate 1v1 combinations to calculate elo change
  const combinations = Combinatorics.Combination.of(drivers, 2).toArray();
  
  combinations.map(combination => {
  
    const player1Win = elo.getExpected(inputData[combination[0]].rating, inputData[combination[1]].rating);
    const player2Win = elo.getExpected(inputData[combination[1]].rating, inputData[combination[0]].rating);
  
    inputData[combination[0]].rating = elo.updateRating(player1Win, 1, inputData[combination[0]].rating);
    inputData[combination[1]].rating = elo.updateRating(player2Win, 0, inputData[combination[1]].rating);
  
  })
  return inputData
}

function testEloCalculation(inputData) {
  const drivers = shuffle(inputData);
  const raceOutput = calculateEloChange(drivers)
  
  const sortedData = raceOutput.sort((a, b) => {
    return b.rating - a.rating;
  })

  return sortedData;
}

console.log("INPUT DATA:")
console.log(testData)
console.log("==========================================================")
console.log("")

let output = [];

for (let i = 0; i < 10000; i++) {
  output = testEloCalculation(testData);
}

console.log(output)