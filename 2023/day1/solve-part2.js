const _ = require('lodash')
const { readFileSync } = require('fs')

const options = {
  twone: '21',
  threeight: '38',
  eightwo: '82',
  eightwone: '821',
  eighthree: '83',
  sevenine: '79',
  oneight: '18',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => line
    .replaceAll(
      new RegExp(`(\\d|${_.values(options).join('|')})`, 'g'),
      (match) => options[match] || match
    )
    .split('')
    .filter(l => l.search(/\d/) !== -1)
  )
  .map(digits => [_.first(digits), _.last(digits)].join(''))
  .map(Number)
  .tap(console.log)
  .sum()
  .tap(console.log)
  .value()
