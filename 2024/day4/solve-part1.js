const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })
_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map((line) => line.split(''))
  .map((line, y, letters) => line.map((_, x) => (
    letters[y][x] != 'X' ? 0 : (
      ((letters[y]?.[x + 1] == 'M' && letters[y]?.[x + 2] == 'A' && letters[y]?.[x + 3] == 'S') ? 1 : 0) +
      ((letters[y]?.[x - 1] == 'M' && letters[y]?.[x - 2] == 'A' && letters[y]?.[x - 3] == 'S') ? 1 : 0) +
      ((letters[y - 1]?.[x] == 'M' && letters[y - 2]?.[x] == 'A' && letters[y - 3]?.[x] == 'S') ? 1 : 0) +
      ((letters[y + 1]?.[x] == 'M' && letters[y + 2]?.[x] == 'A' && letters[y + 3]?.[x] == 'S') ? 1 : 0) +
      ((letters[y + 1]?.[x + 1] == 'M' && letters[y + 2]?.[x + 2] == 'A' && letters[y + 3]?.[x + 3] == 'S') ? 1 : 0) +
      ((letters[y - 1]?.[x - 1] == 'M' && letters[y - 2]?.[x - 2] == 'A' && letters[y - 3]?.[x - 3] == 'S') ? 1 : 0) +
      ((letters[y + 1]?.[x - 1] == 'M' && letters[y + 2]?.[x - 2] == 'A' && letters[y + 3]?.[x - 3] == 'S') ? 1 : 0) +
      ((letters[y - 1]?.[x + 1] == 'M' && letters[y - 2]?.[x + 2] == 'A' && letters[y - 3]?.[x + 3] == 'S') ? 1 : 0)
    )
  )))
  .flatten()
  .sum()
  .tap(log)
  .value()
