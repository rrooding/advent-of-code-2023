import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseSchema, sendPulse, type PulseQueue } from "./pulse.ts";

export async function day20a(dataPath?: string) {
  const data = await readData(dataPath);

  const schema = parseSchema(data);

  let low = 0, high = 0;
  const pulseQueue: PulseQueue = [];

  for (let i = 0; i < 1000; i++) {
    pulseQueue.push({ from: "button", to: "broadcaster", val: false });

    while (pulseQueue.length > 0) {
      const pulse = pulseQueue.shift();
      pulse.val ? high++ : low++;

      sendPulse(schema, pulseQueue, pulse);
    }
  }

  return low*high;
}

const answer = await day20a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
