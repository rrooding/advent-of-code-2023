import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { getStart, walk } from "./steps.ts";

export async function day21b(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));
  const start = getStart(map);

  const targetStepCount = 26501365;

  let onParity = 0;
  let offParity = 0;
  let bothParityCount = 0;

  const calc = (step: number) => {
    if (step <= map[0].length / 2) {
      if ((step & 1) == (targetStepCount & 1))
        { onParity++; }
      else
        { offParity++; }
    } else {
      bothParityCount++;
    }
  }

  walk(map, start, calc)

  const stepExtent = Math.floor(targetStepCount / map[0].length);

  const ECount = Math.pow(2*(Math.floor(stepExtent / 2)) + 1, 2);
  const eCount = Math.pow(2*Math.floor((stepExtent + 1) / 2), 2);
  const aAbBcCdDCount = Math.floor((ECount + eCount) / 2);
  return ECount * onParity + eCount * offParity + aAbBcCdDCount * bothParityCount;
}

const answer = await day21b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
