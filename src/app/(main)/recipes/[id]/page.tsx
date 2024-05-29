"use client";

import "../../../../styles/recipe.css";
import { Anchor, Breadcrumbs, Button, List, Rating } from "@mantine/core";
import { useRecipeByIdQuery } from "../../../../queries/useRecipeById";
import {
  ClockIcon,
  HeartIcon,
  HomeIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { NutritionUnit } from "../../../../common/enums/NutritionUnit";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CommentForm } from "../../../../components/form/CommentForm";
import { CommentView } from "../../../../components/comment/Comment";
import { useCommentByPostIdQuery } from "../../../../queries/useGetPostByPostId";
import { Comment } from "../../../../common/types/comment";
import { CommentInputField } from "../../../../common/types/form/CommentInputField";
import { usePostCommentMutation } from "../../../../mutation/usePostComment";

const BlockNoteViewOnly = dynamic(
  () =>
    import("../../../../components/blog/BlockNoteViewOnly").then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

export default function RecipePage({ params }: { params: { id: string } }) {
  const [isReplyComment, setIsReplyComment] = useState(false);

  const { data: recipe } = useRecipeByIdQuery(params.id);
  const { data: comment } = useCommentByPostIdQuery(Number(params.id));

  const postCommentMutation = usePostCommentMutation();

  const publishedAt = useMemo(() => {
    if (!recipe?.data.publishedAt) return "";

    return dayjs(recipe.data.publishedAt).format("MMM DD, YYYY");
  }, [recipe?.data.publishedAt]);

  const updateAt = useMemo(() => {
    if (!recipe?.data.updatedAt)
      return dayjs(recipe?.data.createAt).format("MMM DD, YYYY");

    return dayjs(recipe?.data.updatedAt).format("MMM DD, YYYY");
  }, [recipe?.data.updatedAt]);

  const handleJumpToRecipe = () => {
    const element = document.querySelector("#recipes");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitComment = (values: CommentInputField) => {
    const rating = values.isReview ? values.rating : undefined;

    postCommentMutation.mutate({
      postId: recipe?.data.id as number,
      content: values.content,
      rating,
    });
  };

  return (
    <div className="mx-auto flex max-w-[1200px] px-7">
      <div className="mb-32 mr-7 flex-1">
        <div className="flex h-20 items-center justify-between">
          <div className="flex h-full flex-col justify-between">
            <Breadcrumbs>
              <Anchor href="/" className="text-gray-500">
                <HomeIcon className="h-5 w-5" />
              </Anchor>
              <Anchor href="/recipes" className="text-gray-500">
                Recipes
              </Anchor>
              <span className="w-[25vw] cursor-pointer overflow-hidden truncate">
                {recipe?.data?.title}
              </span>
            </Breadcrumbs>

            <div>
              {recipe?.data.recipe?.recipeFoodCategory.map((foodCategory) => (
                <span
                  key={foodCategory.foodCategory.id}
                  className="mr-2 rounded-full bg-gray-200 px-3 py-[2px] text-sm"
                >
                  {foodCategory.foodCategory.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <img
              src={recipe?.data.author?.picture}
              alt="author avatar"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-400">author:</span>
              <span className="font-semibold">
                {recipe?.data.author?.fullName}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-5xl font-bold">{recipe?.data.title}</span>
        </div>
        <div className="mt-5 w-full">
          <img
            src={recipe?.data.thumbnail}
            alt=""
            className="h-[550px] w-full rounded-xl object-cover"
          />
        </div>
        <div className="mt-4 text-sm font-semibold">
          <div>
            <span>published on: </span>
            <span className="text-gray-500">{publishedAt}</span>
          </div>
          <div>
            <span>Last Updated on: </span>
            <span className="text-gray-500">{updateAt}</span>
          </div>
        </div>
        <div className="mt-5">
          <BlockNoteViewOnly content={recipe?.data.content as string} />
        </div>

        <div id="recipes">
          <div className="flex justify-between p-5">
            <div>
              <div>
                <span className="text-4xl font-bold">{recipe?.data.title}</span>
              </div>
              <div className="mt-5 flex gap-4">
                <img
                  src={recipe?.data.author?.picture}
                  alt="author avatar"
                  className="h-14 w-14 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-400">author:</span>
                  <span className="font-semibold">
                    {recipe?.data.author?.fullName}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-1">
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">Servings</span>
                  <div className="flex gap-1">
                    <span className="">{recipe?.data.recipe?.servings}</span>
                    <span>{`(~ 1 ${recipe?.data.recipe?.calculationUnit} servings)`}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">
                    Serving size
                  </span>
                  <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">
                    Does it keep?
                  </span>
                  <span>{recipe?.data.recipe?.keeping}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex h-10 w-52 items-center justify-center gap-2 border-[1px] border-black">
                <PrinterIcon className="h-6 w-6" />
                <span>Print</span>
              </div>
              <div className="flex h-10 w-52 items-center justify-center gap-2 border-[1px] border-black">
                <HeartIcon className="h-6 w-6" />
                <span>Save</span>
              </div>
              <div>
                <img
                  src={recipe?.data.thumbnail}
                  alt=""
                  className="h-52 w-52 object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-end">
                  <Rating readOnly size="lg" value={recipe?.data.rating} />
                </div>
                <div className="flex justify-end text-sm">
                  <span>{`${recipe?.data.rating || 0} from ${recipe?.data.numberOfReviews} reviews`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-r-[1px] border-black">
              <span className="font-semibold uppercase">prep time</span>
              <span>
                <span className="mr-1">{recipe?.data.recipe?.prepTime}</span>
                <span className="text-xs">minutes</span>
              </span>
            </div>
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-black">
              <span className="font-semibold uppercase">cook time</span>
              <span>
                <span className="mr-1">{recipe?.data.recipe?.cookTime}</span>
                <span className="text-xs">minutes</span>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">Ingredients</span>
            <List className="mt-5 pl-5" listStyleType="disc">
              {recipe?.data.recipe?.ingredient?.map((ingredient) => (
                <List.Item>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name} ${ingredient.description}`}</List.Item>
              ))}
            </List>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">{`Nutrition (1 of ${recipe?.data.recipe?.servings} servings)`}</span>
            <div className="flex flex-wrap break-words">
              {!!recipe?.data.recipe?.nutrition.calories && (
                <div className="mr-3">
                  <span className="font-semibold">Calories: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calories}${NutritionUnit.CALORIES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.carbohydrates && (
                <div className="mr-3">
                  <span className="font-semibold">Carbohydrates: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${NutritionUnit.CARBOHYDRATES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.protein && (
                <div className="mr-3">
                  <span className="font-semibold">Protein: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.protein}${NutritionUnit.PROTEIN}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fat && (
                <div className="mr-3">
                  <span className="font-semibold">Fat: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fat}${NutritionUnit.FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.saturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">Saturated Fat: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.saturatedFat}${NutritionUnit.SATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.polyunsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">Polyunsaturated Fat: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.polyunsaturatedFat}${NutritionUnit.POLYUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.monounsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">Monounsaturated Fat: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.monounsaturatedFat}${NutritionUnit.MONOUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.transFat && (
                <div className="mr-3">
                  <span className="font-semibold">Trans Fat: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.transFat}${NutritionUnit.TRANS_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.cholesterol && (
                <div className="mr-3">
                  <span className="font-semibold">Cholesterol: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.cholesterol}${NutritionUnit.CHOLESTEROL}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sodium && (
                <div className="mr-3">
                  <span className="font-semibold">Sodium: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sodium}${NutritionUnit.SODIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.potassium && (
                <div className="mr-3">
                  <span className="font-semibold">Potassium: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.potassium}${NutritionUnit.POTASSIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fiber && (
                <div className="mr-3">
                  <span className="font-semibold">Fiber: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fiber}${NutritionUnit.FIBER}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sugar && (
                <div className="mr-3">
                  <span className="font-semibold">Sugar: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sugar}${NutritionUnit.SUGAR}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminA && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin A: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminA}${NutritionUnit.VITAMIN_A}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminC && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin C: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminC}${NutritionUnit.VITAMIN_C}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.calcium && (
                <div className="mr-3">
                  <span className="font-semibold">Calcium: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calcium}${NutritionUnit.CALCIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.iron && (
                <div className="mr-3">
                  <span className="font-semibold">Iron: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.iron}${NutritionUnit.IRON}`}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-bold">Reviews</span>
              <div className="flex items-center">
                <span className="mr-2 text-2xl font-bold">
                  {recipe?.data.numberOfComments}
                </span>
                <div>
                  <Rating readOnly value={recipe?.data.rating} />
                  <span>{`(Base on ${recipe?.data.numberOfReviews} reviews)`}</span>
                </div>
              </div>
            </div>

            {!isReplyComment && <CommentForm onSubmit={handleSubmitComment} />}
          </div>
          <div className="mt-10">
            <CommentView
              comments={comment?.data as Comment[]}
              setIsReplyComment={setIsReplyComment}
            />
          </div>
        </div>
      </div>

      <div className="w-[300px]">
        <div className="h-fit w-full rounded-xl bg-gray-100 p-4 font-semibold">
          <div className="flex gap-2 text-gray-400">
            <Rating
              defaultValue={recipe?.data.rating || 0}
              readOnly
              size="md"
            />
            <span>{recipe?.data.rating || 0}</span>
            <span>{`(${recipe?.data.numberOfReviews || 0} reviews)`}</span>
          </div>
          <div className="mb-1 mt-5">
            <span className="text-lg">Details</span>
          </div>
          <div className="flex items-center gap-5">
            <ClockIcon className="h-7 w-7 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-gray-400">Prep</span>
              <span>{`${recipe?.data.recipe?.prepTime}min`}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Cook</span>
              <span>{`${recipe?.data.recipe?.cookTime}min`}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Total</span>
              <span>{`${(recipe?.data.recipe?.prepTime || 0) + (recipe?.data.recipe?.cookTime || 0)}min`}</span>
            </div>
          </div>
          <div className="mb-1 mt-2 flex w-full justify-between">
            <span className="text-gray-400"># of servings</span>
            <span>{recipe?.data.recipe?.servings}</span>
          </div>
          {!!recipe?.data.recipe?.servingSize && (
            <div className="mb-1 flex justify-between">
              <span className="text-gray-400">Serving size</span>
              <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
            </div>
          )}
          <div className="mb-1 mt-3">
            <span>Nutrition per serving</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Calories</span>
              <span className="flex gap-2">
                <Image
                  src="/svg/fire.svg"
                  alt="fire"
                  width={12}
                  height={12}
                  className="mb-1"
                />
                {recipe?.data.recipe?.nutrition.calories}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Protein</span>
              <span>{`${recipe?.data.recipe?.nutrition.protein}${NutritionUnit.CALORIES}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fats</span>
              <span>{`${recipe?.data.recipe?.nutrition.fat}${NutritionUnit.FAT}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Carbs</span>
              <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${NutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sodium</span>
              <span>{`${recipe?.data.recipe?.nutrition.sodium}${NutritionUnit.SODIUM}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fiber</span>
              <span>{`${recipe?.data.recipe?.nutrition.fiber}${NutritionUnit.FIBER}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sugar</span>
              <span>{`${recipe?.data.recipe?.nutrition.sugar}${NutritionUnit.SUGAR}`}</span>
            </div>
          </div>
          <div className="rotate-image mb-2 mt-4 flex w-full justify-center">
            <Button
              className="bg-[#586476] hover:opacity-95"
              size="md"
              onClick={handleJumpToRecipe}
            >
              <span className="transition-transform duration-500">
                <Image
                  src="/svg/fork-and-knife.svg"
                  alt="fork-and-knife"
                  height={24}
                  width={24}
                />
              </span>
              <span className="ml-2">Jump to Recipe</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
