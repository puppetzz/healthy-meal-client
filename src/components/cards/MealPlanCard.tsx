"use client";

import Image from "next/image";
import { MealPlan } from "../../common/types/MealPlan";
import { cn } from "../../lib/utils";

type MealPlanCardProps = {
  mealPlan: MealPlan;
  onClick: () => void;
  className: string;
};

export function MealPlanCard({
  mealPlan,
  onClick,
  className,
}: MealPlanCardProps) {
  return (
    <div
      className={cn(
        "flex h-[450px] flex-col rounded-xl border-[1px] p-5",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex h-72 w-full gap-5">
        <div className="h-full w-1/2">
          <img
            src={mealPlan.mealPlanRecipe[0].recipe.post?.thumbnail}
            alt=""
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <div className="flex h-full w-1/2 flex-col justify-between">
          <div className="h-[calc(50%-10px)]">
            <img
              src={mealPlan.mealPlanRecipe[1].recipe.post?.thumbnail}
              alt=""
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="h-[calc(50%-10px)]">
            <img
              src={mealPlan.mealPlanRecipe[2].recipe.post?.thumbnail}
              alt=""
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-auto mt-3">
          <span className="text-xl font-semibold">{mealPlan.title}</span>
        </div>
        <div className="mt-auto flex h-fit items-center gap-2">
          <Image
            src="/svg/fork-and-knife.svg"
            alt="fork-and-knife"
            height={25}
            width={25}
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#98a2b3]">
              Number of Recipes
            </span>
            <span className="font-semibold">{`${mealPlan.mealPlanRecipe.length} Recipes`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
