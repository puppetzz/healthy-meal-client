import { useMutation } from "@tanstack/react-query";
import { CreateRecipeRequest } from "../common/types/request/recipes/CreateRecipe";
import { createRecipes } from "../api/recipes";

export function useCreateRecipeMutation() {
  return useMutation({
    mutationFn: async (recipe: CreateRecipeRequest) => {
      const response = await createRecipes(recipe);

      return response;
    },
  });
}
