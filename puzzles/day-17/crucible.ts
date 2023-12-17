type Map = number[][];
type Step = { x: number, y: number; dir: number; dist: number };

const inBounds = (map: Map, x: number, y: number) =>
  x > -1 && y > -1 && x < map.length && y < map[x].length;

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

export const enqueue = (cur: Step, newDir: number, map: Map, { visited, loss, queue }) => {
  const next = {
    ...step({...cur, dir: newDir}),
    dist: newDir === cur.dir ? cur.dist + 1 : 1,
  }
  if (!inBounds(map, next.x, next.y)) return;

  const id = Object.values(next).join(";");
  if (visited.has(id)) return;

  visited.add(id);
  const nextLoss = loss+map[next.y][next.x];
  queue[nextLoss] ??= [];
  queue[nextLoss].push(next);
}
