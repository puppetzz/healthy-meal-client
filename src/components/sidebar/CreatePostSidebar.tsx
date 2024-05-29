"use client";

import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  NumberInput,
  Tabs,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PostCategory } from "../../common/types/PostCategory";
import { FoodCategory } from "../../common/types/FoodCategory";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { NutritionUnit } from "../../common/enums/NutritionUnit";
import { NutritionInputFields } from "../../common/types/form/NutritionInputField";
import { RecipeOptionInputField } from "../../common/types/form/RecipeOptionInputField";

type CreatePostSidebarProps = {
  postCategories: PostCategory[];
  foodCategories: FoodCategory[];
  setIsRecipe: (isRecipe: boolean) => void;
  isRecipe: boolean;
  nutrition: NutritionInputFields;
  setNutrition: (nutrition: NutritionInputFields) => void;
  recipeOptions: RecipeOptionInputField;
  setRecipeOptions: (recipeOptions: RecipeOptionInputField) => void;
  foodCategoriesSelected: string[];
  setFoodCategoriesSelected: (categories: string[]) => void;
  postCategoriesSelected: string[];
  setPostCategoriesSelected: (categories: string[]) => void;
};

export function CreatePostSidebar({
  postCategories,
  foodCategories,
  setIsRecipe,
  isRecipe,
  nutrition,
  setNutrition,
  recipeOptions,
  setRecipeOptions,
  foodCategoriesSelected,
  setFoodCategoriesSelected,
  postCategoriesSelected,
  setPostCategoriesSelected,
}: CreatePostSidebarProps) {
  const [postCategoriesOpened, { toggle: togglePostCategories }] =
    useDisclosure(false);
  const [foodCategoriesOpened, { toggle: toggleFoodCategories }] =
    useDisclosure(false);
  const [summaryOpened, { toggle: toggleSummary }] = useDisclosure(false);
  const [recipeOptionOpened, { toggle: toggleRecipeOption }] =
    useDisclosure(true);
  const [nutritionOpened, { toggle: toggleNutrition }] = useDisclosure(true);

  return (
    <div className="h-[calc(100vh-80px)] min-w-[300px] border-l-[1px]">
      <Tabs defaultValue="post" color="orange" className="pt-1">
        <Tabs.List>
          <Tabs.Tab value="post">Post</Tabs.Tab>
          <Tabs.Tab value="categories">categories</Tabs.Tab>
          {isRecipe && <Tabs.Tab value="recipe">Recipe</Tabs.Tab>}
        </Tabs.List>

        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          <Tabs.Panel value="post">
            <div
              className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
              onClick={toggleSummary}
            >
              <span>Summary</span>
              {summaryOpened ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
            <div className="mt-1 px-3">
              <Checkbox
                label="The post is recipe"
                checked={isRecipe}
                onChange={(event) => setIsRecipe(event.currentTarget.checked)}
                color="orange"
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="categories">
            <div className="mb-1">
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={togglePostCategories}
                >
                  <span>Post categories</span>
                  {postCategoriesOpened ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={postCategoriesOpened}>
                  <div className="mx-3 mt-1">
                    <Checkbox.Group
                      value={postCategoriesSelected}
                      onChange={setPostCategoriesSelected}
                    >
                      <div className="flex flex-col gap-1">
                        {postCategories?.map((category) => (
                          <Checkbox
                            key={category.id}
                            value={category.id.toString()}
                            label={category.name}
                            color="orange"
                          />
                        ))}
                      </div>
                    </Checkbox.Group>
                  </div>
                </Collapse>
              </Box>
            </div>
            <div className="mb-1">
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleFoodCategories}
                >
                  <span>Food categories</span>
                  {foodCategoriesOpened ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={foodCategoriesOpened}>
                  <div className="mx-3 mt-1">
                    <Checkbox.Group
                      value={foodCategoriesSelected}
                      onChange={setFoodCategoriesSelected}
                    >
                      <div className="flex flex-col gap-1">
                        {foodCategories?.map((category) => (
                          <Checkbox
                            key={category.id}
                            value={category.id.toString()}
                            label={category.name}
                            color="orange"
                          />
                        ))}
                      </div>
                    </Checkbox.Group>
                  </div>
                </Collapse>
              </Box>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="recipe">
            <div className="mt-1">
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleRecipeOption}
                >
                  <span>Options</span>
                  {recipeOptionOpened ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={recipeOptionOpened}>
                  <div className="mt-1 flex w-full flex-col gap-1 px-2">
                    <NumberInput
                      withAsterisk
                      label="Prep Time"
                      value={recipeOptions.prepTime}
                      onChange={(value) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          prepTime: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label="Cook Time"
                      value={recipeOptions.cookTime}
                      onChange={(value) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          cookTime: Number(value),
                        })
                      }
                    />
                    <div className="flex w-full justify-between">
                      <NumberInput
                        withAsterisk
                        label="Servings"
                        className="w-[130px]"
                        value={recipeOptions.servings}
                        onChange={(value) =>
                          setRecipeOptions({
                            ...recipeOptions,
                            servings: Number(value),
                          })
                        }
                      />
                      <TextInput
                        withAsterisk
                        label="Unit"
                        className="w-[130px]"
                        value={recipeOptions.unit}
                        onChange={(event) =>
                          setRecipeOptions({
                            ...recipeOptions,
                            unit: event.currentTarget.value,
                          })
                        }
                      />
                    </div>
                    <TextInput
                      withAsterisk
                      label="Keeping Time"
                      className=""
                      value={recipeOptions.keeping}
                      onChange={(event) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          keeping: event.currentTarget.value,
                        })
                      }
                    />
                    <TextInput
                      withAsterisk
                      label="Freezer Time"
                      className=""
                      value={recipeOptions.freezer}
                      onChange={(event) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          freezer: event.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </Collapse>
              </Box>
            </div>
            <div>
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleNutrition}
                >
                  <span>Nutrition</span>
                  {nutritionOpened ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={nutritionOpened}>
                  <div className="mb-10 mt-1 flex w-full flex-col gap-1 px-2">
                    <NumberInput
                      withAsterisk
                      label={`Calories (${NutritionUnit.CALORIES})`}
                      placeholder="Calories"
                      value={nutrition.calories}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, calories: Number(value) })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Protein (${NutritionUnit.PROTEIN})`}
                      placeholder="Protein"
                      value={nutrition.protein}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, protein: Number(value) })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Cabs (${NutritionUnit.CARBOHYDRATES})`}
                      placeholder="Cabs"
                      value={nutrition.carbohydrates}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          carbohydrates: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Fat (${NutritionUnit.FAT})`}
                      placeholder="Fat"
                      value={nutrition.fat}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, fat: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Saturated Fat (${NutritionUnit.SATURATED_FAT})`}
                      placeholder="Saturated Fat"
                      value={nutrition.saturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          saturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Polyunsaturated Fat (${NutritionUnit.POLYUNSATURATED_FAT})`}
                      placeholder="Polyunsaturated Fat"
                      value={nutrition.polyunsaturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          polyunsaturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Monounsaturated Fat (${NutritionUnit.MONOUNSATURATED_FAT})`}
                      placeholder="Monounsaturated Fat"
                      value={nutrition.monounsaturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          monounsaturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Trans Fat (${NutritionUnit.TRANS_FAT})`}
                      placeholder="Trans Fat"
                      value={nutrition.transFat}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, transFat: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Cholesterol (${NutritionUnit.CHOLESTEROL})`}
                      placeholder="Cholesterol"
                      value={nutrition.cholesterol}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          cholesterol: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Sodium (${NutritionUnit.SODIUM})`}
                      placeholder="Sodium"
                      value={nutrition.sodium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, sodium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Potassium (${NutritionUnit.POTASSIUM})`}
                      placeholder="Potassium"
                      value={nutrition.potassium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, potassium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Fiber (${NutritionUnit.FIBER})`}
                      placeholder="Fiber"
                      value={nutrition.fiber}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, fiber: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Sugar (${NutritionUnit.SUGAR})`}
                      placeholder="Sugar"
                      value={nutrition.sugar}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, sugar: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Vitamin A (${NutritionUnit.VITAMIN_A})`}
                      placeholder="Vitamin A"
                      value={nutrition.vitaminA}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, vitaminA: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Vitamin C (${NutritionUnit.VITAMIN_C})`}
                      placeholder="Vitamin C"
                      value={nutrition.vitaminC}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, vitaminC: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Calcium (${NutritionUnit.CALCIUM})`}
                      placeholder="Calcium"
                      value={nutrition.calcium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, calcium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Iron (${NutritionUnit.IRON})`}
                      placeholder="Iron"
                      value={nutrition.iron}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, iron: Number(value) })
                      }
                    />
                  </div>
                </Collapse>
              </Box>
            </div>
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
