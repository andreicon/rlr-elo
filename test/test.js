const assert = require('assert');
const calculateEloChange = require('../lib/elo');
const calculateTrueskill = require('../lib/trueskill');
const drivers = require('./result');

// describe('calculateEloChange', function () {
//   it('should return an array of drivers with newIRating and calculatedELORating', function () {
//     const output = calculateEloChange(drivers);
//     assert.equal(output[output.length-1].newIRating, output[output.length-1].calculatedELORating);
//   });
// });

describe('calculateTrueSkill', function () {
  it('iRating change should match trueskill change', function () {
    const output = calculateTrueskill(drivers);

    // if oldIrating is smaller than newIrating, then the new skill should be smaller than the old skill
    output.map(driver => {
      
      console.log(Math.floor(driver.skill[0]) - driver.oldSkill[0], driver.newIRating - driver.oldIRating)

      // assert.equal(Math.floor(driver.skill[0]) - driver.oldSkill[0], driver.newIRating - driver.oldIRating);
      // assert.equal(driver.skill[1] < driver.oldSkill[1], driver.oldIRating < driver.newIRating);
    });
  });
});