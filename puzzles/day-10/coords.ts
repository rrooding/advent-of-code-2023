export type Map = string[][];
export type Point = [number, number];

export const cts = (x: number, y: number) => `${x},${y}`;
export const stc = (s: string) => s.split(",").map(Number)

export const getStart = (map: Map): Point => {
  for(let x = 0; x < map.length; x++) {
    if (map[x].indexOf("S") !== -1) return [x, map[x].indexOf("S")];
  }
}
