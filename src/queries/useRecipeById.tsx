"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getRecipeById } from "../api/recipes";

export const useRecipeByIdQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: [QueryKey.GET_RECIPE_BY_ID, { id }],
    queryFn: async () => {
      const recipe = await getRecipeById(id);

      return recipe;
    },
  });
};
