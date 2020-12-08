``.trim().split('\n\n').map(g => g.split('\n').join('').split('').filter((v, i, s) => s.indexOf(v) == i).length).reduce((a,b) => a+b)
