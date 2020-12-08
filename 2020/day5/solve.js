const seatId = (addr, rows = [...Array(128).keys()], cols = [...Array(8).keys()]) => {
	const [cur, ...rest] = addr
	switch(cur) {
		case 'B':
			return seatId(rest, rows.slice(rows.length/2), cols)
		break;
		case 'F':
			return seatId(rest, rows.slice(0, rows.length/2), cols)
		break;
		case 'R':
			return seatId(rest, rows, cols.slice(cols.length/2))
		break;
		case 'L':
			return seatId(rest, rows, cols.slice(0, cols.length/2))
		break;
		default:
			return rows.pop()*8+cols.pop()
		break;
	}	
}
``.trim().split('\n').map((str) => seatId(str.split(''))).sort((a,b) => b-a)
