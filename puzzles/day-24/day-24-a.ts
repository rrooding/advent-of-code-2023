import { readData } from '../../shared.ts';
import chalk from 'chalk';

const intersect = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) => {
  const denom = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
  if (denom == 0) return null;
  const ua = ((x4-x3) * (y1-y3) - (y4-y3) * (x1-x3)) / denom;
  return [x1+ua*(x2-x1), y1+ua*(y2-y1)];
}

export async function day24a(dataPath?: string) {
  const data = await readData(dataPath);

  const stones = data.filter(Boolean).map((l) => {
    const { groups: { x, y, z, vx, vy, vz } } = l.match(/(?<x>\d+), (?<y>\d+), (?<z>\d+) @ (?<vx>-?\d+), (?<vy>-?\d+), (?<vz>-?\d+)/);
    return { x:+x, y:+y, z:+z, vx:+vx, vy:+vy, vz:+vz };
  });

  const cmin = 200000000000000, cmax = 400000000000000;

  let intersecting = 0;
  for (let s1 = 0; s1 < stones.length; s1++) {
    for (let s2 = s1 + 1; s2 < stones.length; s2++) {
      const stone1 = stones[s1], stone2 = stones[s2];

      const intersection = intersect(
        stone1.x,
        stone1.y,
        stone1.x+stone1.vx,
        stone1.y+stone1.vy,
        stone2.x,
        stone2.y,
        stone2.x+stone2.vx,
        stone2.y+stone2.vy,
      );

      if(intersection) {
        const [x,y] = intersection;
        if (x > stone1.x === stone1.vx > 0 &&
            y > stone1.y === stone1.vy > 0 &&
            x > stone2.x == stone2.vx > 0 &&
            y > stone2.y === stone2.vy > 0 &&
            x >= cmin && x <= cmax &&
            y >= cmin && y <= cmax)
          intersecting++;
      }
    }
  }

  return intersecting;
}

const answer = await day24a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
