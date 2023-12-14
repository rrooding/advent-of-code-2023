import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { cycle, weight } from "./platform.ts"

export async function day14b(dataPath?: string) {
  const data = await readData(dataPath);

  let platform = data;
  let cache = {};
  const cycles = 1000000000;
  let firstHit: string, firstHitIndex: number;

  for (let i = 0; i < cycles; i++) {
    const input = platform.join("");
    if (cache[input]) {
      if (!firstHit) {
        firstHit = input;
        firstHitIndex = i;
      } else if (input === firstHit) {
        const cycleLength = i - firstHitIndex;
        const remaining = cycles - i;
        i += Math.floor(remaining / cycleLength) * cycleLength;
      }

      platform = cache[input];
    } else {
      platform = cycle(platform);
      cache[input] = platform;
    }
  }

  return weight(platform);
}

const answer = await day14b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
