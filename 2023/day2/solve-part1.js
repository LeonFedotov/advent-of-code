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
      set.reduce((res, count) => ({ ...res,
        [count.trim().split(' ').pop()]: +count.trim().split(' ').shift()
      }), {})
    )
  ])
  .tap(r => console.log(JSON.stringify(r, false, 2)))
  .tap(console.log)
  .value()
