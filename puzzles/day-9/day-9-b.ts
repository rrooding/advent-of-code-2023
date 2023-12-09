import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { combinations } from "mathjs";

const l = (numbers: number[]) =>
  numbers.reduce((sum, num, i) => sum+(num*combinations(numbers.length, i + 1)*(-1)**i), 0);

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath)
  return data
    .filter(Boolean)
    .map((l) => l.split(" ").map(Number))
    .map(l)
    .reduce((a,b) => a+b);
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
