const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input-short2'))
  .trim()
  .split("don't()")
  // .thru(input => [...input.matchAll(/(mul\(\d+,\d+\))/g)])
  // .map(([match]) => match)
  // .tap(log)
  // .map(input => [...input.match(/\((\d+,\d+)\)/)].pop().split(',').map(Number))
  // .map(([a, b]) => a * b)
  // .sum()
  .tap(log)
  .value()
