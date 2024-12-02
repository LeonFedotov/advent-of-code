const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input-short'))
  .trim()
  .split('\n')
  .map(report => report.split(' ').map(Number))
  .tap(log)
  .value()
