import { Recipe } from "./recipes";

export type MealPlanRecipe = {
  id: string;
  mealPlanId: string;
  recipeId: string;
  day: number;
  meal: number;
  recipe: Recipe;
};
