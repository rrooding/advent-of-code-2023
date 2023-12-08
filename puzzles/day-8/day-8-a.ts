import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseFile } from "./parsing.ts";

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const [instructions, map] = parseFile(data)

  let currentNode = "AAA";
  let steps = 0;
  while (currentNode !== "ZZZ") {
    const index = steps % instructions.length;
    currentNode = map[currentNode][instructions[index]];
    steps++;
  }

  return steps;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
