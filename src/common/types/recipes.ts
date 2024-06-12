import { Ingredient } from "./Ingredient";
import { Nutrition } from "./nutrition";
import { Post } from "./post";
import { RecipeFoodCategory } from "./RecipeFoodCategory";

export type Recipe = {
  id: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  servingSize: number;
  calculationUnit: string;
  freezer: string;
  keeping: string;
  nutrition: Nutrition;
  recipeFoodCategory: RecipeFoodCategory[];
  ingredient: Ingredient[];
  post: Post;
};
