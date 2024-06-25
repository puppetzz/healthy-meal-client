import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getRecommendedRecipes } from "../api/recipes";
import { TRecommendRecipesRequest } from "../common/types/request/recipes/RecommendRecipes";

export const useRecommendedRecipesQuery = (query: TRecommendRecipesRequest) => {
  return useQuery({
    queryKey: [QueryKey.GET_RECOMMENDED_RECIPES, query],
    queryFn: async () => {
      return await getRecommendedRecipes(query);
    },
  });
};
