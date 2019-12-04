const _ = require('lodash')
const [start, end] = '357253-892942'.split('-').map((r) => parseInt(r, 10))
const list = []
for(let i = start;i<=end;i++) {
	list.push(`${i}`.split(''))
}

_
	.chain(list)
	.filter(i => i.indexOf('0') == -1)
	.filter(i =>
		_.every(i, (c, i, a) =>
			(i == 0) ||
			(parseInt(a[i-1], 10) <= parseInt(c, 10))
		)
	)
	.filter((i) => _.some(i, (c, i, a) => i != 0 && c == a[i-1]))
	.map((i) => _.groupBy(i))
	.values()
	.filter(i => _.some(i, (c) => c.length == 2))
	.size()
	.tap(console.log)
	.value()
