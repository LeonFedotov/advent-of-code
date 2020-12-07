``.trim().split('\n').map(l => { 
	const [len, letter, str] = l.split(' ');
	return str.replace(new RegExp(`[^${letter[0]}]+`, 'g'), '').match(new RegExp(`^\\w{${len.replace('-', ',')}}$`))
}).filter(a=> a).length

``.trim().split('\n').map(l => { 
	const [len, letter, str] = l.split(' ');
	const [x, y] = len.split('-')
	return str[x-1] == letter[0] ^ str[y-1] == letter[0]
}).reduce((t,c) => t+c)
