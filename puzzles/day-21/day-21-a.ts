import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { cts, stc, getStart, MOVES, type Map, type Q } from "./steps.ts";



enum T {
  Empty, Even, Odd
};

type I = {
  pos: string;
  type: T;
};

const validEdge = (map: Map, x: number, y: number) =>
  x > -1 && y > -1 && x < map.length && y < map[x].length && "S.".indexOf(map[x][y]) !== -1;

export async function day21a(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));

  const start = getStart(map);
  const h = map.length, w = map[0].length;
  const maxStep = w === 11 ? 6 : 64;

  const space = new Array(w).fill(T.Empty).map(()=>new Array(h).fill(T.Empty));

  const queue: Array<Q> = [{ pos: cts(start[0], start[1]), step: 0}];
  const found = new Set();

  while (queue.length > 0) {
    const { pos, step } = queue.shift();
    const type = (step & 1) ? T.Odd : T.Even;

    const f: I = { pos, type };
    const itemExists = [...found].some((item: I) => item.pos === f.pos && item.type === f.type);

    if (itemExists) continue;
    found.add(f)

    if (space[pos] !== T.Even) space[pos] = type;
    if (step >= maxStep) continue;

    for (const move of MOVES) {
      const next = stc(pos).map((p, i) => p+move[i]);
      if (validEdge(map, next[0], next[1]))
        queue.push({ pos: cts(next[0], next[1]), step: step + 1});
    }
  }
  return [...found].filter((i: I) => i.type === T.Even).length;
}

const answer = await day21a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
