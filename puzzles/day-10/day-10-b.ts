import { readData } from '../../shared.ts';
import chalk from 'chalk';
import pointInPolygon from "point-in-polygon";

import { mapToGraph } from "./graph.ts";
import { getStart, cts, stc } from "./coords.ts";
import { longestPath } from './longestPath.ts';

export async function day10b(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean).map((l) => l.split(""));

  const graph = mapToGraph(map);
  const start = getStart(map);

  const path = longestPath(graph, start);
  const polygon = path.map(stc);

  let points = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (path.indexOf(cts(x, y)) === -1 && pointInPolygon([x, y], polygon)) {
        points++;
      }
    }
  }

  return points;
}

const answer = await day10b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
