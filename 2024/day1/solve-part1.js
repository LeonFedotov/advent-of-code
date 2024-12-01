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
  .map(col => col.sort((a, b) => a-b))
  .thru(v => _.zip(...v))
  .map(([a, b]) => Math.abs(a-b))
  .sum()
  .tap(log)
  .value()