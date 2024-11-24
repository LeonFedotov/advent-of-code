const _ = require('lodash')
const { readFileSync } = require('fs')

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => line.split(':'))
  .map(([game, sets]) => [game, ...(sets.split(';').map(s => s.trim().split(',')))])
  .map(([game, ...sets]) => [
    +game.split(' ').pop(),
    sets.map((set) =>
      set.reduce((res, count) => ({
        ...res,
        [count.trim().split(' ').pop()]: +count.trim().split(' ').shift()
      }), {})
    )
  ])
  .tap(r => console.log(JSON.stringify(r, false, 2)))
  .tap(console.log)
  .value()

// Determine which games would have been possible if the bag had been
// loaded with only
// 12 red cubes, 13 green cubes, and 14 blue cubes.
// What is the sum of the IDs of those games?

