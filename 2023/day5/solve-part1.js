const _ = require('lodash')
const { readFileSync } = require('fs')

const log = (v) => console.dir(v, { depth: null })
const getMappingFunction = (string) => { 
  let [fromto, keys] = string.split(' map:').map(s => s.trim())
  fromto = fromto.split('-to-')
  keys = keys
    .split('\n')
    .map(s => s.trim().split(' ').map(Number))
    .map(([target, source, len]) => ({ source, target, len }))


  return (seed) => {
    const {source, target, len} = keys.find(({ source, len }) => source <= seed && seed <= source+len) || { source: seed, target: seed, len: 1}
    return target + (seed - source)
  }
    
}
_
  .chain(readFileSync('./input'))
  .trim()
  .split('\n\n')
  .thru(([seeds, ...maps]) => [
    seeds.split(':').pop().split(' ').filter((s) => s.trim() != '').map(Number), 
    maps.map(getMappingFunction).reduce((acc, fn) => {
      return (seed) => fn(acc(seed))
    }, (seed) => seed)
  ])
  .thru(([seeds, seedToLocation]) => seeds.map(seedToLocation))
  .min()
  .tap(log)
  .value()
