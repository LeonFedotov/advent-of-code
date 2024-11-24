const { workerData, parentPort } = require('worker_threads')
const { seedRanges, inputFile } = workerData
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
    const {source, target} = keys.find(({ source, len }) => source <= seed && seed <= source+len) || { source: seed, target: seed, len: 1}
    return target + (seed - source)
  }
    
}

const seedToLocation = _
  .chain(readFileSync(inputFile))
  .trim()
  .split('\n\n')
  .slice(1)
  .map(getMappingFunction)
  .reduce((acc, fn) => (seed) => fn(acc(seed)), (seed) => seed)
  .value()

const results = seedRanges.map(([start, len]) => {
    console.log('start', start, len)
    let min = Infinity
    for(let i = start; i < start+len; i++) {
      min = Math.min(min, seedToLocation(i))
      //console.log(min)
    }
    console.log('end', start, len, min)
    return min
})
parentPort.postMessage(results)
