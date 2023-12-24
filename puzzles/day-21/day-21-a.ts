import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { getStart, walk } from "./steps.ts";

export async function day21a(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));
  const start = getStart(map);

  let steps = 0;
  const stepCounter = (step: number) => {
    if (step <= 64 && (step & 1) === 0)
      steps++;
  }

  walk(map, start, stepCounter);

  return steps;
}

const answer = await day21a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
