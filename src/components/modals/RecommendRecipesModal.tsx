"use client";

import { Avatar, Modal } from "@mantine/core";
import { useMemo } from "react";
import { THealthMetricsTarget } from "../../common/types/form/HealthMetricsTarget";
import { useRecommendedRecipesQuery } from "../../queries/useRecommenedRecipes";
import { EMeal } from "../../common/enums/meal.enum";
import { useRouter } from "next/navigation";

type SearchRecipesModalProps = {
  opened: boolean;
  close: () => void;
  meal: number;
  healthMetricsForGoals: THealthMetricsTarget;
};

export function RecommendRecipesModal({
  opened,
  close,
  meal,
  healthMetricsForGoals,
}: SearchRecipesModalProps) {
  const router = useRouter();

  const target = useMemo(() => {
    switch (meal) {
      case 1:
        return {
          meal: EMeal.BREAKFAST,
          calories:
            healthMetricsForGoals.detailCaloriesOfMeals.breakfast.calories,
          protein:
            healthMetricsForGoals.detailCaloriesOfMeals.breakfast.protein,
          fat: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.fat,
          carbs: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.carbs,
        };
      case 2:
        return {
          meal: EMeal.LUNCH,
          calories: healthMetricsForGoals.detailCaloriesOfMeals.lunch.calories,
          protein: healthMetricsForGoals.detailCaloriesOfMeals.lunch.protein,
          fat: healthMetricsForGoals.detailCaloriesOfMeals.lunch.fat,
          carbs: healthMetricsForGoals.detailCaloriesOfMeals.lunch.carbs,
        };
      case 3:
        return {
          meal: EMeal.DINNER,
          calories: healthMetricsForGoals.detailCaloriesOfMeals.dinner.calories,
          protein: healthMetricsForGoals.detailCaloriesOfMeals.dinner.protein,
          fat: healthMetricsForGoals.detailCaloriesOfMeals.dinner.fat,
          carbs: healthMetricsForGoals.detailCaloriesOfMeals.dinner.carbs,
        };
      case 4:
        return {
          meal: EMeal.SNACKS,
          calories:
            healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0].calories,
          protein:
            healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0].protein,
          fat: healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0].fat,
          carbs: healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0].carbs,
        };
      case 5:
        return {
          meal: EMeal.SNACKS,
          calories:
            healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1].calories,
          protein:
            healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1].protein,
          fat: healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1].fat,
          carbs: healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1].carbs,
        };
    }

    return {
      meal: EMeal.BREAKFAST,
      calories: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.calories,
      protein: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.protein,
      fat: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.fat,
      carbs: healthMetricsForGoals.detailCaloriesOfMeals.breakfast.carbs,
    };
  }, [meal, healthMetricsForGoals]);

  const { data: recipes } = useRecommendedRecipesQuery({
    meal: target.meal,
    calories: target.calories || 0,
    protein: target.protein || 0,
    fat: target.fat || 0,
    carbs: target.carbs || 0,
  });

  return (
    <Modal opened={opened} onClose={close} title="Recipes" size="xl">
      <div className="flex h-[600px] flex-col">
        <div className="flex h-full flex-col gap-3 overflow-auto">
          {recipes?.data.map((recipe) => (
            <div
              className="flex cursor-pointer gap-2 rounded-xl bg-[#f9fafb] p-2"
              onClick={() => {
                router.push(`/recipes/${recipe.post.id}`);
              }}
            >
              <Avatar size="125" src={recipe.post.thumbnail} radius="md" />
              <div className="flex flex-col">
                <div className="h-[60px] overflow-hidden">
                  <span className="text-xl font-bold">{recipe.post.title}</span>
                </div>
                <div className="mt-auto flex w-[400px] rounded-xl bg-[#ed8537] px-4 py-2 text-white">
                  <div className="flex w-1/4 flex-col items-center border-r-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.nutrition.calories}cal`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      calories
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.nutrition.protein}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      protein
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.nutrition.fat}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      fat
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-l-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.nutrition.carbohydrates}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      carbs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
