const _ = require('lodash')
const input = `3,8,1001,8,10,8,105,1,0,0,21,34,51,64,81,102,183,264,345,426,99999,3,9,102,2,9,9,1001,9,4,9,4,9,99,3,9,101,4,9,9,102,5,9,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,1002,9,5,9,4,9,99,3,9,102,3,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,1002,9,3,9,1001,9,5,9,1002,9,5,9,101,3,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99`
//const input = `3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`
const userInput = [0,0]
const mem = _
	.chain(input)
	.split(',')
	.map(Number)
	.value()

const exec = (mem, input) => {
	mem = mem.slice()
	const res = []
	const ADD = 1
	const MULTIPLY = 2
	const INPUT = 3
	const OUTPUT = 4
	const JMPT = 5
	const JMPF = 6
	const LT = 7
	const EQ = 8
	const FINISHED = 9

	let p = 0
	const insp = (ins) => (''+ins).split('').reverse().map(Number)

	while(p < mem.length) {
		const [op, h, ...[xm, ym]] = insp(mem[p++])
		if(op == FINISHED && h == FINISHED) {
			break;
		} else if(op == INPUT) {
			console.log('input', input)
			mem[mem[p++]] = input.shift()
		} else if(op == OUTPUT) {
			res.push(xm?mem[p++]:mem[mem[p++]])
			console.log('output', _.last(res))
		} else if(op == ADD) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			const t = mem[p++]
			mem[t] = x+y
		} else if(op == MULTIPLY) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			const t = mem[p++]
			mem[t] = x*y
		} else if(op == JMPT) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			if(x != 0) {
				p = y
			}
		} else if(op == JMPF) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			if(x == 0) {
				p = y
			}
		} else if(op == LT) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			const t = mem[p++]
			mem[t] = x<y
		} else if(op == EQ) {
			const x = xm?mem[p++]:mem[mem[p++]]
			const y = ym?mem[p++]:mem[mem[p++]]
			const t = mem[p++]
			mem[t] = x==y
		}
	}
	return res
}

function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

_
	.chain([0,1,2,3,4])
	.thru(permute)
	.map((option) =>
		option.reduce(((prev, phase) => exec(mem, [phase, prev.pop()])), [0])
	)
	.max()
	.tap(console.log)
	.value()
