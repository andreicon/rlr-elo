const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');

const elo = new EloRank(15);

function calculateEloChange(raceResults) {
  const drivers = Object.keys(raceResults);
  // generate 1v1 combinations to calculate elo change
  const combinations = Combinatorics.Combination.of(drivers, 2).toArray();
  
  const output = []

  combinations.map(combination => {
  
    const player1WinExpectation = elo.getExpected(raceResults[combination[0]].rating, raceResults[combination[1]].rating);
    const player2WinExpectation = elo.getExpected(raceResults[combination[1]].rating, raceResults[combination[0]].rating);
  
    const player1Win = raceResults[combination[0]].position > raceResults[combination[1]].position ? 1 : 0;
    const player2Win = raceResults[combination[1]].position > raceResults[combination[0]].position ? 1 : 0;

    output[combination[0]] = raceResults[combination[0]]
    output[combination[1]] = raceResults[combination[1]]

    output[combination[0]].rating = elo.updateRating(player1WinExpectation, player1Win, raceResults[combination[0]].rating);
    output[combination[1]].rating = elo.updateRating(player2WinExpectation, player2Win, raceResults[combination[1]].rating);
  
  })
  return output
}

module.exports = calculateEloChange;