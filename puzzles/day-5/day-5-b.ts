import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Maps = { seeds: number[][] } & Record<string, unknown>;

const lineToNumbers = (line: string): number[] => line.match(/\d+/g).map((n) => parseInt(n));

const seedsToRanges = (ranges: number[]): number[][] => {
  return ranges.reduce((seeds, _, index, arr) => {
    if (index % 2 === 0) {
      seeds.push(arr.slice(index, index + 2));
    }
    return seeds;
  }, [])
}

const parseFile = (data: string[]): Maps => {
  const seeds = seedsToRanges(lineToNumbers(data[0]));
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

const inRange = (input, src, len): boolean => input >= src && input < src+len;

const getMapValue = (map, input: number): number => {
  return map.reduce((output: number, [dst,src,len]) => {
    return inRange(input, src, len) ? input-src+dst : output;
  }, input);
}

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);
  const { seeds, ...maps } = parseFile(data);

  const lps = seeds.map(([start, len]) => {
    const end = start + len - 1;

    let lowest = undefined;
    for(let input = start; input <= end; input += 1) {
      const soil = getMapValue(maps["seed-to-soil"], input);
      const fert = getMapValue(maps["soil-to-fertilizer"], soil);
      const water = getMapValue(maps["fertilizer-to-water"], fert);
      const light = getMapValue(maps["water-to-light"], water)
      const temp = getMapValue(maps["light-to-temperature"], light)
      const hum = getMapValue(maps["temperature-to-humidity"], temp)
      const loc = getMapValue(maps["humidity-to-location"], hum)
      if (lowest === undefined || loc < lowest)
        lowest = loc;
    }

    return lowest;
  });

  return Math.min(...lps);
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
