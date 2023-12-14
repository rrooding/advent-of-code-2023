const transpose = (array: string[]): string[] => {
  const matrix = array.map((l) => l.split(""));
  return matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index])).map((l) => l.join(""));
}

export const tiltNorth = (platform: string[]) =>
  transpose(transpose(transpose(transpose(platform).map((l) => l.split("#").map((p) => p.split("").sort().reverse().join("")).join("#")))));

const tiltWest = (platform: string[]) =>
  platform.map((l) => l.split("#").map((p) => p.split("").sort().reverse().join("")).join("#"));

const tiltSouth = (platform: string[]) =>
  transpose(transpose(transpose(transpose(platform).map((l) => l.split("").reverse().join("")).map((l) => l.split("#").map((p) => p.split("").sort().reverse().join("")).join("#")).map((l) => l.split("").reverse().join("")))));

const tiltEast = (platform: string[]) =>
  platform.map((l) => l.split("").reverse().join("")).map((l) => l.split("#").map((p) => p.split("").sort().reverse().join("")).join("#")).map((l) => l.split("").reverse().join(""));

export const cycle = (platform: string[]) =>
  tiltEast(tiltSouth(tiltWest(tiltNorth(platform))));

export const weight = (platform: string[]) =>
  transpose(platform)
    .reduce((s, l) => s + l.split("").reduce((sub, r, i) =>
      ".#".includes(r) ? sub : sub + l.length-i, 0), 0);
