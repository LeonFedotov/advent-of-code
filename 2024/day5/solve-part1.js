const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

const isLegalUpdate = (rules, update) =>
  update.every((u, index) =>
    index == 0 || !rules[u] || rules[u].every((r) => !update.slice(0, index).includes(r)))

_
  .chain(readFileSync('./input-short'))
  .trim()
  .split('\n\n')
  .thru(([rules, updates]) => [
    rules
      .split('\n')
      .map((rule) => rule.split('|').map(Number))
      .reduce((rules, [key, value]) => ({
        ...rules,
        [key]: [...(rules[key] || []), value]
      }), {}),
    updates.split('\n').map((u) => u.split(',').map(Number))
  ])
  .thru(([rules, updates]) => updates.filter((update) => isLegalUpdate(rules, update)))
  .map((update) => update[Math.round(update.length/2)-1])
  .sum()
  .tap(log)
  .value()