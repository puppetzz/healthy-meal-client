import { MealPlan } from "../MealPlan";

export type MealPlanPagination = {
  data: MealPlan[];
  page: number;
  total: number;
};
