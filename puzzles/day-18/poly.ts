type Point = [number, number];

export type Instruction = {
  dir: number;
  count: number;
};

const step = ({x, y, dir}) => {
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

export const getPolygon = (instructions: Instruction[]): Point[] =>
  instructions.reduce((p, i) => {
    let next = { x: p[p.length-1][1], y: p[p.length-1][0], dir: i.dir };
    for (let c = 0; c < i.count; c++) {
      next = step(next);
    }
    if (!(next.x === 0 && next.y === 0))
      p.push([next.y, next.x]);
    return p;
  }, [[0,0]]);

export const polygonCircumference = (instructions: Instruction[]): number =>
  instructions.reduce((c,i)=>c+i.count,0)/2+1;

export const polygonArea = (polygon: Point[]) =>
  Math.abs(polygon.reduce((t, p, i) => {
    const add = polygon[i === polygon.length-1 ? 0 : i+1][1];
    const sub = polygon[i === polygon.length-1 ? 0 : i+1][0];
    return t+(p[0]*add*0.5)-(sub*p[1]*0.5);
  }, 0));
