export const parseSchemas = (data: string[]): string[][] =>
  data.reduce((p, l) => {
    if (!l) {
      p.push([])
    } else {
      p[p.length-1].push(l)
    }
    return p;
  }
  , [[]]);

const transpose = (pattern: string[]): string[] => {
  const matrix = pattern.map((l) => l.split(""));
  return matrix[0].map((_, i) => matrix.map(row => row[i])).map((l) => l.join(""));
}

const diff = (a: string, b: string): number => {
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
  }
  return diffs;
};

const getMirror = (array: string[], index: number): string[] => {
  const width = (index+1)*2;
  let end = Math.min(array.length, width)
  let start = Math.max(0, index-(end-index-1)+1)
  return array.slice(start, end);
}

const isPerfectReflection = (pattern: string[], index: number, smudges = 0): boolean => {
  const mirror = getMirror(pattern, index)
  let diffs = smudges;
  let same = true;

  for (let i = 0; i < mirror.length/2; i++) {
    const left = mirror[i]
    const right = mirror[mirror.length-1-i];

    const d = diff(left, right);

    if (left !== right) {
      if (diffs > 0 && d === smudges) {
        diffs--;
      } else {
        same = false;
        break;
      }
    }
  }

  return (smudges > 0 && diffs === smudges) ? false : same;
}

const findReflection = (pattern: string[], smudges = 0): number => {
  const index = pattern
    .reduce((d, row: string, index) =>
     (pattern[index+1] !== undefined && diff((pattern[index+1]), row) <= smudges) ? [...d, index] : d,
     []
   )
   .find((center) => isPerfectReflection(pattern, center, smudges));

  return (index !== undefined) ? index + 1 : 0;
}

export const reflectionIndex = (pattern: string[], smudges = 0): number => {
  if (pattern.length === 0) return 0;
  return 100*findReflection(pattern, smudges)+findReflection(transpose(pattern), smudges);
}
