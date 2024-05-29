"use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useFoodCategoriesQuery, useRecipeQuery } from "../../../../../queries";
import { VerticalCard } from "../../../../../components/cards/VerticalCard";
import { Post } from "../../../../../common/types/post";
import { use, useCallback, useEffect, useMemo } from "react";
import { FoodCategoriesSidebar } from "../../../../../components/sidebar/FoodCategories";
import { FoodCategory } from "../../../../../common/types/FoodCategory";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "../../../../../hooks/useCreateQueryString";
import { Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../../../common/constants/queryKey";
import { getRecipes } from "../../../../../api/recipes";

export default function CategoryRecipes({
  params,
}: {
  params: { category: string };
}) {
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const router = useRouter();
  const pathName = usePathname();
  const { data: foodCategories } = useFoodCategoriesQuery();

  const currentCategory = useMemo(() => {
    return foodCategories?.data.find(
      (category) => category.key === params.category,
    );
  }, [foodCategories]);

  const page = Number.parseInt(searchParams.get("page") || "1") || 1;

  const { data: recipes } = useQuery({
    queryKey: [QueryKey.GET_RECIPE_BY_FOOD_CATEGORY],
    queryFn: async () => {
      const recipes = await getRecipes({
        page,
        pageSize: 12,
        categoryId: currentCategory?.id,
      });

      return recipes;
    },
    enabled: !!currentCategory,
  });

  const onPageChange = useCallback((page: number) => {
    const queryString = createQueryString({
      page: page.toString(),
    });
    router.push(pathName + "?" + queryString);
  }, []);

  const handleClickCard = useCallback((id: number) => {
    router.push(`/recipes/${id}`);
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] px-5">
      <div className="flex justify-between">
        <div className="w-[73%]">
          <div>
            <div className="pb-5">
              <Breadcrumbs>
                <Anchor href="/" className="text-gray-500">
                  <HomeIcon className="h-5 w-5" />
                </Anchor>
                <Anchor href="/recipes" className="text-gray-500">
                  Recipes
                </Anchor>
                <span className="cursor-pointer">{currentCategory?.name}</span>
              </Breadcrumbs>
            </div>

            <div className="mb-7 flex h-[45px] items-center">
              <img
                className="mr-4 h-full"
                src={currentCategory?.icon}
                alt={params.category}
              />
              <h2 className="text-2xl font-bold">{currentCategory?.name}</h2>
            </div>

            <div className="p-2" />

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {recipes?.data.data.map((recipe) => (
                <VerticalCard
                  className="cursor-pointer"
                  key={recipe.id}
                  post={recipe as Post}
                  onClick={() => handleClickCard(recipe.id)}
                />
              ))}
            </div>
          </div>
          {!!recipes?.data.total && recipes?.data.total > 1 && (
            <div className="my-5 flex w-full items-center justify-center">
              <Pagination
                total={recipes?.data.total as number}
                value={page}
                onChange={onPageChange}
                color="orange"
              />
            </div>
          )}
        </div>

        <div className="w-[25%]">
          <FoodCategoriesSidebar
            foodCategories={foodCategories?.data as FoodCategory[]}
          />
        </div>
      </div>
    </div>
  );
}
