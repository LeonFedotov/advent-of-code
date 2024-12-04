const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })
_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line) => line.split(''))
  .map((line, y, letters) => line.map((_, x) => (
    (
      letters[y][x] == 'A' &&
      ['MAS', 'SAM'].includes(letters[y-1]?.[x-1]+letters[y][x]+letters[y+1]?.[x+1]) &&
      ['MAS', 'SAM'].includes(letters[y-1]?.[x+1]+letters[y][x]+letters[y+1]?.[x-1])
    ) ? 1 : 0
  )))
  .flatten()
  .sum()
  .tap(log)
  .value()
