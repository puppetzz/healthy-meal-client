"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../api/recipes";
import { QueryKey } from "../common/constants/queryKey";

export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteRecipe(id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_RECIPES_BY_USER],
      });
    },
  });
};
