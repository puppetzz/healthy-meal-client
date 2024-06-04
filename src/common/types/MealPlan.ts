import { EMealPlanFrequency } from "../enums/MealPlanFrequency";
import { EMealPlanStatus } from "../enums/MealPlanStatus";
import { MealPlanRecipe } from "./MealPlanRecipe";
import { User } from "./User";

export type MealPlan = {
  id: number;
  authorId: string;
  title: string;
  content: string;
  status: EMealPlanStatus;
  frequency: EMealPlanFrequency;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  rating: number;
  numberOfComments?: number;
  numberOfReviews?: number;
  mealPlanRecipe: MealPlanRecipe[];
  author: User;
};
