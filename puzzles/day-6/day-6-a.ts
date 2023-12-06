import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

  const durations = data[0].match(/\d+/g).map(Number);
  const times = data[1].match(/\d+/g).map(Number);

  return durations.map((d, i) => {
    const Δ = Math.sqrt((d*d)-(4*times[i]))
    return Math.floor((d+Δ)/2)-Math.ceil((d-Δ)/2)+1;
  }).reduce((a,b)=>a*b);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

  // races.push({ d: parseInt(durations.map((n) => n.toString()).join("")), r: parseInt(records.map((n) => n.toString()).join("")) });
