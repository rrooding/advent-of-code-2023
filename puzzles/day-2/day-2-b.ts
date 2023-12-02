import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseGame } from "./parseGame.ts";
import { type CubeSet } from "./types.ts";

const powerOfSet = (set: CubeSet): number => Object.values(set).filter(Boolean).reduce((a, b) => a * b);

const minimalSet = (sets: CubeSet[]): CubeSet => {
  return sets.reduce((min, set) => {
    return {
      ...min,
      ...(set.red && { red: Math.max(min.red, set.red) }),
      ...(set.green &&  { green: Math.max(min.green, set.green) }),
      ...(set.blue && { blue: Math.max(min.blue, set.blue) }),
    }
  }, { red: 0, green: 0, blue: 0 });
}

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  return data
    .filter(Boolean)
    .map(parseGame)
    .map(({ sets }) => minimalSet(sets))
    .map(powerOfSet)
    .reduce((a, b) => a + b);
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
