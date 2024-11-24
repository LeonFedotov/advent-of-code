const _ = require('lodash')
const { readFileSync } = require('fs')
const log = (v) => console.dir(v, { depth: null })

const allCards = _
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(line => line.split(':'))
  .map(([, numbers]) => numbers.split(' | ').map(n => n.trim().split(' ').filter(a => a).map(a=>+a)))
  .map(([winning, got], index) => [index, got.filter(number => winning.includes(number)).length])
  // .filter(([,winning]) => winning)
  .tap(log)
  .value()

let count = 0
const getEarnings = (cards) => _.chain(cards)
  .map(([index, count]) => count && _.chain(allCards).slice(index+1, count+index+1).value())
  .tap((v) => count += v.length)
  // .tap(() => log(count))
  .map((v) => getEarnings(v))
  .value()

getEarnings(allCards)

console.log(count)
