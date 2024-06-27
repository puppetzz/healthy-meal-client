"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecipesByUserQuery } from "../../../../queries";
import { useCreateQueryString } from "../../../../hooks/useCreateQueryString";
import { useCallback, useEffect } from "react";
import { VerticalCard } from "../../../../components/cards/VerticalCard";
import { ActionIcon, Anchor, Breadcrumbs, Pagination } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Recipe } from "../../../../common/types/recipes";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useDeleteRecipeMutation } from "../../../../mutation/useDeleteRecipe";
import { notifications } from "@mantine/notifications";

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
  const deleteRecipeMutation = useDeleteRecipeMutation();

  const onPageChange = useCallback((page: number) => {
    const queryString = createQueryString({
      page: page.toString(),
    });
    router.push(pathName + "?" + queryString);
  }, []);

  const handleClickCard = useCallback((id: number) => {
    router.push(`/recipes/${id}`);
  }, []);

  const handleClickDeleteIcon = (id: number) => {
    deleteRecipeMutation
      .mutateAsync(id)
      .then(() => {
        notifications.show({
          title: "Xoá Công Thức",
          color: "green",
          message: "Xoá công thức thành công",
        });
        refetch();
      })
      .catch((error) => {
        notifications.show({
          title: "Xoá Công Thức",
          color: "red",
          message: `Đã có lỗi: ${error.response.data.message}`,
        });
      });
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="">
          <Breadcrumbs>
            <Anchor href="/" className="text-gray-500">
              <HomeIcon className="h-5 w-5" />
            </Anchor>
            <span className="w-[25vw] cursor-pointer overflow-hidden truncate">
              Kế Hoạch
            </span>
          </Breadcrumbs>
        </div>
        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold">Công Thức Của Tôi</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex w-full flex-col items-center">
            <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {recipes?.data.recipes.map((recipe) => (
                <div className="relative">
                  <VerticalCard
                    key={recipe.id}
                    recipe={recipe as Recipe}
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
                        router.push(`/update/recipes/${recipe.post.id}`)
                      }
                    >
                      <IconEdit
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="filled"
                      aria-label="edit"
                      color="red"
                      onClick={() => handleClickDeleteIcon(recipe.id)}
                    >
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
