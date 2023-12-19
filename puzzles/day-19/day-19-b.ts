import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseData } from "./parts.ts";

type Range = [number, number];
type Parts = { x: Range; m: Range; a: Range; s: Range; };

const ruleParser = (ins: string) =>
  ({ rules: ins.split(",").map((next) => next.indexOf(":")===-1 ? { rule: true, next } : { rule: next.split(":")[0], next: next.split(":")[1] }) });

const accepted = (batch: Parts, instructions: Record<string, any>, w: string): number => {
  if (w === "R") return 0;
  if (w === "A") return Object.values(batch).map(([a,b])=>b-a).reduce((a,b)=>a*b,1)

  let result = 0;
  const workflow = instructions.find(({name})=>name===w);

  for(let { rule, next } of workflow.rules) {
    if (`${rule}` === "true") {
      result+=accepted(batch, instructions, next);
      continue;
    }

    let [,t,op,val] = rule.match(/([xmas])([<>])(\d+)/);
    val = parseInt(val);
    const range = batch[t];

    if (op === "<") {
      if (range[1] <= val) {
        return result+accepted(batch, instructions, next);
      } else if (range[0] < val) {
        result += accepted({...batch, [t]: [range[0], val]}, instructions, next);
        batch = {...batch, [t]: [val, range[1]]};
        continue;
      }
    } else if (op === ">") {
      if (range[0] > val) {
        return result+accepted(batch, instructions, next);
      } else if (range[1] > val+1) {
        result += accepted({...batch, [t]: [val+1, range[1]]}, instructions, next);
        batch = {...batch, [t]: [range[0], val+1]};
        continue;
      }
    }
  }

  return result;
}

export async function day19b(dataPath?: string) {
  const data = await readData(dataPath);

  const { instructions } = parseData(data, ruleParser);

  const parts: Parts = { x: [1,4001], m: [1,4001], a: [1,4001], s: [1,4001] };
  return accepted(parts, instructions, "in");
}

const answer = await day19b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
