import { Recipe } from "../recipes";

export type TRecipesPaginationResponse = {
  recipes: Recipe[];
  page: number;
  total: number;
};
