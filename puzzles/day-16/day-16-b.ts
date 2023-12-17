import { readData } from '../../shared.ts';
import chalk from 'chalk';

import { parseGrid, energiseGrid, countEnergised, type Beam } from "./lasers.ts";

const direction = (x,y) => {
  if (y === 0) return 180;
  if (y === 9) return 0;
  if (x === 0) return 90;
  if (x === 9) return 270;
}


export async function day16b(dataPath?: string) {
  const data = await readData(dataPath);

  const grid = parseGrid(data);

  const rows = grid.length;
  const cols = grid[0].length;

  const energy = [];

  //       const beam = { x: 9, y: 8, dir: direction(9,8) };
  //       const energisedGrid = energiseGrid(beam, grid.slice());
  //       const count = countEnergised(energisedGrid);
  //       console.log(count)

  // return 0;
  //
  const beams = [
    { x: 0, y: 0, dir: 90 },
    { x: 0, y: 0, dir: 180 },
    { x: 0, y: rows-1, dir: 90 },
    { x: 0, y: rows-1, dir: 0 },
    { x: cols-1, y: 0, dir: 180 },
    { x: cols-1, y: 0, dir: 270 },
    { x: cols-1, y: rows-1, dir: 0 },
    { x: cols-1, y: rows-1, dir: 270 },
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (y !== 0 && y !== rows-1 && x !== 0 && x !== cols-1) continue;

      if ([0,cols-1].includes(x) && [0,rows-1].includes(y)) {
        // const beam = { x, y, dir: direction(x,y) };
        // const energisedGrid = energiseGrid(beam, JSON.parse(JSON.stringify(grid)));
        // const count = countEnergised(energisedGrid);
        // energy.push(count);

        // if (x === 0) {
        //   const beam = { x, y, dir: 90 };
        //   const energisedGrid = energiseGrid(beam, JSON.parse(JSON.stringify(grid)));
        //   const count = countEnergised(energisedGrid);
        //   energy.push(count);
        // }

        // //corner
      } else {
        // y === 0 > 180
        // y === 9 > 0
        // x === 0 > 90
        // x === 0 > 270
        // console.log(y,x,direction(x,y))

        beams.push({ x, y, dir: direction(x,y) });
      }
    }
  }

  for (let beam of beams) {
        const energisedGrid = energiseGrid(beam, JSON.parse(JSON.stringify(grid)));
        const count = countEnergised(energisedGrid);
        // console.log(y,x,count)
        energy.push(count);

  }

  console.log(energy)
  console.log(Math.max(...energy))

  return 0;
}

const answer = await day16b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
