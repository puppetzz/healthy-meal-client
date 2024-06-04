"use client";

import { useMutation } from "@tanstack/react-query";
import { TCreateMealPlanRequest } from "../common/types/request/meal-plan/CreateMealPlan";
import { createMealPlan } from "../api/meal-plan";

export function useMealPlanMutation() {
  return useMutation({
    mutationFn: async (data: TCreateMealPlanRequest) => {
      const response = await createMealPlan(data);

      return response;
    },
  });
}
