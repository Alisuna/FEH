import { HeroType } from "./heroType";

export interface Hero{
  id: number;
  type: HeroType;
  level: number;
  name: String;
  hp: number;
  atk: number;
  spd: number;
  def: number;
  res: number;
}
