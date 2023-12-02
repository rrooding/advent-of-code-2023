export type CubeSet = {
  red?: number;
  green?: number;
  blue?: number;
};

export type Game = {
  id: number;
  sets: CubeSet[];
};
