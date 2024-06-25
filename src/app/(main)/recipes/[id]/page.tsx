"use client";

import "../../../../styles/recipe.css";
import { Anchor, Breadcrumbs, Button, List, Pill, Rating } from "@mantine/core";
import { useRecipeByIdQuery } from "../../../../queries/useRecipeById";
import {
  ClockIcon,
  HeartIcon,
  HomeIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ENutritionUnit } from "../../../../common/enums/NutritionUnit";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CommentForm } from "../../../../components/form/CommentForm";
import { CommentView } from "../../../../components/comment/Comment";
import { useCommentByPostIdQuery } from "../../../../queries/useGetPostByPostId";
import { Comment } from "../../../../common/types/comment";
import { CommentInputField } from "../../../../common/types/form/CommentInputField";
import { usePostCommentMutation } from "../../../../mutation/usePostComment";
import { UseAuth } from "../../../../context/AuthContext";
import { EPostStatus } from "../../../../common/enums/PostStatus";
import { IconHeart } from "@tabler/icons-react";

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
  const { user } = UseAuth();
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

  const isOwner = useMemo(() => {
    if (recipe?.data) {
      if (recipe.data.authorId === user?.uid) return true;
    }

    return false;
  }, [recipe?.data, user]);

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
                Công Thức
              </Anchor>
              <span className="w-[25vw] cursor-pointer overflow-hidden truncate">
                {recipe?.data?.title}
              </span>
            </Breadcrumbs>

            <div>
              {recipe?.data.recipe?.recipeFoodCategory.map((foodCategory) => (
                <Pill className="font-semibold">
                  {foodCategory.foodCategory.name}
                </Pill>
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
              <span className="font-semibold text-gray-400">Tác giả:</span>
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
                  <span className="font-semibold text-gray-400">Tác giả:</span>
                  <span className="font-semibold">
                    {recipe?.data.author?.fullName}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-1">
                <div className="flex items-center">
                  <span className="w-52 text-lg font-semibold">Khẩu phần</span>
                  <div className="flex gap-1">
                    <span className="">{recipe?.data.recipe?.servings}</span>
                    <span>{`(~ 1 ${recipe?.data.recipe?.calculationUnit} mỗi khẩu phần)`}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-52 text-lg font-semibold">
                    Một khẩu phần
                  </span>
                  <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-52 text-lg font-semibold">
                    Có thể bảo quản trong
                  </span>
                  <span>{recipe?.data.recipe?.keeping}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex h-10 w-52 items-center justify-center gap-2 border-[1px] border-black">
                <IconHeart className="h-6 w-6" />
                <span>Lưu</span>
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
                  <span>{`${recipe?.data.rating || 0} từ ${recipe?.data.numberOfReviews} lượt đánh giá`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-r-[1px] border-black">
              <span className="font-semibold uppercase">
                Thời gian chuẩn bị
              </span>
              <span>
                <span className="mr-1 text-xl font-bold">
                  {recipe?.data.recipe?.prepTime}
                </span>
                <span className="text-xs">phút</span>
              </span>
            </div>
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-black">
              <span className="font-semibold uppercase">
                thời gian chế biến
              </span>
              <span>
                <span className="mr-1 text-xl font-bold">
                  {recipe?.data.recipe?.cookTime}
                </span>
                <span className="text-xs">phút</span>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">Thành Phần</span>
            <List className="mt-5 pl-5" listStyleType="disc">
              {recipe?.data.recipe?.ingredient?.map((ingredient) => (
                <List.Item>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name} ${ingredient.description}`}</List.Item>
              ))}
            </List>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">{`Dinh Dưỡng (1 trong ${recipe?.data.recipe?.servings} khẩu phần)`}</span>
            <div className="flex flex-wrap break-words">
              {!!recipe?.data.recipe?.nutrition.calories && (
                <div className="mr-3">
                  <span className="font-semibold">Calo: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calories}${ENutritionUnit.CALORIES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.carbohydrates && (
                <div className="mr-3">
                  <span className="font-semibold">Carbohydrates: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.protein && (
                <div className="mr-3">
                  <span className="font-semibold">Protein: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.saturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo bão hòa: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.saturatedFat}${ENutritionUnit.SATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.polyunsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">
                    Chất béo không bão hòa đa:{" "}
                  </span>
                  <span>{`${recipe?.data.recipe?.nutrition.polyunsaturatedFat}${ENutritionUnit.POLYUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.monounsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">
                    Chất béo không bão hòa đơn:{" "}
                  </span>
                  <span>{`${recipe?.data.recipe?.nutrition.monounsaturatedFat}${ENutritionUnit.MONOUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.transFat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo trans: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.transFat}${ENutritionUnit.TRANS_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.cholesterol && (
                <div className="mr-3">
                  <span className="font-semibold">Cholesterol: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.cholesterol}${ENutritionUnit.CHOLESTEROL}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sodium && (
                <div className="mr-3">
                  <span className="font-semibold">Natri: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sodium}${ENutritionUnit.SODIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.potassium && (
                <div className="mr-3">
                  <span className="font-semibold">Kali: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.potassium}${ENutritionUnit.POTASSIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fiber && (
                <div className="mr-3">
                  <span className="font-semibold">Chất xơ: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fiber}${ENutritionUnit.FIBER}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sugar && (
                <div className="mr-3">
                  <span className="font-semibold">Đường: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sugar}${ENutritionUnit.SUGAR}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminA && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin A: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminA}${ENutritionUnit.VITAMIN_A}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminC && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin C: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminC}${ENutritionUnit.VITAMIN_C}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.calcium && (
                <div className="mr-3">
                  <span className="font-semibold">Canxi: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calcium}${ENutritionUnit.CALCIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.iron && (
                <div className="mr-3">
                  <span className="font-semibold">Sắt: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.iron}${ENutritionUnit.IRON}`}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-bold">Đánh Giá</span>
              <div className="flex items-center">
                <span className="mr-2 text-2xl font-bold">
                  {recipe?.data.numberOfComments}
                </span>
                <div>
                  <Rating readOnly value={recipe?.data.rating} />
                  <span>{`(Dựa trên ${recipe?.data.numberOfReviews} đánh giá)`}</span>
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

      <div className="flex w-[300px] flex-col">
        <div className="h-fit w-full rounded-xl bg-gray-100 p-4 font-semibold">
          <div className="flex gap-2 text-gray-400">
            <Rating value={recipe?.data.rating || 0} readOnly size="md" />
            <span>{recipe?.data.rating || 0}</span>
            <span>{`(${recipe?.data.numberOfReviews || 0} đánh giá)`}</span>
          </div>
          <div className="mb-1 mt-5">
            <span className="text-lg">Chi tiết</span>
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
            <span className="text-gray-400">Số lượng khẩu phần</span>
            <span>{recipe?.data.recipe?.servings}</span>
          </div>
          {!!recipe?.data.recipe?.servingSize && (
            <div className="mb-1 flex justify-between">
              <span className="text-gray-400">Một khẩu phần</span>
              <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
            </div>
          )}
          <div className="mb-1 mt-3">
            <span>Dinh dưỡng trong một khẩu phần</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Calo</span>
              <span className="flex gap-2">
                <Image
                  src="/svg/fire.svg"
                  alt="fire"
                  width={12}
                  height={12}
                  className="mb-1"
                />
                {`${recipe?.data.recipe?.nutrition.protein}${ENutritionUnit.CALORIES}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Protein</span>
              <span>{`${recipe?.data.recipe?.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Chất Béo</span>
              <span>{`${recipe?.data.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Carbs</span>
              <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Natri</span>
              <span>{`${recipe?.data.recipe?.nutrition.sodium}${ENutritionUnit.SODIUM}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Chất Xơ</span>
              <span>{`${recipe?.data.recipe?.nutrition.fiber}${ENutritionUnit.FIBER}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Đường</span>
              <span>{`${recipe?.data.recipe?.nutrition.sugar}${ENutritionUnit.SUGAR}`}</span>
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
              <span className="ml-2">Đi đến công thức</span>
            </Button>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          {isOwner && recipe?.data.status === EPostStatus.DRAFT && (
            <Button onClick={() => {}} className="ư-full" color="orange">
              Chia Sẻ Công Thức
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
