"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getRecipes } from "../api/recipes";
import { GetRecipesReq } from "../common/types/request/recipes/GetRecipes";

export const useRecipeQuery = (getRecipeReq: GetRecipesReq) => {
  return useQuery({
    queryKey: [QueryKey.RECIPES],
    queryFn: async () => {
      const recipes = await getRecipes(getRecipeReq);

      return recipes;
    },
  });
};
