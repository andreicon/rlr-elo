const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');
const testData = require('./testData');
const shuffle = require('./shuffle');

const elo = new EloRank(15);

// generate combinations of drivers from testData
const drivers = shuffle(testData);

console.log(drivers)

const combinations = Combinatorics.Combination.of(drivers, 2).toArray();

console.log(combinations)

combinations.map(combination => {

  const player1Win = elo.getExpected(combination[0].rating, combination[1].rating);
  const player2Win = elo.getExpected(combination[1].rating, combination[0].rating);

  combination[0].rating = elo.updateRating(player1Win, 1, combination[0].rating);
  combination[1].rating = elo.updateRating(player2Win, 0, combination[1].rating);

})

console.log(testData);