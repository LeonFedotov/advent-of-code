const _ = require('lodash')
const { Worker } = require('worker_threads')
const { readFileSync } = require('fs')
const os = require('os')
const log = (v) => console.dir(v, { depth: null })

const inputFile = './input-short'

async function runWorker(workerData, index) {
  console.log('running worker', index, workerData)
  return new Promise((resolve, reject) => {
    let result;

    const worker = new Worker('./part2-worker.js', {
      workerData: {
        seedRanges: workerData,
        inputFile
      }
    })
    .on('message', (r) => resolve(result = r))
    .on('error', reject)
    .on('exit', (code) => {
      console.log('finished worker', index, result)
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

async function main() {
  try {
    const results = await _
      .chain(readFileSync(inputFile))
      .trim()
      .split('\n\n')
      .shift()
      .split(':')
      .pop()
      .split(' ')
      .filter((s) => s.trim() != '')
      .map(Number)
      .chunk(2)
      .thru((ranges) => {
        const chunkSize = Math.ceil(ranges.length / (os.cpus().length*2))
        return _.chunk(ranges, chunkSize)
      })
      .map(runWorker)
      .thru(Promise.all.bind(Promise))
      .value()
      console.log(results.flat())
      _.chain(results)
      .flatten()
      .min()
      .tap(log)
      .value()
  } catch (err) {
    console.error('Error:', err)
  }
}

main()
