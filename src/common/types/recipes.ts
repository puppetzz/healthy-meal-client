import { Nutrition } from "./nutrition";
import { RecipeFoodCategory } from "./RecipeFoodCategory";

export type Recipe = {
  id: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  calculationUnit: string;
  freezer: string;
  keeping: string;
  nutrition: Nutrition;
  recipeFoodCategory: RecipeFoodCategory[];
};
