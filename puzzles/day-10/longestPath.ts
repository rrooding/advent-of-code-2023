import dijkstra from "dijkstrajs";

import { cts, type Point } from "./coords.ts";
import { type Graph } from "./graph.ts";
import { combinations } from "mathjs";

export const longestPath = (graph: Graph, [x, y]: Point) => {
  const ends = Object.keys(graph[cts(x, y)]);
  const c = combinations(ends.length, 2)

  let path = [];
  for (let i = 0; i < c; i++) {
    const nextPath = dijkstra.find_path(graph, ends[i], ends[i+1]);
    if (nextPath.length > path.length) path = nextPath;
  }
  return [cts(x, y), ...path];
}
