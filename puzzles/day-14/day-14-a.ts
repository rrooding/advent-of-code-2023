import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { tiltNorth, weight } from "./platform.ts";

export async function day14a(dataPath?: string) {
  const data = await readData(dataPath);

  const platform = tiltNorth(data)
  return weight(platform)
}

const answer = await day14a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
