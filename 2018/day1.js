const _ = require('lodash')
const {readFileSync} = require('fs')
_
	.chain(readFileSync('./day1-input'))
	.trim()
	.split('\n')
	.map(Number)
	.reduce(((a, n) => a+n), 0)
	.tap(console.log)
	.value()
