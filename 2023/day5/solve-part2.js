const _ = require('lodash')
const { Worker } = require('worker_threads')
const { readFileSync } = require('fs')
const os = require('os')

const numCPUs = os.cpus().length*2
const inputFile = './input'
const ranges = _
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
    const chunkSize = Math.ceil(ranges.length / numCPUs)
    return _.chunk(ranges, chunkSize)
  })
  .value()

async function runWorker(workerData, index) {
  console.log('running worker', index, workerData)
  return new Promise((resolve, reject) => {
    const worker = new Worker('./part2-worker.js', {
      workerData: {
        seedRanges: workerData,
        inputFile
      }
    })
    let result;
    worker.on('message', (r) => resolve(result = r))
    worker.on('error', reject)
    worker.on('exit', (code) => {
      console.log('finished worker', index, result)
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

async function main() {
  try {
    const results = await Promise.all(ranges.map(runWorker))
    console.log(_.min(results.flat()))
  } catch (err) {
    console.error('Error:', err)
  }
}

main()
