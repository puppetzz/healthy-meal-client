"use client";

import Image from "next/image";
import { Navbar } from "@/components/nav/Navbar";
import {
  ActionIcon,
  Button,
  ComboboxData,
  Drawer,
  Input,
  Pill,
  RangeSlider,
  Select,
} from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import { useLatestRecipeQuery } from "@/queries/useLatestRecipe";
import { useCallback, useMemo, useState } from "react";
import { useRankingRecipesQuery } from "@/queries/useRankingRecipes";

import "../styles/home.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/footer/footer";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { useDisclosure } from "@mantine/hooks";
import { useFoodCategoriesQuery } from "@/queries";

const filterOptionDefaultValues = {
  calories: [0, 2400] as [number, number],
  protein: [0, 64] as [number, number],
  fat: [0, 52] as [number, number],
  Carbs: [0, 100] as [number, number],
  sodium: [0, 1850] as [number, number],
  fiber: [0, 42] as [number, number],
  sugar: [0, 100] as [number, number],
};

export default function Home() {
  const router = useRouter();
  const { data: latestRecipe } = useLatestRecipeQuery();
  const { data: rankingRecipes } = useRankingRecipesQuery();

  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathName = usePathname();

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

  const [searchBoxValue, setSearchBoxValue] = useState<string>("");
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

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
      categoryId: categoryFilterValue,
      calories: `${caloriesFilterValue[0]}-${caloriesFilterValue[1]}`,
      protein: `${proteinFilterValue[0]}-${proteinFilterValue[1]}`,
      fat: `${fatFilterValue[0]}-${fatFilterValue[1]}`,
      carbs: `${CarbsFilterValue[0]}-${CarbsFilterValue[1]}`,
      sodium: `${sodiumFilterValue[0]}-${sodiumFilterValue[1]}`,
      fiber: `${fiberFilterValue[0]}-${fiberFilterValue[1]}`,
      sugar: `${sugarFilterValue[0]}-${sugarFilterValue[1]}`,
    });
    router.push("search" + "?" + queryString);
    closeDrawer();
  };

  const bannerRecipe = useMemo(() => {
    if (!latestRecipe) return;

    return {
      id: latestRecipe.data.post.id,
      thumbnail: latestRecipe.data.post.thumbnail,
      categories: latestRecipe.data.recipeFoodCategory.map(
        (foodCategory) => foodCategory.foodCategory.name,
      ),
      title: latestRecipe.data.post.title,
      calories: latestRecipe.data.nutrition.calories,
      protein: latestRecipe.data.nutrition.protein,
      fat: latestRecipe.data.nutrition.fat,
      carbs: latestRecipe.data.nutrition.carbohydrates,
    };
  }, [latestRecipe]);

  const { data: foodCategories } = useFoodCategoriesQuery();

  const categorySelectBoxData = useMemo((): ComboboxData => {
    if (foodCategories) {
      return foodCategories.data.map((foodCategory) => ({
        value: foodCategory.id.toString(),
        label: foodCategory.name,
      }));
    }
    return [];
  }, [foodCategories]);

  return (
    <>
      <Navbar />
      <div className="mx-auto mb-10 flex min-h-screen max-w-[1200px] flex-col text-[#364052]">
        <div className="relative">
          <div className="absolute left-0 top-0 z-[20] w-[600px] pt-16">
            <div className="flex flex-col">
              <Pill className="mb-10 w-fit" size="lg">
                Công thức nấu ăn mới
              </Pill>
              <span className="mb-5 rounded-xl bg-[rgba(255,255,255,0.6)] p-3 text-5xl font-bold">
                Bạn đói bụng? Có tôi đây.
              </span>
              <span className="mb-10 rounded-xl bg-[rgba(255,255,255,0.6)] p-3">
                Cảm ơn bạn đã ghé qua! Hãy cùng nấu những món ăn thật ngon và
                dinh dưỡng để khoẻ mạnh và có một cơ thể thật đẹp nhé.
              </span>
              <div className="flex rounded-xl bg-white p-2 shadow-md">
                <ActionIcon
                  variant="white"
                  color="orange"
                  size="xl"
                  aria-label="Filter"
                  className="h-[52px] w-[52px] rounded-xl"
                  onClick={toggleDrawer}
                >
                  <IconAdjustmentsHorizontal
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <div className="mx-2 flex-1">
                  <Input
                    variant="unstyled"
                    size="lg"
                    placeholder="Bạn muốn nấu món gì gì?"
                    onChange={(event) => setSearchBoxValue(event.target.value)}
                  />
                </div>
                <ActionIcon
                  variant="filled"
                  color="orange"
                  size="xl"
                  aria-label="Settings"
                  className="h-[52px] w-[52px] rounded-xl"
                  onClick={handleClickSearchWithFilter}
                >
                  <IconSearch
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <div className="relative rounded-xl">
              <img
                src={bannerRecipe?.thumbnail || ""}
                alt="banner"
                className="h-[500px] w-[800px] rounded-xl object-cover"
              />
              <div
                className="tag absolute bottom-5 right-5 flex h-[170px] w-[350px] cursor-pointer rounded-xl border-2 bg-white"
                onClick={() => router.push(`/recipes/${bannerRecipe?.id}`)}
              >
                <div className="flex h-full w-full flex-col px-5 py-3">
                  <div className="flex flex-wrap gap-2 ">
                    {bannerRecipe?.categories.map((category) => (
                      <Pill className="w-fit" size="md">
                        {category}
                      </Pill>
                    ))}
                  </div>
                  <div className="h-fit">
                    <h3 className="title mt-1 max-h-14 w-full flex-1 overflow-hidden text-ellipsis text-xl font-semibold">
                      {bannerRecipe?.title}
                    </h3>
                  </div>
                  <div className="mt-auto flex h-fit justify-between">
                    <div>
                      <span className="flex items-center gap-1 font-semibold text-[#9aa2b1]">
                        <Image
                          src="/svg/fire.svg"
                          alt="fire"
                          height={12}
                          width={12}
                        />
                        Cal
                      </span>
                      <span className="text-lg font-semibold">
                        {bannerRecipe?.calories}
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 font-semibold text-[#9aa2b1]">
                        Protein
                      </span>
                      <span className="text-lg font-semibold">
                        {`${bannerRecipe?.protein}g`}
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 font-semibold text-[#9aa2b1]">
                        Fat
                      </span>
                      <span className="text-lg font-semibold">{`${bannerRecipe?.fat}g`}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 font-semibold text-[#9aa2b1]">
                        Carbs
                      </span>
                      <span className="text-lg font-semibold">
                        {`${bannerRecipe?.carbs}g`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="chevron flex w-[40px] items-center justify-center rounded-r-[0.6rem] border-l-[1px]">
                  <IconChevronRight />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-3 gap-5">
          {rankingRecipes?.data.slice(0, 3).map((recipe) => (
            <div
              className="flex h-[400px] cursor-pointer flex-col rounded-xl p-2 shadow-md"
              onClick={() => router.push(`/recipes/${recipe.post.id}`)}
            >
              <div className="mb-3 h-[200px] w-full">
                <img
                  src={recipe.post.thumbnail}
                  alt=""
                  className="h-full w-full rounded-xl"
                />
              </div>
              <div className="flex flex-wrap gap-2 ">
                {recipe.recipeFoodCategory.map((category) => (
                  <Pill className="w-fit" size="md">
                    {category.foodCategory.name}
                  </Pill>
                ))}
              </div>
              <div>
                <h3 className="mt-2 max-h-16 w-full overflow-hidden text-ellipsis text-2xl font-semibold">
                  {recipe.post.title}
                </h3>
              </div>
              <div className="mx-1 mt-auto flex h-fit justify-between rounded-xl bg-[#FD7E14] p-2">
                <div className="flex flex-1 flex-col items-center border-r-[0.5px] border-white">
                  <span className="flex items-center gap-1 font-semibold text-[#efc9b6]">
                    Calo
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {recipe.nutrition.calories}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center border-x-[0.5px] border-white">
                  <span className="flex items-center gap-1 font-semibold text-[#efc9b6]">
                    Protein
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {`${recipe.nutrition.protein}g`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center border-x-[0.5px] border-white">
                  <span className="flex items-center gap-1 font-semibold text-[#efc9b6]">
                    Fat
                  </span>
                  <span className="text-lg font-semibold text-white">{`${recipe.nutrition.fat}g`}</span>
                </div>
                <div className="flex flex-1 flex-col items-center border-l-[0.5px] border-white">
                  <span className="flex items-center gap-1 font-semibold text-[#efc9b6]">
                    Carbs
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {`${recipe.nutrition.carbohydrates}g`}
                  </span>
                </div>
              </div>
            </div>
          ))}
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

      <Footer />
    </>
  );
}
