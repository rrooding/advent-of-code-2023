import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { hash } from "./hash.ts";

export async function day15a(dataPath?: string) {
  const data = await readData(dataPath);

  return data.filter(Boolean).join("").split(",").map(hash).reduce((a,b) => a+b);
}

const answer = await day15a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
