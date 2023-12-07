import { HandType } from "./types.ts";

const countOccurrences = (cards: string): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const card of cards) {
    counts[card] = (counts[card] || 0) + 1;
  }
  return counts;
};

export const handType = (cards: string): HandType => {
  const occurrences = countOccurrences(cards);
  const values = Object.values(occurrences);

  if (values.includes(5)) {
    return HandType.FiveKind;
  } else if (values.includes(4)) {
    return HandType.FourKind;
  } else if (values.includes(3) && values.includes(2)) {
    return HandType.FullHouse;
  } else if (values.includes(3)) {
    return HandType.ThreeKind;
  } else if (values.filter((value) => value === 2).length === 2) {
    return HandType.TwoPair;
  } else if (values.filter((value) => value === 2).length === 1) {
    return HandType.OnePair;
  } else {
    return HandType.HighCard;
  }
};
