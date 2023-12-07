import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { handType } from "./handType.ts";
import { compareHands } from "./compareHands.ts";

const CARDS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);

  return data.filter(Boolean).map((l) => {
    const [cards, bid] = l.split(/\s+/);
    return {cards, bid: parseInt(bid), type: handType(cards)};
  })
    .sort((a, b): number => (a.type === b.type) ? compareHands(CARDS, a.cards, b.cards) : (a.type > b.type ? 1 : -1))
    .reduce((score, hand, multiplier) => score + (hand.bid*(multiplier+1)), 0);
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
