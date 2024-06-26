import { ENutritionUnit } from "../../common/enums/NutritionUnit";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { Recipe } from "../../common/types/recipes";
import { Pill } from "@mantine/core";

type VerticalCardProps = {
  recipe: Recipe;
  className?: string;
  onClick?: () => void;
};

export const VerticalCard = ({
  recipe,
  className,
  onClick,
}: VerticalCardProps) => {
  return (
    <>
      <div
        className={cn(
          "flex h-[420px] flex-col rounded-xl border-2 border-solid",
          className,
        )}
        onClick={onClick}
      >
        <img
          className="mb-4 h-[40%] rounded-tl-xl rounded-tr-xl object-cover"
          src={recipe.post.thumbnail}
          alt="recipes"
        />
        <div className="flex flex-1 flex-col px-6 pb-6">
          <div className="flex justify-between">
            <div className="flex w-full flex-wrap gap-[6px]">
              {recipe.recipeFoodCategory.map((category) => (
                <Pill
                  className="bg-[#eaecf0] text-[13px] font-semibold text-[#364052]"
                  size="md"
                >
                  {category.foodCategory.name}
                </Pill>
              ))}
            </div>
            {recipe.post.rating && (
              <div>
                <Image src="svg/star.svg" alt="star" width={14} height={14} />
                <span className="text-sm">{recipe.post.rating}</span>
              </div>
            )}
          </div>
          <span className="mb-auto mt-1 text-lg font-semibold">
            {recipe.post.title}
          </span>
          <div className="mt-auto flex justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Image
                  src="/svg/fire.svg"
                  alt="fire"
                  width={12}
                  height={12}
                  className="mb-1"
                />
                <span>Cal</span>
              </div>
              <span>{recipe.nutrition.calories}</span>
            </div>
            <div className="flex flex-col">
              <span>Carbs</span>
              <span>{`${recipe.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Fats</span>
              <span>{`${recipe.nutrition.fat}${ENutritionUnit.FAT}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Protein</span>
              <span>{`${recipe.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
