import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Maps = { seeds: number[] } & Record<string, unknown>;

const lineToNumbers = (line: string): number[] => line.match(/\d+/g).map((n) => parseInt(n));

const parseFile = (data: string[]): Maps => {
  const seeds = lineToNumbers(data[0])
  return data.slice(2).filter(Boolean).reduce((maps, line: string) => {
    if (line.match(/\d+/)) {
      maps[maps["active-map"]].push(lineToNumbers(line));
    } else {
      maps["active-map"] = line.match(/([^\s]+) map:/)[1];
      maps[maps["active-map"]] = [];
    }
    return maps;
  }, { seeds });
}

const getMapValue = (map, input: number): number => {
  return map.reduce((output: number, [dst,src,len]) => {
    return (input >= src && input <= src+len) ? input-src+dst : output;
  }, input);
}

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const { seeds, ...maps } = parseFile(data);

  const locations = seeds
    .map((s) => getMapValue(maps["seed-to-soil"], s))
    .map((s) => getMapValue(maps["soil-to-fertilizer"], s))
    .map((s) => getMapValue(maps["fertilizer-to-water"], s))
    .map((s) => getMapValue(maps["water-to-light"], s))
    .map((s) => getMapValue(maps["light-to-temperature"], s))
    .map((s) => getMapValue(maps["temperature-to-humidity"], s))
    .map((s) => getMapValue(maps["humidity-to-location"], s));
  return Math.min(...locations);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
