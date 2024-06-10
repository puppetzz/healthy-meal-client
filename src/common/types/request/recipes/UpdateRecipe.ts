import { TIngredientRequest } from "./Ingredient";

export type TUpdateRecipeRequest = {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calculationUnit: string;
  keeping: string;
  freezer: string;
  ingredients?: TIngredientRequest[];
  foodCategoryIds: number[];
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  saturatedFat?: number;
  polyunsaturatedFat?: number;
  monounsaturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  potassium?: number;
  fiber?: number;
  sugar?: number;
  vitaminA?: number;
  vitaminC?: number;
  calcium?: number;
  iron?: number;
};
