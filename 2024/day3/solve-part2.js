const _ = require('lodash')
const { readFileSync } = require('fs')
const { i } = require('mathjs/lib/entry/pureFunctionsAny.generated')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('do()')
  .map(input => input.split("don't()"))
  .map(([input]) => input)
  .map(input => [...input.matchAll(/(mul\(\d+,\d+\))/g)].map(([a]) => a))
  .flatten()
  .map(input => input.split('mul(').pop().split(')').shift().split(',').map(Number))
  .map(([a, b]) => a * b)
  .sum()
  .tap(log)
  .value()
