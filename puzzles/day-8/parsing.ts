const parseNode = (string: string): [string, [string, string]] => {
  const [, node, left, right] = string.match(/^(\w{3}) = \((\w{3}), (\w{3})\)/);
  return [node, [left, right]];
}

export const parseFile = (data: string[]): [number[], Record<string, string[]>] => {
  return [
    data[0].replace(/L/g, "0").replace(/R/g, "1").split("").map(Number),
    data.slice(2,-1).map(parseNode).reduce((m, [n, d]) => ({ ...m, [n]: d }), {}),
  ]
}
