import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);

  const d= parseInt(data[0].match(/\d+/g).join(""));
  const t= parseInt(data[1].match(/\d+/g).join(""));

  const Δ = Math.sqrt((d*d)-(4*t))
  return Math.floor((d+Δ)/2)-Math.ceil((d-Δ)/2)+1;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
