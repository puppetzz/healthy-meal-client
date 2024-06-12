"use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { VerticalCard } from "../../../components/cards/VerticalCard";
import { useRecipeQuery } from "../../../queries";
import { useFoodCategoriesQuery } from "../../../queries/useFoodCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FoodCategoriesSidebar } from "../../../components/sidebar/FoodCategories";
import { TFoodCategory } from "../../../common/types/FoodCategory";
import { Anchor, Breadcrumbs, Button, Pagination } from "@mantine/core";
import { useCreateQueryString } from "../../../hooks/useCreateQueryString";
import { useCallback, useEffect } from "react";
import { Recipe } from "../../../common/types/recipes";

export default function Recipes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathName = usePathname();

  const page = Number.parseInt(searchParams.get("page") || "1") || 1;

  const { data: recipes, refetch } = useRecipeQuery({
    page,
    pageSize: 12,
  });
  const { data: foodCategories } = useFoodCategoriesQuery();

  const onPageChange = useCallback((page: number) => {
    const queryString = createQueryString({
      page: page.toString(),
    });
    router.push(pathName + "?" + queryString);
  }, []);

  const handleClickCard = useCallback((id: number) => {
    router.push(`/recipes/${id}`);
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5">
        <Breadcrumbs>
          <Anchor href="/" className="text-gray-500">
            <HomeIcon className="h-5 w-5" />
          </Anchor>
          <span className="cursor-pointer">Recipes</span>
        </Breadcrumbs>
        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold">Browse Recipes</h2>

          <div className="flex flex-wrap justify-between">
            {foodCategories?.data.slice(0, 6).map((category) => (
              <div
                key={category.id}
                className="mx-auto flex w-[calc(100%/6-25px)] flex-col items-center justify-center rounded-lg border-2 border-solid border-transparent p-4 hover:border-gray-200 hover:shadow-lg max-md:w-[30%]"
                onClick={() => {
                  router.push(`/recipes/category/${category.key}`);
                }}
              >
                <img className="h-[90px] w-[90px]" src={category.icon} alt="" />
                <span className="mt-4">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex w-[62%] flex-col items-center md:w-[73%]">
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {recipes?.data.recipes.map((recipe) => (
                <VerticalCard
                  key={recipe.id}
                  recipe={recipe as Recipe}
                  onClick={() => {
                    handleClickCard(recipe.post.id);
                  }}
                  className="cursor-pointer"
                />
              ))}
            </div>

            <div className="my-5">
              <Pagination
                total={recipes?.data.total as number}
                value={page}
                onChange={onPageChange}
                color="orange"
              />
            </div>
          </div>

          <div className="w-[35%] md:w-[25%]">
            <FoodCategoriesSidebar
              foodCategories={foodCategories?.data as TFoodCategory[]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
