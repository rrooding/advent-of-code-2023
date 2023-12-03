import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { numberWithBoundingBox } from "./numberWithBoundingBox.ts";
import { hasSymbolInBox } from './hasSymbolInBox.ts';

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);

  const lineLength = data[0].length;
  const flattened = data.join("");

  const boxNumber = numberWithBoundingBox(lineLength);
  const boxedNumbers = Array.from(
    flattened.matchAll(/\d+/g), ({ "0": number, index }) => boxNumber(parseInt(number), index)
  );
  const gearPos = hasSymbolInBox(["*"], flattened);

  return Object.values(boxedNumbers.reduce((gears, number) => {
    const pos = gearPos(number);
    if (pos) {
      gears[pos] ||= [];
      gears[pos].push(number.number)
    }
    return gears;
  }, {}))
    .filter((arr: number[]) => arr.length === 2)
    .reduce((count: number, [a, b]) => count += a*b, 0);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
