const _ = require('lodash')
const { readFileSync } = require('fs')

const digitMap = [
  1,
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  2,3,4,5,6,7,8,9
]

const regex = /(\d|oneight|twone|threeight|eightwo|eightwone|eighthree|sevenine|one|two|three|four|five|six|seven|eight|nine)/g

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => line
    .replaceAll(regex, (match) => 
      match == 'twone' ? '21' : 
      match == 'threeight' ? '38' : 
      match == 'eightwo' ? '82' : 
      match == 'eightwone' ? '821' :
      match == 'eighthree' ? '83' : 
      match == 'sevenine' ? '79' :
      match == 'oneight' ? '18' : 
      match == 'one' ? '1' :
      match == 'two' ? '2' :
      match == 'three' ? '3' :
      match == 'four' ? '4' :
      match == 'five' ? '5' :
      match == 'six' ? '6' :
      match == 'seven' ? '7' :
      match == 'eight' ? '8' :
      match == 'nine' ? '9' :
      match
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