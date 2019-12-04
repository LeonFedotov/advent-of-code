const _ = require('lodash')

_
	.chain('357253-892942')
	.split('-')
	.map(Number)
	.thru((args) => _.range(...args))
	.map((i) => i.toString().split('').map(Number))
	.filter(i => 
		i.indexOf(0) == -1 &&
		_(i).every((c, i, a) => i == 0 || a[i-1] <= c) &&
		_(i).some((c, i, a) => i != 0 && c == a[i-1])
	)
	.size()
	.tap(console.log)
	.value()
	
