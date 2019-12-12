const _ = require('lodash')

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

_
	.range(1000)
	.forEach(step => {
		input
			.forEach((ma, i, input) =>
				input
					.slice(0, i)
					.concat(input.slice(i+1))
					.forEach(mb =>
						['x', 'y', 'z'].forEach(axis => {
							ma.vel[axis] =
								ma.pos[axis] < mb.pos[axis] ? ma.vel[axis] + 1 :
								ma.pos[axis] > mb.pos[axis] ? ma.vel[axis] - 1 :
								ma.vel[axis]
						})
					)
			)

		input
			.forEach((ma) =>
				['x', 'y', 'z'].forEach(axis =>
					ma.pos[axis] = ma.pos[axis] + ma.vel[axis]
				)
			)

	})
_
	.chain(input)
	.map(m => ({
		...m,
		pe: _.chain(m.pos).values().map(v => Math.abs(v)).sum().value(),
		ke: _.chain(m.vel).values().map(v => Math.abs(v)).sum().value(),
	}))
	.map(m => m.pe*m.ke)
	.sum()
	.tap(console.log)
	.value()
