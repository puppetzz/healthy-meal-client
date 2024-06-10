"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFoodCategoriesQuery, useRecipeQuery } from "../../../queries";
import { useCreateQueryString } from "../../../hooks/useCreateQueryString";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../../common/constants/general";
import {
  Box,
  Button,
  Collapse,
  ComboboxData,
  Drawer,
  Input,
  Pagination,
  RangeSlider,
  Select,
} from "@mantine/core";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useDisclosure } from "@mantine/hooks";
import { VerticalCard } from "../../../components/cards/VerticalCard";
import { Post } from "../../../common/types/post";
import { notifications } from "@mantine/notifications";
import { destructFilterQueryString } from "../../../utils/destructFilterQueryString";

const filterOptionDefaultValues = {
  calories: [0, 2400] as [number, number],
  protein: [0, 64] as [number, number],
  fat: [0, 52] as [number, number],
  Carbs: [0, 100] as [number, number],
  sodium: [0, 1850] as [number, number],
  fiber: [0, 42] as [number, number],
  sugar: [0, 100] as [number, number],
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathName = usePathname();

  const [searchBoxValue, setSearchBoxValue] = useState<string>("");
  const [opened, { toggle }] = useDisclosure(false);
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [categoryFilterValue, setCategoryFilterValue] = useState<string>("");
  const [caloriesFilterValue, setCaloriesFilterValue] = useState<
    [number, number]
  >(filterOptionDefaultValues.calories);
  const [proteinFilterValue, setProteinFilterValue] = useState<
    [number, number]
  >(filterOptionDefaultValues.protein);
  const [fatFilterValue, setFatFilterValue] = useState<[number, number]>(
    filterOptionDefaultValues.fat,
  );
  const [CarbsFilterValue, setCarbsFilterValue] = useState<[number, number]>(
    filterOptionDefaultValues.Carbs,
  );
  const [sodiumFilterValue, setSodiumFilterValue] = useState<[number, number]>(
    filterOptionDefaultValues.sodium,
  );
  const [fiberFilterValue, setFiberFilterValue] = useState<[number, number]>(
    filterOptionDefaultValues.fiber,
  );
  const [sugarFilterValue, setSugarFilterValue] = useState<[number, number]>(
    filterOptionDefaultValues.sugar,
  );

  const page = Number.parseInt(searchParams.get("page") || "1") || 1;

  const { data: recipes } = useRecipeQuery({
    search: searchParams.get("q") || "",
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    category: searchParams.get("category") || "",
    calories: destructFilterQueryString(searchParams.get("calories")),
    protein: destructFilterQueryString(searchParams.get("protein")),
    fat: destructFilterQueryString(searchParams.get("fat")),
    carbs: destructFilterQueryString(searchParams.get("carbs")),
    sodium: destructFilterQueryString(searchParams.get("sodium")),
    fiber: destructFilterQueryString(searchParams.get("fiber")),
    sugar: destructFilterQueryString(searchParams.get("sugar")),
  });

  const { data: foodCategories } = useFoodCategoriesQuery();

  const search = searchParams.get("q");

  const onPageChange = useCallback((page: number) => {
    const queryString = createQueryString({
      q: search?.toString() || "",
      page: page.toString(),
      category: searchParams.get("category") || "",
      calories: searchParams.get("calories") || "",
      protein: searchParams.get("protein") || "",
      fat: searchParams.get("fat") || "",
      carbs: searchParams.get("carbs") || "",
      sodium: searchParams.get("sodium") || "",
      fiber: searchParams.get("fiber") || "",
      sugar: searchParams.get("sugar") || "",
    });
    router.push(pathName + "?" + queryString);
  }, []);

  const handleSearchBoxChange = useCallback((value: string) => {
    setSearchBoxValue(value);
    const queryString = createQueryString({
      q: value,
      page: page.toString(),
      category: searchParams.get("category") || "",
      calories: searchParams.get("calories") || "",
      protein: searchParams.get("protein") || "",
      fat: searchParams.get("fat") || "",
      carbs: searchParams.get("carbs") || "",
      sodium: searchParams.get("sodium") || "",
      fiber: searchParams.get("fiber") || "",
      sugar: searchParams.get("sugar") || "",
    });
    router.push(pathName + "?" + queryString);
  }, []);

  const handleClickCard = useCallback((id: number) => {
    router.push(`/recipes/${id}`);
  }, []);

  const categorySelectBoxData = useMemo((): ComboboxData => {
    if (foodCategories) {
      return foodCategories.data.map((foodCategory) => ({
        value: foodCategory.key,
        label: foodCategory.name,
      }));
    }
    return [];
  }, [foodCategories]);

  const handelResetFilter = useCallback(() => {
    setCaloriesFilterValue(filterOptionDefaultValues.calories);
    setProteinFilterValue(filterOptionDefaultValues.protein);
    setFatFilterValue(filterOptionDefaultValues.fat);
    setCarbsFilterValue(filterOptionDefaultValues.Carbs);
    setSodiumFilterValue(filterOptionDefaultValues.sodium);
    setFiberFilterValue(filterOptionDefaultValues.fiber);
    setSugarFilterValue(filterOptionDefaultValues.sugar);
  }, []);

  const handleClickSearchWithFilter = () => {
    const queryString = createQueryString({
      q: searchBoxValue,
      page: page.toString(),
      category: categoryFilterValue,
      calories: `${caloriesFilterValue[0]}-${caloriesFilterValue[1]}`,
      protein: `${proteinFilterValue[0]}-${proteinFilterValue[1]}`,
      fat: `${fatFilterValue[0]}-${fatFilterValue[1]}`,
      carbs: `${CarbsFilterValue[0]}-${CarbsFilterValue[1]}`,
      sodium: `${sodiumFilterValue[0]}-${sodiumFilterValue[1]}`,
      fiber: `${fiberFilterValue[0]}-${fiberFilterValue[1]}`,
      sugar: `${sugarFilterValue[0]}-${sugarFilterValue[1]}`,
    });
    router.push(pathName + "?" + queryString);
  };

  return (
    <div>
      <div className="flex h-fit w-full flex-col items-center bg-[#f3f4f6] py-12">
        <h3 className="mb-4 text-2xl font-bold">Tìm Kiếm:</h3>
        <div className="flex w-[550px] items-center rounded-lg bg-white shadow-lg">
          <div
            className="m-1 cursor-pointer rounded-lg border-[1px] p-3 shadow-sm"
            onClick={toggleDrawer}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-[#ef8e66]" />
          </div>
          <Input
            placeholder="Bạn muốn nấu món gì?"
            variant="unstyled"
            size="lg"
            value={searchBoxValue}
            onChange={(event) => handleSearchBoxChange(event.target.value)}
            className="flex-1"
          />
          <div
            className="m-1 rounded-lg bg-[#ed8737] p-3 shadow-sm"
            onClick={() => router.push(`/search?q=${searchBoxValue}`)}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-[1200px]">
        <div>
          <Box>
            <div className="flex cursor-pointer items-center" onClick={toggle}>
              <span className="mr-4 text-3xl font-bold">Thể Loại</span>
              {opened ? (
                <ChevronUpIcon className="h-6 w-6" />
              ) : (
                <ChevronDownIcon className="h-6 w-6" />
              )}
            </div>
            <Collapse in={opened}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
                {foodCategories?.data.map((category) => (
                  <div className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-[1px] border-white px-7 py-4 font-semibold hover:border-[#e5e7eb] hover:shadow-sm">
                    <img src={category.icon} alt="" className="h-20 w-20" />
                    <span className="flex min-w-[80px]  justify-center text-sm">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </Collapse>
          </Box>
        </div>
        <div className="mt-3 flex flex-col items-center">
          <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipes?.data.data.map((recipe) => (
              <VerticalCard
                key={recipe.id}
                post={recipe as Post}
                onClick={() => {
                  handleClickCard(recipe.id);
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
      </div>
      <Drawer
        offset={8}
        radius="md"
        opened={openedDrawer}
        onClose={closeDrawer}
        title="Bộ Lọc"
      >
        <div>
          <Select
            label="Thể Loại"
            data={categorySelectBoxData}
            placeholder="Chọn Thể Loại"
            value={categoryFilterValue}
            onChange={(value) => {
              if (value) {
                setCategoryFilterValue(value);
              }
            }}
          />
        </div>
        <div className="mt-5 flex flex-col">
          <span>Calo</span>
          <RangeSlider
            value={caloriesFilterValue}
            onChange={setCaloriesFilterValue}
            color="orange"
            min={filterOptionDefaultValues.calories[0]}
            max={filterOptionDefaultValues.calories[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {caloriesFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {caloriesFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Đạm</span>
          <RangeSlider
            value={proteinFilterValue}
            onChange={setProteinFilterValue}
            color="orange"
            min={filterOptionDefaultValues.protein[0]}
            max={filterOptionDefaultValues.protein[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {proteinFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {proteinFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Chất béo</span>
          <RangeSlider
            value={fatFilterValue}
            onChange={setFatFilterValue}
            color="orange"
            min={filterOptionDefaultValues.fat[0]}
            max={filterOptionDefaultValues.fat[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {fatFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {fatFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Carbs</span>
          <RangeSlider
            value={CarbsFilterValue}
            onChange={setCarbsFilterValue}
            color="orange"
            min={filterOptionDefaultValues.Carbs[0]}
            max={filterOptionDefaultValues.Carbs[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {CarbsFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {CarbsFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Natri</span>
          <RangeSlider
            value={sodiumFilterValue}
            onChange={setSodiumFilterValue}
            color="orange"
            min={filterOptionDefaultValues.sodium[0]}
            max={filterOptionDefaultValues.sodium[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {sodiumFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {sodiumFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Chất xơ</span>
          <RangeSlider
            value={fiberFilterValue}
            onChange={setFiberFilterValue}
            color="orange"
            min={filterOptionDefaultValues.fiber[0]}
            max={filterOptionDefaultValues.fiber[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {fiberFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {fiberFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span>Đường</span>
          <RangeSlider
            value={sugarFilterValue}
            onChange={setSugarFilterValue}
            color="orange"
            min={filterOptionDefaultValues.sugar[0]}
            max={filterOptionDefaultValues.sugar[1]}
          />
          <div className="mt-2 flex justify-between">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {sugarFilterValue[0]}
            </span>
            <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-200">
              {sugarFilterValue[1]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex justify-between border-t-[1px] pt-3">
          <Button
            className="bg-gray-200 text-black"
            onClick={handelResetFilter}
          >
            Đặt Lại
          </Button>
          <Button onClick={handleClickSearchWithFilter} color="orange">
            Tìm Kiếm
          </Button>
        </div>
      </Drawer>
    </div>
  );
}