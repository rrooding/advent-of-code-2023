import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseLine, countConfigurations } from "./countConfigurations.ts";

export async function day12a(dataPath?: string) {
  const data = await readData(dataPath);
  const lines = data.filter(Boolean);

  return lines
    .map(parseLine)
    .reduce((s, [schema, positions]) =>
      s + countConfigurations(schema, positions),
      0
    );
}

const answer = await day12a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
