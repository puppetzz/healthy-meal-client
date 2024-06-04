import { TActivityLevel } from "../../../enums/ActivityLevel";
import { TGender } from "../../../enums/Gender";

export type TDEECalculatorRequest = {
  weight: number;
  height: number;
  age: number;
  gender: TGender;
  activityLevel: TActivityLevel;
};
