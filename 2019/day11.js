const _ = require('lodash')
const input = `3,8,1005,8,311,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,28,1006,0,2,2,109,10,10,1,1,19,10,1,1103,20,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,65,1006,0,33,1,7,0,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,94,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,116,1,1002,1,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,142,2,1101,6,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,168,2,1107,7,10,1006,0,68,1,5,6,10,1,2,5,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,206,1,1008,16,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,232,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,253,1006,0,30,2,1,4,10,1,1008,1,10,2,1109,4,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,291,101,1,9,9,1007,9,1051,10,1005,10,15,99,109,633,104,0,104,1,21102,387508339604,1,1,21102,1,328,0,1106,0,432,21101,0,47677022988,1,21101,0,339,0,1106,0,432,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,209382822080,1,1,21102,386,1,0,1105,1,432,21101,179318123523,0,1,21102,1,397,0,1105,1,432,3,10,104,0,104,0,3,10,104,0,104,0,21102,709584904960,1,1,21101,420,0,0,1106,0,432,21102,709580444008,1,1,21102,431,1,0,1105,1,432,99,109,2,21202,-1,1,1,21102,1,40,2,21101,0,463,3,21101,0,453,0,1105,1,496,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,458,459,474,4,0,1001,458,1,458,108,4,458,10,1006,10,490,1101,0,0,458,109,-2,2106,0,0,0,109,4,2102,1,-1,495,1207,-3,0,10,1006,10,513,21102,1,0,-3,21202,-3,1,1,22102,1,-2,2,21102,1,1,3,21102,532,1,0,1106,0,537,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,560,2207,-4,-2,10,1006,10,560,21201,-4,0,-4,1106,0,628,22101,0,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,579,0,0,1105,1,537,21201,1,0,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,598,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,620,21201,-1,0,1,21101,0,620,0,106,0,495,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`

const insp = (ins) => (''+ins).split('').reverse().map(Number)

const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JMPT = 5
const JMPF = 6
const LT = 7
const EQ = 8
const REL = 9
const FINISHED = 99

const exec = function * (mem) {

	let p = 0
	let relp = 0
	const res = []

	const valueWithMode = (m, p) =>
		m == 1 && !_.isUndefined(mem[p]) ? mem[p] :
		m == 2 && !_.isUndefined(mem[relp + mem[p]]) ? mem[relp + mem[p]] :
		!_.isUndefined(mem[mem[p]]) ? mem[mem[p]] :
		0

	while(p < mem.length) {
		const [g, h, ...[xm=0, ym=0, tm=0]] = insp(mem[p++])
		const op = Number(`${h || 0}${g}`)
		//console.log({op, m:{xm, ym, tm}, relp, p, mem: [mem[p-1], mem[p]]})
		if(op == FINISHED) {
			yield res.splice(0, res.length)
			break;
		} else if(op == REL) {
			relp += valueWithMode(xm, p++)
		} else if(op == INPUT) {
			mem[xm == 2 ? relp+mem[p++] : mem[p++]] = yield res.splice(0, res.length)
		} else if(op == OUTPUT) {
			res.push(valueWithMode(xm, p++))
		} else if(op == ADD) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			const t = tm == 2 ? relp+mem[p++]:mem[p++]
			mem[t] = x+y
		} else if(op == MULTIPLY) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			const t = tm == 2 ? relp+mem[p++]:mem[p++]
			mem[t] = x*y
		} else if(op == JMPT) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			if(x != 0) {
				p = y
			}
		} else if(op == JMPF) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			if(x == 0) {
				p = y
			}
		} else if(op == LT) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			const t = tm == 2 ? relp+mem[p++]:mem[p++]
			mem[t] = x<y
		} else if(op == EQ) {
			const x = valueWithMode(xm, p++)
			const y = valueWithMode(ym, p++)
			const t = tm == 2 ? relp+mem[p++]:mem[p++]
			mem[t] = x==y
		}
	}
}

const robot = (mem, input = 1) => {
	const map = {'5:5': input}
	let pos = [5, 5]
	let dir = 0
	const iter = exec(mem)

	iter.next()

	let output = iter.next(input)
	while(!output.done) {
		let [color, turn] = output.value
		map[pos.join(':')] = [...pos, color]
		dir = dir == 0 && turn == 0 ? 3 : (dir+(turn == 0 ? -1 : 1))%4
		switch(dir) {
			case 0:
				pos = [pos[0], pos[1]+1]
			break
			case 1:
				pos = [pos[0]+1, pos[1]]
			break
			case 2:
				pos = [pos[0], pos[1]-1]
			break
			case 3:
				pos = [pos[0]-1, pos[1]]
			break
		}
		map[pos.join(':')] = map[pos.join(':')] || [...pos, 0]
		output = iter.next(map[pos.join(':')][2])
	}
	return map
}

_
	.chain(input)
	.split(',')
	.map(Number)
	.thru(_.curryRight(robot, 2)(1))
	.values()
	.sortBy(([,x]) => x)
	.groupBy(([y]) => y)
	.mapValues(v => v.map(([,,c]) => c == 1 ? '██' : '  '))
	.map(v => v.join(''))
	.join('\n')
	.tap(console.table)
	.value()
