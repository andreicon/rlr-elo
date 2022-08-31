const { readFile } = require('fs/promises');
const trueskill = require("trueskill");


(async function() {
  let json = {};
  let races = []
  let drivers = {};
  let driversArray = [];
  
  races = JSON.parse(
    await readFile('./races.json')
  );

  races.map(event => {
    event.prequalResults.map(prequalResult => {
      drivers[prequalResult.driver] = prequalResult
    })
    event.raceResults.map(raceResult => {
      raceResult.drivers.map(driver => {
        drivers[driver._id] = {
          ...drivers[driver._id],
          ...driver,
        }
      })
    })
  })

  races.map(event => {
    event.prequalResults.map(prequalResult => {
      drivers[prequalResult.driver].rank = prequalResult.rank
    })

    driversArray = Object.values(drivers)

    trueskill.AdjustPlayers(driversArray)

    driversArray.map(driver => {
      drivers[driver.driver] = driver
    })

    event.raceResults.map(raceResult => {
      raceResult.drivers.map(driver => {
        drivers[driver._id].rank = raceResult.rank
      })
    })

    driversArray = Object.values(drivers)

    trueskill.AdjustPlayers(driversArray)

    driversArray.map(driver => {
      drivers[driver.driver] = driver
    })
  })

  console.log(JSON.stringify(drivers))
})()
