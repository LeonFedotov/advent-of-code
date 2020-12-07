let adv = (function(){
	let pos = [0, 0]
	return () => pos = [(pos[0]+3)%31, pos[1]+1]
}())
let pos = [0, 0]
let trees = 0
let mapping = input.trim().split('\n')
while((pos = adv())[1] < mapping.length) {
	const [x, y] = pos
  trees += mapping[y][x] == '#' ? 1 : 0
}
console.log(trees)
