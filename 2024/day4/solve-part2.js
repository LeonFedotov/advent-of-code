const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })
//XMAS

const countAraound = (map, x, y) => (
    map[y][x] == 'A' &&
    ['MAS', 'SAM'].includes(map[y-1]?.[x-1]+map[y][x]+map[y+1]?.[x+1]) &&
    ['MAS', 'SAM'].includes(map[y-1]?.[x+1]+map[y][x]+map[y+1]?.[x-1])
  ) ? 1 : 0

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line) => line.split(''))
  .map((line, y, letters) => line.map((_, x) => countAraound(letters, x, y)))
  .flatten()
  .sum()
  .tap(log)
  .value()
