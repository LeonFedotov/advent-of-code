const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_.chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line) => line.split(':').pop().trim().replace(/ /g, ''))
  .map(Number)
  .thru(([totalRaceTime, maxDistance]) => _.range(totalRaceTime).filter((time) => time*(totalRaceTime-time) > maxDistance).length)
  .tap(log)
  .value()
