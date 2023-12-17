import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseGrid, energiseGrid, countEnergised, type Beam } from "./lasers.ts";


export async function day16a(dataPath?: string) {
  const data = await readData(dataPath);

  const grid = parseGrid(data);
  const beam: Beam = { x: 0, y: 0, dir: 90 };

  const energisedGrid = energiseGrid(beam, grid);

  return countEnergised(energisedGrid);
}

const answer = await day16a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
