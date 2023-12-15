import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Lens = {
  label: string;
  f: number;
}

type Step = {
  op: string;
} & Lens;

import { hash } from "./hash.ts";

const parseStep = (step: string): Step => {
  const [,label,op,f] = step.match(/(\w+)([=-])(\d)?/);
  return { label, op, f: parseInt(f) };
}

export async function day15b(dataPath?: string) {
  const data = await readData(dataPath);

  const boxes = Array<Lens[]>(256);
  const steps = data.filter(Boolean).join("").split(",").map(parseStep);

  for (let step of steps) {
    const box = hash(step.label);
    boxes[box] ??= [];
    const lens = { label: step.label, f: step.f };
    const existing = boxes[box].findIndex((l) => l.label === step.label);
    if (step.op === "=") {
      (existing === -1) ? boxes[box].push(lens) : boxes[box][existing].f = lens.f;
    } else if (existing !== -1) {
      boxes[box].splice(existing, 1)
    }
  }

  return boxes.reduce((p, b, bi) => p+b.reduce((bp, l, li) => bp+((bi+1)*(li+1)*l.f), 0), 0)
}

const answer = await day15b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
