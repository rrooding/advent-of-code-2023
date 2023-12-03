import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { numberWithBoundingBox } from "./numberWithBoundingBox.ts";
import { hasSymbolInBox } from './hasSymbolInBox.ts';

const SYMBOLS = ["*", "#", "$", "+", "%", "/", "=", "@", "&", "-"];

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const lineLength = data[0].length;
  const flattened = data.join("");

  const boxNumber = numberWithBoundingBox(lineLength);
  const boxedNumbers = Array.from(
    flattened.matchAll(/\d+/g), ({ "0": number, index }) => boxNumber(parseInt(number), index)
  );
  const filterNumber = hasSymbolInBox(SYMBOLS, flattened);
  return boxedNumbers
    .filter(filterNumber)
    .reduce((a, { number }) => a + number, 0);
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
