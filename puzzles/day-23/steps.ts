
export type Map = string[];
export type Point = [number, number];
export type Edge = [number, number, number];

export const cts = ([x, y]) => `${x},${y}`;
export const stc = (s: string): Point => s.split(",").map(Number) as Point;

export const step = (from: Point, to: Point, getEdges: (point: Point) => Edge[], callback: (distance: number) => void, forbidden = new Set<string>(), seen = new Set<string>(), distance = 0) => {
  if (from[0] === to[0] && from[1] === to[1]) {
    callback(distance);
    return;
  }

  if (distance && forbidden.has(cts(from))) return;

  for (let [x,y,d] of getEdges(from)) {
    let edge = cts([x, y]);
    if (seen.has(edge)) continue;
    seen.add(edge);
    step([x,y], to, getEdges, callback, forbidden, seen, distance+d);
    seen.delete(edge);
  }
};
