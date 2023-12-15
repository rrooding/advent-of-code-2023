export const hash = (s: string) =>
  s.split("").reduce((t, c) => ((t+c.charCodeAt(0))*17)%256, 0);
