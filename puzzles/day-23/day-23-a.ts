import { readData } from "../../shared.ts";
import chalk from "chalk";

import { step, type Edge, type Point, type Map } from "./steps.ts";

const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];

const getEdges = (map: Map) => ([x, y]) =>
  MOVES.reduce((edges: Edge[], [x2, y2]) => {
    const next = map[y+y2]?.[x+x2];
    if (next && (x2 === -1 && next === "<") || (x2 === 1 && next === ">") || (y2 === -1 && next === "^") || (y2 === 1 && next === "v") || next === ".") {
      edges.push([x+x2, y+y2, 1]);
    }
    return edges;
  }, []);

export async function day23a(dataPath?: string) {
  const data = await readData(dataPath);

  const map = data.filter(Boolean);
  const start: Point = [1, 0], end: Point = [map[0].length-2, map.length-1];

  let distance = 0
  step(start, end, getEdges(map), (newDistance) => distance = newDistance > distance ? newDistance : distance);

  return distance;
}

const answer = await day23a();
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer));
