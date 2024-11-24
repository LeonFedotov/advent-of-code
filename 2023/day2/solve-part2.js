const _ = require('lodash')
const { readFileSync } = require('fs')

const limits = {
  red: 12,
  green: 13,
  blue: 14
}

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
  .map(([game, sets]) => [game, _
    .chain(sets)
    .reduce((res, { red = 0, green = 0, blue = 0 }) => ({
      ...res,
      red: res.red > red ? res.red : red,
      green: res.green > green ? res.green : green,
      blue: res.blue > blue ? res.blue : blue,
    }), { red: 0, green: 0, blue: 0 })
    .filter((value => value))
    .reduce((res, v) => res * v)
    .value()
  ])

  .tap(console.dir)
  .sumBy(([, powers]) => powers)
  .tap(console.log)
  .value()

