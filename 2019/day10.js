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
			cols.concat(col == '#' ? [[y, x]] : [])), [])
		)
	), [])
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
	.keys()
	.size()
	.tap(console.log)
	.value()
