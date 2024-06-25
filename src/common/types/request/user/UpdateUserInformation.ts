import { EGoal } from "../../../enums/Goal";
import { TDEECalculatorRequest } from "../health-metrics/TDEECalculator";

export type UpdateUserInformationRequest = TDEECalculatorRequest & {
  goal: EGoal;
};
