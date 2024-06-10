import { ENutritionUnit } from "../../common/enums/NutritionUnit";
import { Post } from "../../common/types/post";
import Image from "next/image";
import { cn } from "../../lib/utils";

type VerticalCardProps = {
  post: Post;
  className?: string;
  onClick?: () => void;
};

export const VerticalCard = ({
  post,
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
          src={post.thumbnail}
          alt="recipes"
        />
        <div className="flex flex-1 flex-col px-6 pb-6">
          <div className="flex justify-between">
            <div className="flex w-full flex-wrap gap-[6px]">
              {post.recipe?.recipeFoodCategory.map((category) => (
                <span
                  key={category.foodCategory.id}
                  className="h-fit rounded-full bg-gray-200 px-2 py-[2px] text-sm"
                >
                  {category.foodCategory.name}
                </span>
              ))}
            </div>
            {post.rating && (
              <div>
                <Image src="svg/star.svg" alt="star" width={14} height={14} />
                <span className="text-sm">{post.rating}</span>
              </div>
            )}
          </div>
          <span className="mb-auto mt-1 text-lg font-semibold">
            {post.title}
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
              <span>{post.recipe?.nutrition.calories}</span>
            </div>
            <div className="flex flex-col">
              <span>Carbs</span>
              <span>{`${post.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Fats</span>
              <span>{`${post.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Protein</span>
              <span>{`${post.recipe?.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
