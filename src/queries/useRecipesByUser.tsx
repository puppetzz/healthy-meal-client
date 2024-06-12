"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getRecipesByUser } from "../api/recipes";
import { GetRecipesReq } from "../common/types/request/recipes/GetRecipes";

export const useRecipesByUserQuery = (getRecipeReq: GetRecipesReq) => {
  return useQuery({
    queryKey: [QueryKey.GET_RECIPES_BY_USER, getRecipeReq],
    queryFn: async () => {
      console.log(getRecipeReq);
      const recipes = await getRecipesByUser(getRecipeReq);

      return recipes;
    },
  });
};
