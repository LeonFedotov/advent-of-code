const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })

_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n')
  .map(report => report.split(' ').map(Number))
  .map(report => [report, ...report.map((level, index) => report.toSpliced(index, 1))])
  .filter((mlevels) => mlevels.some((levels) =>
      levels.slice(1).every((level, index) => level > levels[index] && level <= levels[index]+3) ||
      levels.slice(1).every((level, index) => level < levels[index] && level >= levels[index]-3)
    )
  )
  .size()
  .tap(log)
  .value()
