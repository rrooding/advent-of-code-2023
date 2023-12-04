import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Card = {
  id: number;
  winners: number[];
  numbers: number[];
  extraCards?: number[];
};

const parseCard = (line: string): Card => {
  const [, id, winners, numbers] = line.match(/Card\s+(?<id>\d+):\s+(?<winners>(?:\d+\s*)+) \|\s+(?<numbers>(?:\d+\s+)+\d+)$/m)
  return { id: parseInt(id), winners: winners.split(/\s+/).map((n) => parseInt(n)), numbers: numbers.split(/\s+/).map((n) => parseInt(n)) };
};

const pointsForCard = ({ winners, numbers }): number =>
  numbers.reduce((score: number, number: number) =>
    winners.includes(number) ? score += 1 : score
  , 0);

const findWinners = (card: Card): Card => ({
  ...card,
  extraCards: Array.from({length: pointsForCard(card)}, (_, k) => k + card.id + 1),
});

const scoreForCardFactory = (cards: Card[]) => (card: Card): number => {
  if(card.extraCards?.length) {
    const extraCards = card.extraCards.map((eid) => cards.find(({ id }) => id === eid));
    const nestedScore = extraCards.map(scoreForCardFactory(cards)).reduce((a, b) => a + b);
    return card.extraCards.length +  nestedScore;
  }
  return 0;
}

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);

  const cards = data
    .filter(Boolean)
    .map(parseCard)
    .map(findWinners)

  const scoreForCard = scoreForCardFactory(cards);

  return cards.reduce((score, card) => {
    return score + 1 + scoreForCard(card);
  }, 0)
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
