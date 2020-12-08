``.trim().split('\n\n').map(g => g.split('\n').join('').split('').filter((v, i, s) => s.indexOf(v) == i).length).reduce((a,b) => a+b)
``.trim().split('\n\n').map(g => g.split('\n').join('').split('').filter((v, i, s) => s.indexOf(v) == i).filter((l) => g.split('\n').every((u) => u.indexOf(l) > -1)).length).reduce((a,b) => a+b)
