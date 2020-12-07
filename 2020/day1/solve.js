``.trim().split('\n').map((n) => parseInt(n, 10)).map((x, i, list) => list.find((y) => x+y == 2020)*x).find((v) => !isNaN(v))
