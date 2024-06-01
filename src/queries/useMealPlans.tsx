"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getMealPlans } from "../api/meal-plan";
import { Pagination } from "../common/types/request/pagination";

export const useMealPlansQuery = (pagination: Pagination) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLANS, pagination],
    queryFn: async () => {
      const mealPlans = await getMealPlans(pagination);

      return mealPlans;
    },
  });
};
