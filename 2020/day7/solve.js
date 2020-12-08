a
	.replace(/(\s*bag\.|\s*bags\.|\s*bags|\s*bag)/g,'')
	.replace(/ contain /g,', ')
	.split('\n')
	.filter((r) => r.indexOf('no other') == -1)
	.map((r) => r.split(', '))
	.reduce((map, [parent, ...children], index, list) => {
		children.forEach((child) => {
			key = child.replace(/\d+\s/, '')
			map[key] = map[key] || []
			map[key].push(parent)
		})

		if(index == list.length-1) {
			const tracePath = (start) => 
				map[start] ? [start, map[start].filter((v,i,s) => s.indexOf(v) == i).map(tracePath)] : start
			return tracePath('shiny gold')
		} else {
			return map
		}
		
	}, {})
    .toString()
	.split(',')
	.filter((v, i, self) => self.indexOf(v) == i && v != 'shiny gold')
	.length


``.replace(/(\s*bag\.|\s*bags\.|\s*bags|\s*bag)/g,'')
	.replace(/ contain /g,', ')
	.split('\n')
	.filter((r) => r.indexOf('no other') == -1)
	.map((r) => r.split(', '))
	.reduce((map, [parent, ...children], index, list) => {
		map[parent] = children
		
		if(index == list.length-1) {
			const tracePath = (child) => {
				const [count, ...name] = child.split(' ')
				const c = parseInt(count, 10)
				const n = name.join(' ')


				return !map[n] ? c : c+c*map[n].reduce((a, cur) => a + tracePath(cur), 0)
			}
			return tracePath('1 shiny gold')
		} else {
			return map
		}
		
	}, {})-1
