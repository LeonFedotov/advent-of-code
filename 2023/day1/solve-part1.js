const _ = require('lodash')
const { readFileSync } = require('fs')

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => [line.split(''), line.split('').reverse()])
  .map(([line, reversed]) => {
    return parseInt(`${line.find((c) => !_.isNaN(parseInt(c, 10)))}${reversed.find((c) => !_.isNaN(parseInt(c, 10)))}`, 10)
  }
    
  )
  .sum()
  .tap(console.log)
  .value()