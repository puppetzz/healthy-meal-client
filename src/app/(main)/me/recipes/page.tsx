"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecipesByUserQuery } from "../../../../queries";
import { useCreateQueryString } from "../../../../hooks/useCreateQueryString";
import { useCallback, useEffect } from "react";
import { VerticalCard } from "../../../../components/cards/VerticalCard";
import { ActionIcon, Pagination } from "@mantine/core";
import { FoodCategoriesSidebar } from "../../../../components/sidebar/FoodCategories";
import { Post } from "../../../../common/types/post";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function MyRecipes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathName = usePathname();

  const page = Number.parseInt(searchParams.get("page") || "1") || 1;

  const { data: recipes, refetch } = useRecipesByUserQuery({
    page,
    pageSize: 12,
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

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold">Công Thức Của Tôi</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {recipes?.data.data.map((recipe) => (
                <div className="relative">
                  <VerticalCard
                    key={recipe.id}
                    post={recipe as Post}
                    onClick={() => {
                      handleClickCard(recipe.id);
                    }}
                    className="cursor-pointer"
                  />
                  <div className="absolute right-2 top-2 flex h-fit w-fit gap-2">
                    <ActionIcon
                      variant="filled"
                      aria-label="edit"
                      color="blue"
                      onClick={() =>
                        router.push(`/recipes/${recipe.id}/update`)
                      }
                    >
                      <IconEdit
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon variant="filled" aria-label="edit" color="red">
                      <IconTrash
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </div>
                </div>
              ))}
            </div>

            {!!recipes?.data.total && recipes.data.total > 1 && (
              <div className="my-5">
                <Pagination
                  total={recipes?.data.total as number}
                  value={page}
                  onChange={onPageChange}
                  color="orange"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
