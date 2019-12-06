const _ = require('lodash')
_
	.chain(require('fs').readFileSync('./day6-input'))
	.trim()
	.split('\n')
	.map(l => l.trim().split(')'))
	.reduce(((m, [v, t]) => ({...m, [t]:v })), {})
	.map((v, k, map) => {
		let count = 0
		while(k != 'COM') {
			k = map[k]
			count += 1
		}
		return count
	})
	.sum()
	.tap(console.log)
	.value()
