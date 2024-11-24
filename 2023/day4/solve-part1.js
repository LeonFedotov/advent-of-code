const _ = require('lodash')
const { readFileSync } = require('fs')
const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line =>
    line
      .split(':')
      .pop()
      .trim()
      .split(' | ')
      .map(col => col.split(' ').filter((n) => n.trim()).map(n=>+n))
  )
  .map(([winning, got]) => got.filter(number => winning.includes(number)))
  .filter(l => l.length)
  .map(card => card.length == 1 ? 1 : (card.reduce((c) => c*2, 1)/2))
  //.take(1)
  .tap(log)
  .sum()
  .tap(log)
  .value()
