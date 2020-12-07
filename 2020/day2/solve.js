``.trim().split('\n').map(l => { 
	const [len, letter, str] = l.split(' ');
	return str.replace(new RegExp(`[^${letter[0]}]+`, 'g'), '').match(new RegExp(`^\\w{${len.replace('-', ',')}}$`))
}).filter(a=> a).length
