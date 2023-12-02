import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseGame } from "./parseGame.ts";
import { type CubeSet, type Game } from "./types.ts";

const MAX_TOTAL_CUBES = 12+13+14;

const isSetPossible = (set: CubeSet): boolean => {
  const sum = Object.values(set).reduce((a, b) => a + b);
  return (set.red || 0) <= 12 && (set.green || 0) <= 13 && (set.blue || 0) <= 14 && sum <= 12+13+14;
};

const isGamePossible = (game: Game): boolean => {
  return !game.sets.map(isSetPossible).includes(false);
};

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  return data
    .filter(Boolean)
    .map(parseGame)
    .reduce((score, game) => isGamePossible(game) ? score + game.id : score, 0)
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
