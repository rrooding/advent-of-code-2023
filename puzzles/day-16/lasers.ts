type Field = {
  op: string;
  energised: boolean;
  ed: number[];
};

export type Grid = Field[][];

export type Beam = {
  x: number;
  y: number;
  dir: number;
};

export const parseGrid = (data: string[]): Grid =>
  data.filter(Boolean).map((l) => l.split("").map((op) => ({ op, energised: false, ed: []})));

const inBounds = (beam: Beam, grid: Grid) =>
  beam.x > -1 && beam.y > -1 && beam.x < grid[0].length && beam.y < grid.length;

const moveBeam = ({x, y, dir}: Beam) => {
  if (dir === -90) dir = 270;
  if (dir === 360) dir = 0;
  switch (dir) {
    case 0: y-=1; break;
    case 90: x+=1; break;
    case 180: y+=1; break;
    case 270: x-=1; break;
  }
  return {x, y, dir};
}

export const renderGrid = (grid: Grid) => {
  const render = grid.map((r) => r.map(({op, energised}) => energised ? "#" : op).join("")).join("\n");
  console.log(render);
}

export const energiseGrid = (inputBeam: Beam, grid: Grid): Grid => {
  const beams = [inputBeam];
  for (let beam of beams) {
    bounds: while (inBounds(beam, grid)) {
      const field = grid[beam.y][beam.x];
      field.energised = true;

      if (field.ed.includes(beam.dir))
        break bounds;
      field.ed.push(beam.dir);

      if (field.op === "/") {
        beam = [90,270].includes(beam.dir) ? moveBeam({...beam, dir: beam.dir-90}) : moveBeam({...beam, dir: beam.dir+90});
      } else if (field.op === "\\") {
        beam = [0,180].includes(beam.dir) ? moveBeam({...beam, dir: beam.dir-90}) : moveBeam({...beam, dir: beam.dir+90});
      } else if (field.op === "|" && [90,270].includes(beam.dir)) {
        beams.push(moveBeam({...beam, dir: 180}));
        beam = moveBeam({...beam, dir: 0});
      } else if (field.op === "-" && [0,180].includes(beam.dir)) {
        beams.push(moveBeam({...beam, dir: 270}));
        beam = moveBeam({...beam, dir: 90});
      } else {
        beam = moveBeam(beam);
      }
    }
  }
  return grid;
}

export const countEnergised = (grid: Grid) =>
  grid.reduce((s, r) => s+r.reduce((rs, f) => f.energised ? rs+1 : rs, 0), 0);
