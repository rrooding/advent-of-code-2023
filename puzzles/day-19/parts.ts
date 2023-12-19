export type Part = { x: number; m: number; a: number; s: number; t: number; };

type RuleParser = (instructions: string) => Record<string, any>;

const parsePart = (data: string): Part => {
  const [x,m,a,s] = data.match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/).slice(1,5).map(Number);
  return { x,m,a,s, t: x+m+a+s };
}

const parseInstruction = (data: string, ruleParser: RuleParser): Record<string, any> => {
  const [,name,ins] = data.match(/(\w+){(.+)}/);
  return { name, ...ruleParser(ins) };
}

export const parseData = (data: string[], ruleParser: RuleParser) =>
  data.filter(Boolean).reduce(({ instructions, parts }, l: string) => {
    l.startsWith("{") ? parts.push(parsePart(l)) : instructions.push(parseInstruction(l, ruleParser));
    return { instructions, parts };
  }, { instructions: [], parts: [] });
