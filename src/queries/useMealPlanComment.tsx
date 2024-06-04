"use client";

import { useQuery } from "@tanstack/react-query";
import { MealPlanComment } from "../common/types/MealPlanComment";
import { QueryKey } from "../common/constants/queryKey";
import { getCommentByMealPlanId } from "../api/comment";

export const useMealPlanCommentQuery = (mealPlanId: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLAN_COMMENTS, mealPlanId],
    queryFn: async () => {
      const comments = await getCommentByMealPlanId(mealPlanId);

      return comments;
    },
  });
};
