import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { init as initZ3 } from "z3-solver";

export async function day24b(dataPath?: string) {
  const data = await readData(dataPath);

  const stones = data.filter(Boolean).map((l) => {
    const { groups: { x, y, z, vx, vy, vz } } = l.match(/(?<x>\d+), (?<y>\d+), (?<z>\d+) @ (?<vx>-?\d+), (?<vy>-?\d+), (?<vz>-?\d+)/);
    return { x:+x, y:+y, z:+z, vx:+vx, vy:+vy, vz:+vz };
  });

  const { Context, em: { PThread } } = await initZ3();
  const z3 = Context('main');
  const solver = new z3.Solver();

  const x = z3.Real.const('x'),
        y = z3.Real.const('y'),
        z = z3.Real.const('z'),
        vx = z3.Real.const('vx'),
        vy = z3.Real.const('vy'),
        vz = z3.Real.const('vz');

  let step = 0;
  for (const stone of stones.slice(0,4)) {
    const ns = z3.Real.const(`t${step}`);
    solver.add(ns.gt(z3.Real.val(0)));
    solver.add(x.add(ns.mul(vx)).eq(z3.Real.val(stone.x).add(ns.mul(z3.Real.val(stone.vx)))));
    solver.add(y.add(ns.mul(vy)).eq(z3.Real.val(stone.y).add(ns.mul(z3.Real.val(stone.vy)))));
    solver.add(z.add(ns.mul(vz)).eq(z3.Real.val(stone.z).add(ns.mul(z3.Real.val(stone.vz)))));
    step++;
  }

  await solver.check();
  const model = solver.model();

  const total = [x, y, z].reduce((s, ex) => s+(+model.eval(ex).toString()), 0);

  PThread.terminateAllThreads();

  return total;
}

const answer = await day24b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
