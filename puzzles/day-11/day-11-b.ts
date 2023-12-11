import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { findGalaxies, findPairs, findSpace, distance, expander  } from "./space.ts";

export async function day11b(dataPath?: string) {
  const data = await readData(dataPath);

  const universe = data.filter(Boolean).map((r) => r.split(""));
  const galaxies = findGalaxies(universe);

  const space = findSpace(universe);
  const expandPair = expander(space);

  return findPairs(galaxies).reduce((sum, pair) =>
    sum + expandPair(pair, distance(pair[0], pair[1]), 1_000_000 - 1),
    0
  );
}

const answer = await day11b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
