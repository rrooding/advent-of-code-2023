import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { mapToGraph } from "./graph.ts";
import { getStart } from "./coords.ts";
import { longestPath } from './longestPath.ts';


export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));

  const graph = mapToGraph(map);
  const start = getStart(map);

  const path = longestPath(graph, start);

  return path.length/2;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
