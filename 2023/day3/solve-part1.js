const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

const getAdjecentNumbers = (map, line, col) => _.chain([
    map[line - 1] || '',
    map[line],
    map[line + 1] || ''
  ])
  .map(line => [...line.matchAll(/\d+/g)].map(({ 0: num, index }) => [index, num.length, num]))
  .flatten()
  .filter(([index, len]) =>
    col-1 == index || col == index || col+1 == index ||
    col-1 == index+len-1 || col == index+len-1 || col+1 == index+len-1
  )
  .map(([,,number]) => +number)
  .value()

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line, index,  map) =>
    [
      ...line.matchAll(/[^\.|\d]/g)
    ]
    .map(({index: col}) => getAdjecentNumbers(map, index, col))
  )
  .flattenDeep()
  .tap(log)
  .sum()
  .tap(log)
  .value()
