const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(report => report.split(' ').map(Number))
  .filter((levels) =>
    levels.slice(1).every((level, index) => level > levels[index] && level <= levels[index]+3) ||
    levels.slice(1).every((level, index) => level < levels[index] && level >= levels[index]-3)
  )
  .size()
  .tap(log)
  .value()
