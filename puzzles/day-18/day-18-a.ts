import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { type Instruction, getPolygon, polygonCircumference, polygonArea } from './poly.ts';

const DIRS = { "U": 0, "R": 90, "D": 180, "L": 270 };

const parseInstructions = (data: string): Instruction => {
  const [,dirc,count] = data.match(/(\w) (\d+)/);
  return { dir: DIRS[dirc], count: parseInt(count) };
}

export async function day18a(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data.filter(Boolean).map(parseInstructions);

  const poly = getPolygon(instructions);
  const circ = polygonCircumference(instructions);
  const area = polygonArea(poly)

  return area+circ;
}

const answer = await day18a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
