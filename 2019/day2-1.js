const _ = require('lodash')
const { table } = require('table')
const mem =
	`1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,10,23,2,10,23,27,1,27,6,31,1,13,31,35,1,13,35,39,1,39,10,43,2,43,13,47,1,47,9,51,2,51,13,55,1,5,55,59,2,59,9,63,1,13,63,67,2,13,67,71,1,71,5,75,2,75,13,79,1,79,6,83,1,83,5,87,2,87,6,91,1,5,91,95,1,95,13,99,2,99,6,103,1,5,103,107,1,107,9,111,2,6,111,115,1,5,115,119,1,119,2,123,1,6,123,0,99,2,14,0,0`
	.trim()
	.split(',')
	.map(i => parseInt(i, 10))

const ADD = 1
const MULTIPLY = 	2
const FINISHED = 99

const exec = (input, noun, verb) => {
	let mem = _.clone(input)
	mem[1] = noun
	mem[2] = verb

	for(let pointer = 0; pointer < mem.length; pointer+=4) {
		const [op, x, y, t] = mem.slice(pointer, pointer+4)
		if(op == FINISHED) {
			break;
		} else if(op == ADD) {
			mem[t] = mem[x] + mem[y]
		} else if(op == MULTIPLY) {
			mem[t] = mem[x] * mem[y]
		}
	}

	return mem[0]
}

_
	.chain(100)
	.range()
	.map(x => _.range(100).map(y => [x, y, exec(mem, x, y)]))
	.flatten()
	.find(([,,x]) => x == 19690720)
	.slice(0, 2)
	.reduce((n, v) => 100*n+v)
	.tap(console.log)
	.value()

