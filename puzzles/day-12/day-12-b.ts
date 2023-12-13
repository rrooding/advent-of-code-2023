import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseLine, countConfigurations } from "./countConfigurations.ts";

const unfold = ([schema, positions]): [string, number[]] =>
  [`?${schema}`.repeat(5).slice(1), Array(5).fill(positions).flat()];

export async function day12b(dataPath?: string) {
  const data = await readData(dataPath);

  return data
    .filter(Boolean)
    .map(parseLine)
    .map(unfold)
    .reduce((s, [schema, positions], index) => {
        const sc = countConfigurations(schema, positions);
        console.log(index, schema, sc)
        return s + sc
      },
      0
    );
}

const answer = await day12b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
