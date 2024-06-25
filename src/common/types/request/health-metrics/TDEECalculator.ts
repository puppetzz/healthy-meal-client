import { EActivityLevel } from "../../../enums/ActivityLevel";
import { EGender } from "../../../enums/Gender";

export type TDEECalculatorRequest = {
  weight: number;
  height: number;
  age: number;
  gender: EGender;
  activityLevel: EActivityLevel;
};
