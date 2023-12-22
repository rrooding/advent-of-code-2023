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
