"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getLatestRecipe } from "../api/recipes";

export const useLatestRecipeQuery = () => {
  return useSuspenseQuery({
    queryKey: [QueryKey.GET_LATEST_RECIPE],
    queryFn: async () => {
      return await getLatestRecipe();
    },
  });
};
