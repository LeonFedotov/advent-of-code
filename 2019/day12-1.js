const _ = require('lodash')
const { lcm } = require('mathjs')

const input = `
	<x=1, y=4, z=4>
	<x=-4, y=-1, z=19>
	<x=-15, y=-14, z=12>
	<x=-17, y=1, z=10>
`
	.trim()
	.split('\n')
	.map(l => _.fromPairs(l.trim().slice(1,-1).split(', ').map(v => v.split('='))))
	.map(pos => ({
		pos: _.mapValues(pos, Number),
		vel: {x:0, y:0, z:0}
	}))
	.map((c, i, arr) => {
		return {...c, others: arr.slice(0, i).concat(arr.slice(i+1))}
	})

const findRepeat = (axis, input) => {
	const record = new Set()
	while(1) {
		const hash = input.map(({pos, vel}) => [pos[axis], vel[axis]]).toString()
		if(record.has(hash)) {
			break
		} else {
			record.add(hash)
		}

		input
			.forEach((ma, i, input) =>
				ma
					.others
					.forEach(mb =>
							ma.vel[axis] =
								ma.pos[axis] < mb.pos[axis] ? ma.vel[axis] + 1 :
								ma.pos[axis] > mb.pos[axis] ? ma.vel[axis] - 1 :
								ma.vel[axis]
					)
			)

		input
			.forEach((ma) =>
					ma.pos[axis] += ma.vel[axis]
			)
	}
	return record.size
}

console.log(
	lcm(
		findRepeat('x', _.cloneDeep(input)),
		findRepeat('y', _.cloneDeep(input)),
		findRepeat('z', _.cloneDeep(input))
	)
)
