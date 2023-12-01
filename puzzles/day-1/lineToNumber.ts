const FIRST_AND_LAST = /^\D*(?<first>\d).*?(?<second>\d)?\D*$/;

export const lineToNumber = (line: string): number => {
  const match = line.match(FIRST_AND_LAST)
  if (match) {
    const [, first, second] = match;
    return parseInt(first + (second ? second : first))
  }
};
