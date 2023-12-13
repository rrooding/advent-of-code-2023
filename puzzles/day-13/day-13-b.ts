import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseSchemas, reflectionIndex } from "./mirror.ts";

export async function day13b(dataPath?: string) {
  const data = await readData(dataPath);
  const patterns = parseSchemas(data);
  return patterns.map((p) => reflectionIndex(p, 1)).reduce((a,b) => a+b)
}

const answer = await day13b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
