import { NutritionUnit } from "../../common/enums/NutritionUnit";
import { Post } from "../../common/types/post";
import Image from "next/image";

type VerticalCardProps = {
  post: Post;
};

export const VerticalCard = ({ post }: VerticalCardProps) => {
  return (
    <>
      <div className="flex flex-col rounded-xl border-2 border-solid">
        <img
          className="mb-4 rounded-tl-xl rounded-tr-xl"
          src={post.thumbnail}
          alt="recipes"
        />
        <div className="flex flex-1 flex-col px-6 pb-6">
          <div className="flex justify-between">
            <div className="flex w-full flex-wrap gap-[6px]">
              {post.recipe?.recipeFoodCategory.map((category) => (
                <span
                  key={category.foodCategory.id}
                  className="rounded-full bg-gray-200 px-2 py-[2px] text-sm"
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
              <span>{`${post.recipe?.nutrition.carbohydrates}${NutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Fats</span>
              <span>{`${post.recipe?.nutrition.fat}${NutritionUnit.FAT}`}</span>
            </div>
            <div className="flex flex-col">
              <span>Protein</span>
              <span>{`${post.recipe?.nutrition.protein}${NutritionUnit.PROTEIN}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
