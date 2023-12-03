import { type BoxedNumber } from "./types.ts";

export const hasSymbolInBox = (symbols: string[], data: string) => (number: BoxedNumber): number => {
  for (var pos of number.box)
    if (symbols.includes(data.charAt(pos)))
      return pos;
  return 0;
}
