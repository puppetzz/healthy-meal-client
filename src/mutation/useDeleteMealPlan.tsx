"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteMealPlan } from "../api/meal-plan";

export const useDeleteMealPlanMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteMealPlan(id);
    },
  });
};
