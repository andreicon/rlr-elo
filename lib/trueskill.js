const trueskill = require("trueskill");

calculateTrueskill = (raceResults) => {
  return trueskill.AdjustPlayers(raceResults);
}

module.exports = calculateTrueskill;