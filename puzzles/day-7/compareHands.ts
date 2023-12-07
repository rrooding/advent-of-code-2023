const compareCards = (order: string[], card1: string, card2: string): number => {
  const card1Value = order.indexOf(card1);
  const card2Value = order.indexOf(card2);

  if (card1Value > card2Value) {
    return -1;
  } else if (card1Value < card2Value) {
    return 1;
  } else {
    return 0;
  }
};

export const compareHands = (order: string[], hand1: string, hand2: string): number => {
  for (let i = 0; i < hand1.length; i++) {
    const comparison = compareCards(order, hand1[i], hand2[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  return 0;
};
