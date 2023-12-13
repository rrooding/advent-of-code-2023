import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, number>({ max: 10_000_000 });

export const parseLine = (line: string): [string, number[]] =>
  line.split(" ").map((s, i) => i === 0 ? s : s.split(",").map(Number).flat()) as [string, number[]];

const cacheKey = (schema: string, positions: number[], level: number|null): string =>
  [schema,positions.join(","),level].filter(Boolean).join(";");

export const countConfigurations = (schema: string, positions: number[], level: number|null = null): number => {
  const key = cacheKey(schema, positions, level);

  if (cache.get(key)) {
    const x = cache.get(key);
    console.log(x);
    return x;
  }

  const position = positions[0];
  const morePositions = (schema.match(/[\?#]/g)||[]).length;
  const totalPositions = positions.reduce((a, b) => a+b, 0);

  if (!schema) {
    if ((level === null && positions.length === 0) || (positions.length === 1 && level !== null && level === position))
      return 1;
    return 0;
  }

  if (level === null && morePositions < totalPositions) {
    return 0;
  } else if (level !== null) {
    if (positions.length === 0 || morePositions + level < totalPositions)
      return 0;
  }

  let configs = 0;
  const spring = schema[0];
  const rest = schema.slice(1);

  if (spring === '.' && level !== null && level !== position) return 0;
  if (spring === '.' && level !== null) configs += countConfigurations(rest, positions.slice(1));
  if (spring === '?' && level === position) configs += countConfigurations(rest, positions.slice(1));
  if ("?#".includes(spring)) configs += (level === null) ? countConfigurations(rest, positions, 1) : countConfigurations(rest, positions, level + 1);
  if ("?.".includes(spring) && level === null) configs += countConfigurations(rest, positions);

  cache.set(key, configs);
  return configs;
}
