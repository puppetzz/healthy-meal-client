"use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { ActionIcon, Anchor, Breadcrumbs, Pagination } from "@mantine/core";
import { MealPlanCard } from "../../../../components/cards/MealPlanCard";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "../../../../hooks/useCreateQueryString";
import { useMealPlansByUserQuery } from "../../../../queries/useMealPlanByUser";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function MealPlans() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathName = usePathname();

  const page = Number.parseInt(searchParams.get("page") || "1") || 1;

  const mealPlansQuery = useMealPlansByUserQuery({
    page,
    pageSize: 8,
  });

  const mealPlans = useMemo(() => {
    if (mealPlansQuery.data) {
      return mealPlansQuery.data.data;
    }

    return null;
  }, [mealPlansQuery]);

  const onPageChange = useCallback((page: number) => {
    const queryString = createQueryString({
      page: page.toString(),
    });
    router.push(pathName + "?" + queryString);
  }, []);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col px-7">
      <div className="flex-1">
        <div>
          <div className="pb-6">
            <Breadcrumbs>
              <Anchor href="/" className="text-gray-500">
                <HomeIcon className="h-5 w-5" />
              </Anchor>
              <span className="w-[25vw] cursor-pointer overflow-hidden truncate">
                Kế Hoạch
              </span>
            </Breadcrumbs>
          </div>
          <div className="mb-3">
            <span className="text-5xl font-bold">
              Kế Hoạch Cho Bữa Ăn Của Bạn
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {mealPlans?.data.map((mealPlan) => {
            return (
              <div className="relative">
                <MealPlanCard
                  className="cursor-pointer"
                  key={mealPlan.id}
                  mealPlan={mealPlan}
                  onClick={() => {
                    router.push(`/meal-plans/${mealPlan.id}`);
                  }}
                />
                <div className="absolute right-2 top-2 flex h-fit w-fit gap-2">
                  <ActionIcon
                    variant="filled"
                    aria-label="edit"
                    color="blue"
                    onClick={() =>
                      router.push(`/meal-plans/${mealPlan.id}/update`)
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
            );
          })}
        </div>
      </div>
      {!!mealPlans?.total && mealPlans?.total > 1 && (
        <div className="my-5 flex justify-center">
          <Pagination
            total={mealPlans?.total as number}
            value={page}
            onChange={onPageChange}
            color="orange"
          />
        </div>
      )}
    </div>
  );
}
