import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { enqueue } from "./crucible.ts";

export async function day17b(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split("").map(Number));

  const state = {
    loss: 0,
    visited: new Set<string>,
    queue: [[{ x: 0, y: 0, dir: 90, dist: 0 }, { x: 0, y: 0, dir: 180, dist: 0 }]]
  };

  w: while (true) {
    for (const path of state.queue[state.loss] ?? []) {
      if (path.dist >= 4 && path.y === map[0].length-1 && path.x === map.length-1)
        break w;
      if (path.dist < 10)
        enqueue(path, path.dir, map, state);
      if (path.dist >= 4) {
        enqueue(path, path.dir-90, map, state);
        enqueue(path, path.dir+90, map, state);
      }
    }
    state.loss++;
  }

  return state.loss;
}

const answer = await day17b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
