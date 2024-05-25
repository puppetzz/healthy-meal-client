import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getFoodCategories } from "../api/categories";

export const useFoodCategoriesQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_FOOT_CATEGORIES],
    queryFn: async () => {
      const response = await getFoodCategories();

      return response;
    },
  });
};
