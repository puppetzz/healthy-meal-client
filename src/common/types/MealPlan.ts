import { MealPlanFrequency } from "../enums/MealPlanFrequency";
import { MealPlanStatus } from "../enums/MealPlanStatus";
import { MealPlanRecipe } from "./MealPlanRecipe";
import { User } from "./User";

export type MealPlan = {
  id: number;
  authorId: string;
  title: string;
  content: string;
  status: MealPlanStatus;
  frequency: MealPlanFrequency;
  createdAt: Date;
  updatedAt: Date;
  mealPlanRecipe: MealPlanRecipe[];
  author: User;
};
