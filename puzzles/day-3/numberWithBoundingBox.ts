import { type BoxedNumber } from "./types.ts";

export const numberWithBoundingBox = (lineLength: number) => (number: number, index: number): BoxedNumber => {
  const length = number.toString().length;

  const atStart = !(index % lineLength)
  const atEnd = !((index + length) % lineLength)

  const step = atStart ? 1 : 2;
  const backStep = atEnd ? -1 : 0;

  const box = [
    ...Array.from({length: length+step+backStep}, (_, k) => k + index-(step-1)-lineLength),
    ...(atStart ? [] : [index-1]), /* number, */ ...(atEnd ? [] : [index+length]),
    ...Array.from({length: length+step+backStep}, (_, k) => k + index-(step-1)+lineLength),
  ].filter((i) => i >= 0);

  return { number, index, box };
}
