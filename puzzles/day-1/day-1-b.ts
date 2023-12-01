import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { lineToNumber } from './lineToNumber.ts';

const WORDS: Record<string, string> = {
  twone: "21",
  oneight: "18",
  eightwo: "82",
  eightree: "83",
  sevenine: "79",
  threeight: "38",
  fiveight: "58",
  nineight: "98",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};

const wordsToNumbers = (line: string): string => {
  const regex = new RegExp(`(${Object.keys(WORDS).join("|")})`, "gi");
  return line.replace(regex, (match: string) => WORDS[match.toLowerCase()]);
};

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  return data
    .map((line) => wordsToNumbers(line))
    .map((line) => lineToNumber(line))
    .filter(Boolean)
    .reduce((a, b) => a+b);
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
