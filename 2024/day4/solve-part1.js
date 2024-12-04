const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })
//XMAS

const countAraound = (map, x, y) => (
    map[y][x] != 'X' ? 0 : (
      ((map[y]?.[x+1] == 'M' && map[y]?.[x+2] == 'A' && map[y]?.[x+3] == 'S') ? 1 : 0) +
      ((map[y]?.[x-1] == 'M' && map[y]?.[x-2] == 'A' && map[y]?.[x-3] == 'S') ? 1 : 0) +
      ((map[y-1]?.[x] == 'M' && map[y-2]?.[x] == 'A' && map[y-3]?.[x] == 'S') ? 1 : 0) +
      ((map[y+1]?.[x] == 'M' && map[y+2]?.[x] == 'A' && map[y+3]?.[x] == 'S') ? 1 : 0) +

      ((map[y+1]?.[x+1] == 'M' && map[y+2]?.[x+2] == 'A' && map[y+3]?.[x+3] == 'S') ? 1 : 0) +
      ((map[y-1]?.[x-1] == 'M' && map[y-2]?.[x-2] == 'A' && map[y-3]?.[x-3] == 'S') ? 1 : 0) +
      ((map[y+1]?.[x-1] == 'M' && map[y+2]?.[x-2] == 'A' && map[y+3]?.[x-3] == 'S') ? 1 : 0) +
      ((map[y-1]?.[x+1] == 'M' && map[y-2]?.[x+2] == 'A' && map[y-3]?.[x+3] == 'S') ? 1 : 0)
    )
  )
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
