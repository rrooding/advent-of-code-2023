import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { lineToNumber } from './lineToNumber.ts';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  return data
    .map((line) => lineToNumber(line))
    .filter(Boolean)
    .reduce((a, b) => a+b);
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
