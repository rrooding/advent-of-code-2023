import { type CubeSet, type Game } from "./types.ts";

const parseSet = (setStr: string): CubeSet => {
  return setStr.split(",").reduce((set, draw) => {
    const [, amount, color] = draw.match(/(?<amount>\d+) (?<color>red|green|blue)/);
    return { ...set, [color]: parseInt(amount) }
  }, {})
};

export const parseGame = (line: string): Game => {
  const [, id, setsStr] = line.match(/Game (?<id>\d+): (?<sets>(?:[^;]+;?)+)/);
  const sets = setsStr.split(";").map(parseSet)
  return { id: parseInt(id), sets };
};
