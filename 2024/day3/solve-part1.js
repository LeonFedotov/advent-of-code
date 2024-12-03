const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .thru(v => v.matchAll(/mul\((\d+),(\d+)\)/g))
  .toArray()
  .map(([,a, b]) => a * b)
  .sum()
  .tap(log)
  .value()
