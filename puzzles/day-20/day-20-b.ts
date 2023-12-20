import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseSchema, sendPulse, type PulseQueue } from "./pulse.ts";
import { lcm } from 'mathjs';

export async function day20b(dataPath?: string) {
  const data = await readData(dataPath);

  const schema = parseSchema(data);

  const pulseQueue: PulseQueue = [];

  const { name, inputs } = schema[schema["rx"].inputs[0]];
  const prevCycleLength: Record<string, number> = {};
  const cycleLength: Record<string, number> = {};
  const cycles: number[] = [];

  f: for (let cycle = 0;; cycle++) {
    pulseQueue.push({ from: "button", to: "broadcaster", val: false });

    while (pulseQueue.length > 0) {
      const pulse = pulseQueue.shift();
      sendPulse(schema, pulseQueue, pulse);

      if (pulse.val && pulse.to === name) {
        if (!cycleLength[pulse.from]) {
          if (!prevCycleLength[pulse.from]) {
            prevCycleLength[pulse.from] = cycle;
          } else {
            cycleLength[pulse.from] = cycle-prevCycleLength[pulse.from];
            cycles.push(cycleLength[pulse.from]);
            if (cycles.length === inputs.length)
              break f;
          }
        }
      }
    }
  }

  return cycles.reduce((a,b) => lcm(a,b), 1);
}

const answer = await day20b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
