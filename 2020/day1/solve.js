``.trim().split('\n').map((n) => parseInt(n, 10)).map((x, i, list) => list.find((y) => x+y == 2020)*x).find((v) => !isNaN(v))
``.trim().split('\n').map((n) => parseInt(n, 10)).map((x, i, list) => list.map((y) => list.find((z) => x+y+z == 2020)*y*x).find((v) => !isNaN(v))).filter((a) => a).pop()
