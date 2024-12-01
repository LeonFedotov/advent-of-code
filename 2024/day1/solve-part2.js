const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => line.split('   '))
  .unzip()
  .map((col) => col.map(Number))
  .thru(([left, right]) => left.map(n => right.filter(m => m == n).length * n))
  .sum()
  .tap(log)
  .value()