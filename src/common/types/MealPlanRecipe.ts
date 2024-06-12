import { Recipe } from "./recipes";

export type MealPlanRecipe = {
  id: number;
  mealPlanId: string;
  recipeId: number;
  day: number;
  meal: number;
  recipe: Recipe;
};
