import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { cts, stc, getStart, MOVES, type Q } from "./steps.ts";

const inRange = (map: number[][], x: number, y: number) =>
  x > -1 && y > -1 && x < map.length && y < map[x].length;

export async function day21b(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));
  const start = getStart(map);

  const targetSteps = 26501365;
  let gridSizeMultiplier = 3;

  while (gridSizeMultiplier * map[0].length < 77) { gridSizeMultiplier += 2; }
  const halfGridSizeMultiplier = gridSizeMultiplier / 2;
  // const halfGridSizeMultiplier = Math.ceil(gridSizeMultiplier / 2);
  const gridCenterOffset = [map[0].length * halfGridSizeMultiplier, map.length * halfGridSizeMultiplier];

  const distances = new Array(map[0].length * gridSizeMultiplier).fill(Infinity).map(()=>new Array(map.length * gridSizeMultiplier).fill(Infinity));

  const startWithOffset = [start[0]+gridCenterOffset[0], start[1]+gridCenterOffset[1]];

  const queue: Array<Q> = [{ pos: cts(start[0], start[1]), step: 0}];


  while (queue.length > 0) {
    const step = queue.shift();

    if (distances[step.pos] !== Infinity)
      continue;

    distances[step.pos] = step.step;

    for (const move of MOVES) {
      const next = stc(step.pos).map((p, i) => p+move[i]);
      if (inRange(distances, next[0], next[1]))
      if (distances.PositionInRange(step.pos + dir) &&  grid[grid.Wrap(step.pos + dir)] != '#')
            { stepQueue.push({ step.pos + dir, step.step + 1 }); }
    }
  }

  return 0;
}

const answer = await day21b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
