type Universe = string[][];
type Node = [number, number];

export const findGalaxies = (universe: Universe) => {
  return universe.reduce((galaxies, row, x) => [
    ...galaxies,
    ...(
      row.reduce((g, s, y) =>
        s === "#" ? [...g, [x, y]] : g, []
      )
    )],
    []
  )
}

export const findPairs = (arr: Node[]): Node[][] => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat();

export const distance = (start: Node, end: Node): number => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const transpose = (m: Universe): Universe => m[0].map((_, i) => m.map(x => x[i]));
const dot = (c: string) => c === ".";

export const findSpace = (universe: Universe): number[][] =>
  [universe, transpose(universe)].map((r) => r.map((slice, i) => slice.every(dot) && i).filter(Boolean));

export const expander = (space: number[][]) => (pair: Node[], distance: number, rate = 1) => {
  return space.reduce((d: number, slice: number[], rowOrCol: number) => {
    return slice.reduce((d: number, i: number) => {
      const [min, max] = [
        Math.min(pair[0][rowOrCol], pair[1][rowOrCol]),
        Math.max(pair[0][rowOrCol], pair[1][rowOrCol])
      ];
      return i > min && i <= max ? d + rate : d;
    }, d)
  }, distance)
}
