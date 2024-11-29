const _ = require('lodash')
const { readFileSync } = require('fs')
const log = (v) => console.dir(v, { depth: null })

_.chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line) => line.split(':').pop().trim().split(' ').filter(v=>v!='').map(Number))
  .thru((data) => _.zip(...data))
  .map(([totalRaceTime, maxDistance]) =>
    _.range(totalRaceTime).filter((time) => time*(totalRaceTime-time) > maxDistance).length
  )
  .reduce((acc, v) => acc * v)
  .tap(log)
  .value()
