"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMealPlanCommentRequest } from "../common/types/request/comments/CreateMealPlanComment";
import { createMealPlanComment } from "../api/comment";
import { QueryKey } from "../common/constants/queryKey";

export const useMealPlanCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      createMealPlanCommentRequest: CreateMealPlanCommentRequest,
    ) => {
      const response = await createMealPlanComment(
        createMealPlanCommentRequest,
      );

      return response;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_MEAL_PLAN_COMMENTS],
      });
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_MEAL_PLAN_BY_ID],
      });
    },
  });
};
