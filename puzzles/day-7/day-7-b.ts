import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { HandType } from "./types.ts";
import { compareHands } from "./compareHands.ts";
import { handType as handTypeWithoutJokers } from "./handType.ts";

const CARDS = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const allPossibleHands = (cards: string) => {
  return cards.split("").map((card, i, hand) => {
    if (card === "J") {
      return CARDS
        .slice(0, -1)
        .map((tryCard) => allPossibleHands([...hand.slice(0, i), tryCard, ...hand.slice(i+1)].join("")));
    } else {
      return [hand.join("")];
    }
  }).flat(Infinity)
}

const handType = (cards: string): HandType => {
  const hasJoker = cards.indexOf("J") !== -1;

  if (!hasJoker) return handTypeWithoutJokers(cards);
  if (cards === "JJJJJ") return HandType.FiveKind;

  let highestHandType = HandType.HighCard;
  for (let hand of allPossibleHands(cards)) {
    const t = handTypeWithoutJokers(hand);
    if (t > highestHandType) {
      highestHandType = t;
    }
    if (highestHandType === HandType.FiveKind) break;
  }

  return highestHandType;
}

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  return data.filter(Boolean).map((l) => {
    const [cards, bid] = l.split(/\s+/);
    return {cards, bid: parseInt(bid), type: handType(cards)};
  })
    .sort((a, b): number => (a.type === b.type) ? compareHands(CARDS, a.cards, b.cards) : (a.type > b.type ? 1 : -1))
    .reduce((score, hand, multiplier) => score + (hand.bid*(multiplier+1)), 0);
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
