import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseFile } from "./parsing.ts";

const gcd = (a: number, b: number) => !b ? a : gcd(b, a%b);
const lcm = (a: number, b: number) => (a*b)/gcd(a, b);

export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);
  const [instructions, map] = parseFile(data);

  const startNodes = Object.keys(map).filter((k) => k.endsWith("A"));
  let steps = 0;

  return startNodes.map((node) => {
    steps = 0;
    while (!node.endsWith("Z")) {
      const index = steps % instructions.length;
      node = map[node][instructions[index]];
      steps++;
    }
    return steps;
  }).reduce((totalSteps, nodeSteps) => lcm(totalSteps, nodeSteps), 1)
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
