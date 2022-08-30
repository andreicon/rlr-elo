const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');
const testData = require('./testData');

const elo = new EloRank(15);

// generate combinations of drivers from testData
const drivers = Object.keys(testData);
const combinations = Combinatorics.Combination.of(drivers, 2).toArray();

console.log(combinations)

combinations.map(combination => {

  const player1Win = elo.getExpected(testData[combination[0]].rating, testData[combination[1]].rating);
  const player2Win = elo.getExpected(testData[combination[1]].rating, testData[combination[0]].rating);

  testData[combination[0]].rating = elo.updateRating(player1Win, 1, testData[combination[0]].rating);
  testData[combination[1]].rating = elo.updateRating(player2Win, 0, testData[combination[1]].rating);

  console.log(testData[combination[0]].rating, testData[combination[1]].rating)

})