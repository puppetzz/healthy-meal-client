"use client";

import { useMutation } from "@tanstack/react-query";
import { updateMealPlan } from "../api/meal-plan";
import { TUpdateMealPlanRequest } from "../common/types/request/meal-plan/UpdateMealPlan";

export const useUpdateMealPlan = () => {
  return useMutation({
    mutationFn: async (data: TUpdateMealPlanRequest) => {
      return await updateMealPlan(data);
    },
  });
};
