const _ = require('lodash')
_
	.chain(`
		.###..#######..####..##...#
		########.#.###...###.#....#
		###..#...#######...#..####.
		.##.#.....#....##.#.#.....#
		###.#######.###..##......#.
		#..###..###.##.#.#####....#
		#.##..###....#####...##.##.
		####.##..#...#####.#..###.#
		#..#....####.####.###.#.###
		#..#..#....###...#####..#..
		##...####.######....#.####.
		####.##...###.####..##....#
		#.#..#.###.#.##.####..#...#
		..##..##....#.#..##..#.#..#
		##.##.#..######.#..#..####.
		#.....#####.##........#####
		###.#.#######..#.#.##..#..#
		###...#..#.#..##.##..#####.
		.##.#..#...#####.###.##.##.
		...#.#.######.#####.#.####.
		#..##..###...###.#.#..#.#.#
		.#..#.#......#.###...###..#
		#.##.#.#..#.#......#..#..##
		.##.##.##.#...##.##.##.#..#
		#.###.#.#...##..#####.###.#
		#.####.#..#.#.##.######.#..
		.#.#####.##...#...#.##...#.
	`)
	.trim()
	.split('\n')
	.map(l => [...l.trim()])
	.reduce(((rows, row, y) => rows.concat(
		row.reduce(((cols, col, x) =>
			cols.concat(col == '#' ? [[y, x]] : [])
		), [])
	)), [])
	.map(([y0, x0], i, arr) => [
		y0, x0,
		arr
			.slice(0, i)
			.concat(arr.slice(i+1))
			.map(([y1, x1]) => [
				y1, x1,
				Math.atan2(y1 - y0, x1 - x0),
				Math.sqrt(Math.pow((x0-x1), 2) + Math.pow((y0-y1), 2))
			])
	])
	.map(([y, x, a]) => [y, x, _.groupBy(a, ([,,angle]) => angle)])
	.maxBy(([,,angles]) => _.keys(angles).length)
	.get(2)
	.toPairs()
	.sortBy(([angle]) => Number(angle))
	.partition(([angle]) => angle >= Math.atan2(-1, 0))
	.flatten()
	.map(([a, l]) => [a, _.sortBy(l, ([,,,d]) => d)])
	// .thru(list => {
	// 	const res = []
	// 	while(1) {
	// 		let left = false
	// 		for(let i = 0;i<list.length;i++) {
	// 			const [angle, distances] = list[i]
	// 			if(distances.length) {
	// 				left = true
	// 				res.push(distances.shift())
	// 			}
	// 		}
	// 		if(left == false) {
	// 			break
	// 		}
	// 	}
	// 	return res
	// })
	// .get(199)
	.get('199.1.0')
	.thru(([y, x]) => x*100+y)
	.tap(console.log)
	.value()
