import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { type Instruction, getPolygon, polygonCircumference, polygonArea } from './poly.ts';

const DIRS = [ 90, 180, 270, 0 ];

export const parseInstructions = (data: string): Instruction => {
  const [,count,dirc] = data.match(/\w \d+ \(#(.{5})(\d)\)/);
  return { dir: DIRS[parseInt(dirc)], count: parseInt(count, 16) };
}

export async function day18b(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data.filter(Boolean).map(parseInstructions);

  const poly = getPolygon(instructions);
  const circ = polygonCircumference(instructions);
  const area = polygonArea(poly)

  return area+circ;
}

const answer = await day18b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
