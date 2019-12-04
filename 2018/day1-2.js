const _ = require('lodash')
const {readFileSync} = require('fs')

_
	.chain(readFileSync('./day1-input'))
	.trim()
	.split('\n')
	.map(Number)
	.thru((list) => {
		const mem = []
		let last = 0
		while(1) {
			for(let i = 0,j=list.length;i<j;i++) {
				const c = list[i]
				last += c
				if(!mem[last]) {
					mem[last] = 1
				} else {
					return last
				}
			}
		}
	})
	.tap(console.log)
	.value()
