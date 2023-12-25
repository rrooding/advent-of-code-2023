import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { mincut } from "@graph-algorithm/minimum-cut"

var bfs = (next: string, edges: string[][], visited: Set<string>): string[] => {
  const queue = [next];

  var group = [];

  while (queue.length > 0) {
    next = queue.shift();

    if (!visited.has(next)) {
      visited.add(next);
      group.push(next);

      for (const edge of edges) {
        if (edge[0] === next && !visited.has(edge[1])) {
          queue.push(edge[1]);
        } else if (edge[1] === next && !visited.has(edge[0])) {
          queue.push(edge[0]);
        }
      }
    }
  }

  return group;
};

const graphGroups = (edges: string[][]): string[][] => {
  const visited = new Set<string>();
  return edges.reduce((groups, [a, b]) => {
    const src = !visited.has(a) ? a : !visited.has(b) ? b : null;
    if (src) groups.push(bfs(src, edges, visited));
    return groups;
  }, new Array<string[]>());
}

export async function day25a(dataPath?: string) {
  const data = await readData(dataPath);

  const edges = [];
  for (const line of data.filter(Boolean)) {
    const [node, ...cons] = line.split(/[: ]+/);
    edges.push(...cons.map((con)=>[node,con]));
  }

  const cuts = []
  for (const cut of mincut(edges)) {
    cuts.push(cut.join("-"));
  }

  const edgesWithoutCuts = edges.reduce((n, edge) => cuts.includes(edge.join("-")) || cuts.includes(edge.reverse().join("-")) ? n : [...n, edge], [])

  const groups = graphGroups(edgesWithoutCuts)

  return groups.reduce((s, g) => s*g.length, 1)
}

const answer = await day25a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
