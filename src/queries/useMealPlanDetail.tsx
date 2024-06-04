"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getMealPlanById } from "../api/meal-plan";

export const useMealPlanDetailQuery = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLAN_BY_ID, id],
    queryFn: async () => {
      const mealPlan = await getMealPlanById(id);
      return mealPlan;
    },
  });
};
