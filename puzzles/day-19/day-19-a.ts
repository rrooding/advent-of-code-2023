import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { type Part, parseData } from "./parts.ts";

const ruleParser = (ins: string) =>
  ({ rules: ins.split(",").map((next) => next.indexOf(":")===-1 ? { rule: () => true, next } : { rule: ({x,m,a,s}) => eval(next.split(":")[0]), next: next.split(":")[1] }) });

const nextInstruction = (part: Part, { rules }) => {
  for (let { rule, next } of rules) {
    if (rule(part)) return next;
  }
}

export async function day19a(dataPath?: string) {
  const data = await readData(dataPath);

  const { instructions, parts } = parseData(data, ruleParser);

  const accepted = [];
  for (let part of parts) {
    let next = "in";
    while (true) {
      next = nextInstruction(part, instructions.find(({name})=> name === next));
      if (next === "A") {
        accepted.push(part);
        break;
      }
      if (next === "R") {
        break;
      }
    }
  }

  return accepted.reduce((s,{t})=>s+t, 0);
}

const answer = await day19a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
