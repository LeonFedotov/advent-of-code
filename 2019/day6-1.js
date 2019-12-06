const _ = require('lodash')
_
	.chain(require('fs').readFileSync('./day6-input'))
	.trim()
	.split('\n')
	.map(l => l.trim().split(')'))
	.reduce(((m, [v, t]) => ({...m, [t]:v })), {})
	.thru(map => _
		.chain(map)
		.pick(['YOU', 'SAN'])
		.map((m, i) => {
			const res = [m]
			let c = map[m]
			while(c != 'COM') {
				res.push(c)
				c = map[c]
			}
			return res.reverse()
		})
		.thru(([YOU, SAN]) => {
			const split = YOU.findIndex((v, i) => SAN[i] != v)
			return YOU.slice(split).length+SAN.slice(split).length
		})
		.value()
	)
	.tap(console.log)
	.value()

