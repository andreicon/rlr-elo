const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');
const testData = require('./testData');
const shuffle = require('./shuffle');

const elo = new EloRank(15);

console.log("INPUT DATA:")
console.log(testData)
console.log("==========================================================")
console.log("")

// randomize the data to get fake race results
const drivers = shuffle(testData);

console.log("RACE RESULTS:")
console.log(testData)
console.log("==========================================================")
console.log("")

// generate 1v1 combinations to calculate elo change
const combinations = Combinatorics.Combination.of(drivers, 2).toArray();

combinations.map(combination => {

  const player1Win = elo.getExpected(combination[0].rating, combination[1].rating);
  const player2Win = elo.getExpected(combination[1].rating, combination[0].rating);

  combination[0].rating = elo.updateRating(player1Win, 1, combination[0].rating);
  combination[1].rating = elo.updateRating(player2Win, 0, combination[1].rating);

})

// sort testdata by rating

const sortedData = testData.sort((a, b) => {
  return b.rating - a.rating;
})

console.log("FINAL ELO RESULTS:")
console.log(sortedData)
console.log("==========================================================")
console.log("")