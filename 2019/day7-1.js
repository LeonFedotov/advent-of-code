const _ = require('lodash')
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

const input = `3,8,1001,8,10,8,105,1,0,0,21,34,51,64,81,102,183,264,345,426,99999,3,9,102,2,9,9,1001,9,4,9,4,9,99,3,9,101,4,9,9,102,5,9,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,1002,9,5,9,4,9,99,3,9,102,3,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,1002,9,3,9,1001,9,5,9,1002,9,5,9,101,3,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99`
//const input = `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`

const mem = _
	.chain(input)
	.split(',')
	.map(Number)
	.value()

const exec = (p = 0, mem = [], input = []) => {
	mem = mem.slice()
	const ADD = 1
	const MULTIPLY = 2
	const INPUT = 3
	const OUTPUT = 4
	const JMPT = 5
	const JMPF = 6
	const LT = 7
	const EQ = 8
	const FINISHED = 9

	const insp = (ins) => (''+ins).split('').reverse().map(Number)

	while(p < mem.length) {
		const [op, h, ...[xm, ym]] = insp(mem[p++])
		if(op == FINISHED && h == FINISHED) {
			return []
			break;
		} else if(op == INPUT) {
			mem[mem[p++]] = input.shift()
		} else if(op == OUTPUT) {
			return [p+1, mem, xm?mem[p++]:mem[mem[p++]]]
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
}

const init = (phases) => phases.reduce((res, phase, i) => {
	if(i == 0) {
		return [exec(0, mem, [phase, 0])]
	}
	const [,,freq] = res[i-1]
	res.push(exec(0, mem, [phase, freq]))
	return res
}, [])

const crank = (list) => list.reduce((list, [p, mem], i) => {
	const [,,freq] = list[i == 0 ? list.length-1 : i-1]
	let res = exec(p, mem, [freq])
	if(res.length == 3) {
		list[i] = res
	} else {
		list[i].push(99)
	}
	return list
}, list)
_
 	.chain([5, 6, 7, 8, 9])
 	.thru(permute)
 	.map((p) => [p, init(p)])
 	.map(([phases, opt]) => {
 		while(1) {
 			opt = crank(opt)
 			if(_.last(opt).length == 4) {
 				break
 			}
 		}
 		return [phases, opt]
 	})
 	.map(([p, opt]) => [p, _.last(opt)[2]])
 	.sort(([,a], [,b]) => b-a)
 	.first()
 	.tap(console.log)
 	.value()
