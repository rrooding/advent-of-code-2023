export type Map = string[][];
export type Point = [number, number];

export type Q = {
  pos: string;
  step: number;
};

export const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];

export const cts = (x: number, y: number) => `${x},${y}`;
export const stc = (s: string) => s.split(",").map(Number)

export const getStart = (map: Map): Point => {
  for(let y = 0; y < map.length; y++) {
    if (map[y].indexOf("S") !== -1) return [map[y].indexOf("S"), y];
  }
}

const validEdge = (map: Map, x: number, y: number) =>
  x > -1 && y > -1 && x < map.length && y < map[x].length && "S.".indexOf(map[x][y]) !== -1;

export const walk = (map: Map, start: Point, callback: (step: number) => void) => {
  const h = map.length, w = map[0].length;
  const distances = new Array(w).fill(Infinity).map(()=>new Array(h).fill(Infinity));
  const queue: Array<Q> = [{ pos: cts(start[0], start[1]), step: 0}];

  while (queue.length > 0) {
    const { pos, step } = queue.shift();
    const coords = stc(pos);

    if (distances[coords[1]][coords[0]] !== Infinity)
      continue;

    distances[coords[1]][coords[0]] = step;

    callback(step);

    for (const move of MOVES) {
      const next = coords.map((p, i) => p+move[i]);
      if (validEdge(map, next[0], next[1]))
        queue.push({ pos: cts(next[0], next[1]), step: step + 1});
    }
  }
}

