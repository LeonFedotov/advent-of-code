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



const mapping = ``.trim().split('\n')

const slope = ([x, y]) => {
	let pos = [0, 0]
	return () => pos = [(pos[0]+x)%31, pos[1]+y]
}

const countTrees = (adv) => {
	let pos = [0, 0]
	let trees = 0	
	while((pos = adv())[1] < mapping.length) {
		const [x, y] = pos
	    trees += mapping[y][x] == '#' ? 1 : 0
	}
	return trees
}

[[1,1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((sum, slp) => {return sum*countTrees(slope(slp))}, 1)
