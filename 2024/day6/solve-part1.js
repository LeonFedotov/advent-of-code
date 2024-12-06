const _ = require('lodash')
const { readFileSync } = require('fs')
const { xgcd } = require('mathjs/lib/entry/pureFunctionsAny.generated')

const log = (v) => console.dir(v, { depth: null })
const directions = ['^', '>', 'v', '<']
const nextObstacle = (mapping, { x, y, dir }) =>
  dir == 0 ? _
    .chain(mapping)
    .slice(0, y)
    .reverse()
    .findIndex(pos => pos[x] == '#')
    .value() :
  dir == 1 ? _
    .chain(mapping[y])
    .slice(x)
    .findIndex(cell => cell == '#')
    .value() - 1 :
  dir == 2 ? _
    .chain(mapping)
    .slice(y)
    .findIndex(pos => pos[x] == '#')
    .value() - 1 :
  dir == 3 ? _
    .chain(mapping[y])
    .slice(0, x)
    .reverse()
    .findIndex(pos => pos == '#')
    .value() : void 0

_
  .chain(readFileSync('./input'))
  .trim()
  .tap(console.log)
  .split('\n')
  .map((row) => row.split(''))
  .thru( mapping => {
    const start = mapping
      .map((row, y) => row
        .map((dir, x) =>
          directions.includes(dir) ? { x, y, dir: directions.indexOf(dir)} : false
        )
      )
      .flat()
      .filter(x => x)
      .pop()
    mapping[start.y][start.x] = 'X'
    let dist = 0

    do {
      const { dir } = start
      dist = nextObstacle(mapping, start)

      if(dist == 0) {
        start.dir = (dir + 1) % 4
        continue
      } else if(dist < 0) {
        break;
      }

      for(let y = 0; y < mapping.length; y++) {
        for(let x = 0; x < mapping[y].length; x++) {
          if(dir == 0 && y < start.y && y >= start.y-dist && x == start.x) {
            if(mapping[y][x] != '#') {
              mapping[y][x] = 'X'
            } else {
              break;
            }
          } else if(dir == 1 && x >= start.x && x <= start.x+dist && y == start.y) {
            if(mapping[y][x] != '#') {
              mapping[y][x] = 'X'
            } else {
              break;
            }
          } else if(dir == 2 && y >= start.y && y <= start.y+dist && x == start.x) {
            if(mapping[y][x] != '#') {
              mapping[y][x] = 'X'
            } else {
              break;
            }
          } else if(dir == 3 && x < start.x && x >= start.x-dist && y == start.y) {
            if(mapping[y][x] != '#') {
              mapping[y][x] = 'X'
            } else {
              break;
            }
          }
        }
      }

      start.y = (
        dir == 0 ? start.y - dist :
        dir == 2 ? start.y + dist : start.y
      )

      start.x = (
        dir == 1 ? start.x + dist :
        dir == 3 ? start.x - dist : start.x
      )
    } while(dist >= 0)

    const { dir } = start

    const left = (
      dir == 0 ? start.y :
      dir == 1 ? mapping[start.y].length - start.x :
      dir == 2 ? mapping.length - start.y :
      dir == 3 ? start.x : 0
    )

    for(let i = 0; i < left; i++) {
      mapping[start.y + ( dir == 0 ? -i : dir == 2 ? i : 0)][start.x + (dir == 1 ? i : dir == 3 ? -i : 0)] = 'X'
    }
    return mapping;
  })
  .map(row => row.join(''))
  .join('\n')
  .trim()
  .tap(console.log.bind(console, '\n----\n'))
  .tap(console.log)
  .filter(c => c == 'X')
  .size()
  .tap(log)
  .value()
