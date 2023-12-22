type Cell = [number, number, number];
export type Brick = { id: number; cells: Cell[]; minZ: number; };

export const parseBricks = (data: string[]): Brick[] => {
  return data.filter(Boolean).map((l, id) => {
    const { groups: { x1, y1, z1, x2, y2, z2 }} = l.match(/(?<x1>\d+),(?<y1>\d+),(?<z1>\d+)~(?<x2>\d+),(?<y2>\d+),(?<z2>\d+)/)
    const cells = [];
    for (let x = Math.min(+x1,+x2); x < Math.max(+x1,+x2)+1; x++) {
      for (let y = Math.min(+y1,+y2); y < Math.max(+y1,+y2)+1; y++) {
        for (let z = Math.min(+z1,+z2); z < Math.max(+z1,+z2)+1; z++) {
          cells.push([x,y,z]);
        }
      }
    }

    return { id, cells, minZ: Math.min(+z1,+z2) };
  }).sort((a, b) => a.minZ - b.minZ);
};

const canDrop = (space: Set<string>, brick: Brick): boolean => {
  if (brick.minZ <= 1) return false;
  for (const cell of brick.cells) {
    const lowerCell = [cell[0], cell[1], cell[2]-1].join(",")
    if (space.has(lowerCell)) return false;
  }
  return true;
}

const drop = (brick: Brick): Brick => ({...brick, cells: brick.cells.map((c) => [c[0], c[1], c[2]-1]), minZ: brick.minZ-1 });

export const dropIt = (bricks: Brick[]): Brick[] => {
  const space = new Set<string>();
  const droppedBricks = [];

  for (let brick of bricks) {
    while (canDrop(space, brick)) {
      brick = drop(brick);
    }
    for (const cell of brick.cells) {
      space.add(cell.join(","))
    }
    droppedBricks.push(brick);
  }

  return droppedBricks;
}
