import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { cts, stc, step, type Edge, type Point, type Map } from "./steps.ts";

const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];

const getEdges = (map: string[][]) => ([x, y]) =>
  MOVES.reduce((edges: Edge[], [x2, y2]) => {
    const next = map[y+y2]?.[x+x2];
    if (next && next !== "#") {
      edges.push([x+x2, y+y2, 1]);
    }
    return edges;
  }, []);

const pairs = (arr, callback) => {
  for(var i=0; i < arr.length - 1; i++) {
    callback(arr[i], arr[i + 1])
  }
  callback(arr[arr.length-1], arr[0])
}

export async function day23b(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));

  const start: Point = [1, 0], end: Point = [map[0].length-2, map.length-1];

  const splits = new Set([cts(start), cts(end)])
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const point = map[y][x];
      if (point === "#") continue;
      const edges = getEdges(map)([x,y])
      if (edges.length > 2)
        splits.add(cts([x,y]))
    }
  }

  const graph = {}
  pairs(Array.from(splits), (from, to) => {
    step(stc(from), stc(to), getEdges(map), (distance) => {
      graph[from] ??= new Set<Edge>();
      graph[to] ??= new Set<Edge>();
      graph[from].add([...stc(to), distance]);
      graph[to].add([...stc(from), distance]);
    }, splits);
  });

  console.log(graph)

  let distance = 0
  step(start, end, (point) => graph[cts(point)] || getEdges(map)(point), (newDistance) => distance = newDistance > distance ? newDistance : distance);

  return distance;
}

const answer = await day23b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
