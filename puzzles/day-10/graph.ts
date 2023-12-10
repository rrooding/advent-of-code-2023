import { cts, type Map } from "./coords.ts";

export type Edges = Record<string, number>
export type Graph = Record<string, Edges>

const PIPES = "|-LJ7F";

const validEdge = (map: string[][], x: number, y: number) => {
  return x > -1 && y > -1 && x < map.length && y < map[x].length && PIPES.indexOf(map[x][y]) !== -1;
}

const getEdges = (map: string[][], x: number, y: number): Edges => {
  const node = map[x][y]
  return {
    ...("S|LJ".indexOf(node) !== -1 && validEdge(map, x-1 ,y) && { [cts(x-1, y)]: 1 }),
    ...("S-7J".indexOf(node) !== -1 && validEdge(map, x, y-1) && { [cts(x, y-1)]: 1 }),
    ...("S|F7".indexOf(node) !== -1 && validEdge(map, x+1, y) && { [cts(x+1, y)]: 1 }),
    ...("S-FL".indexOf(node) !== -1 && validEdge(map, x, y+1) && { [cts(x, y+1)]: 1 }),
  };
}

export const mapToGraph = (map: Map): Graph =>
  map.reduce((graph, row, x) => {
    graph = { ...graph, ...row.reduce((subgraph, _point, y) => {
      subgraph[cts(x,y)] = getEdges(map, x, y);
      return subgraph;
    }, {}) };
    return graph;
  }, {});
