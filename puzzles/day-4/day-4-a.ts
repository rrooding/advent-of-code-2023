import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Card = {
  id: number;
  winners: number[];
  numbers: number[];
};

const parseCard = (line: string): Card => {
  const [, id, winners, numbers] = line.match(/Card\s+(?<id>\d+):\s+(?<winners>(?:\d+\s*)+) \|\s+(?<numbers>(?:\d+\s+)+\d+)$/m)
  return { id: parseInt(id), winners: winners.split(/\s+/).map((n) => parseInt(n)), numbers: numbers.split(/\s+/).map((n) => parseInt(n)) };
};

const pointsForCard = ({ winners, numbers }): number =>
  numbers.reduce((score: number, number: number) =>
    winners.includes(number) ? score ? score *= 2 : score = 1 : score
  , 0);

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);

  return data
    .filter(Boolean)
    .map(parseCard)
    .map(pointsForCard)
    .reduce((a, b) => a + b)

  // const points = pointsForCard(parsed[0]);
  // console.log("points", points)


  return 0;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
