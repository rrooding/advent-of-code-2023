import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { combinations } from "../../utils/combinations.ts";
import { parseBricks, dropIt, type Brick } from './bricks.ts';

const countDestroyable = (bricks: Brick[]): number => {
  let destroyable = 0;
  for (const combination of combinations(bricks.slice(), bricks.length - 1)) {
    const settledBricks = dropIt(combination);
    destroyable += Object.values(settledBricks).filter((tp) => tp.minZ !== bricks.find((b) => b.id === tp.id)?.minZ).length;
  }
  return destroyable;
}

export async function day22b(dataPath?: string) {
  const data = await readData(dataPath);

  const bricks = parseBricks(data);
  const settledBricks = dropIt(bricks);
  return countDestroyable(settledBricks);
}

const answer = await day22b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
