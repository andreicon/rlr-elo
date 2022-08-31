const trueskill = require("trueskill");

calculateTrueskill = (raceResults) => {
  
  let maxRating = 0;
  let minRating = 20000;

  raceResults.map(driver => {
    maxRating = driver.oldIRating > maxRating ? driver.oldIRating : maxRating;
    minRating = driver.oldIRating < minRating ? driver.oldIRating : minRating;
  })

  const input = raceResults.map(driver => {
    const driverSkill = driver.oldIRating;
    return {
      ...driver,
      skill: [driverSkill, driverSkill/28.3],
      oldSkill: [driverSkill, driverSkill/28.3],
      rank: driver.finPos
    }
  })
  trueskill.AdjustPlayers(input);

  return input;
}

module.exports = calculateTrueskill;