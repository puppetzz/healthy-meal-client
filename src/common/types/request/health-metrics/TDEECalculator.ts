import { ActivityLevel } from "../../../enums/ActivityLevel";
import { Gender } from "../../../enums/Gender";

export type TDEECalculatorRequest = {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
};
