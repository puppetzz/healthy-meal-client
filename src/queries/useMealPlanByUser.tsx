"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getMealPlansByUser } from "../api/meal-plan";
import { Pagination } from "../common/types/request/pagination";

export const useMealPlansByUserQuery = (pagination: Pagination) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLANS, pagination],
    queryFn: async () => {
      const mealPlans = await getMealPlansByUser(pagination);

      return mealPlans;
    },
  });
};
