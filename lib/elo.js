const Combinatorics = require('js-combinatorics');
const EloRank = require('elo-rank');

const elo = new EloRank(15);

function calculateEloChange(raceResults) {
  const drivers = Object.keys(raceResults);
  // generate 1v1 combinations to calculate elo change
  const combinations = Combinatorics.Combination.of(drivers, 2).toArray();
  const output = []

  combinations.map(combination => {
  
    const player1WinExpectation = elo.getExpected(raceResults[combination[0]].oldIRating, raceResults[combination[1]].oldIRating);
    const player2WinExpectation = elo.getExpected(raceResults[combination[1]].oldIRating, raceResults[combination[0]].oldIRating);
  
    const player1Win = raceResults[combination[0]].finPos > raceResults[combination[1]].finPos ? 1 : 0;
    const player2Win = raceResults[combination[1]].finPos > raceResults[combination[0]].finPos ? 1 : 0;

    output[combination[0]] = raceResults[combination[0]]
    output[combination[1]] = raceResults[combination[1]]

    output[combination[0]].calculatedELORating = elo.updateRating(player1WinExpectation, player1Win, raceResults[combination[0]].oldIRating);
    output[combination[1]].calculatedELORating = elo.updateRating(player2WinExpectation, player2Win, raceResults[combination[1]].oldIRating);
  
  })
  return output
}

module.exports = calculateEloChange;