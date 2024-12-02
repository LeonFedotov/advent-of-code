const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(report => report.split(' ').map(Number))
  .filter((levels) => 
    levels.every((level, index) => index == 0 || level > levels[index-1] && level <= levels[index-1]+3) || 
    levels.every((level, index) => index == 0 || level < levels[index-1] && level >= levels[index-1]-3)
  )
  .size()
  .tap(log)
  .value()
