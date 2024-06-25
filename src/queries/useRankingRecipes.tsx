import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getRecipesRanking } from "../api/recipes";

export const useRankingRecipesQuery = () => {
  return useSuspenseQuery({
    queryKey: [QueryKey.GET_RECIPES_RANKING],
    queryFn: async () => {
      return await getRecipesRanking();
    },
  });
};
