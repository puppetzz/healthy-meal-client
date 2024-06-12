"use client";

import { useUploadFile } from "../../../hooks/useUploadFile";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Input, Tabs, Text, rem } from "@mantine/core";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Image } from "@mantine/core";
import { useState } from "react";
import { PostCreateNav } from "../../../components/nav/PostCreateNav";
import { useDisclosure } from "@mantine/hooks";
import { CreatePostSidebar } from "../../../components/sidebar/CreatePostSidebar";
import { useFoodCategoriesQuery } from "../../../queries";
import { usePostCategoriesQuery } from "../../../queries/usePostCategories";
import { TFoodCategory } from "../../../common/types/FoodCategory";
import { TPostCategory } from "../../../common/types/PostCategory";
import dynamic from "next/dynamic";
import {
  CreateRecipeRequest,
  IngredientRequest,
} from "../../../common/types/request/recipes/CreateRecipe";
import { notifications } from "@mantine/notifications";
import { POST_CONTENT_LOCAL_STORAGE_KEY } from "../../../common/constants/general";
import { IngredientForm } from "../../../components/form/IngredientForm";
import { TNutritionInputFields } from "../../../common/types/form/NutritionInputField";
import { TRecipeOptionInputField } from "../../../common/types/form/RecipeOptionInputField";
import { useCreateRecipeMutation } from "../../../mutation/useCreateRecipe";
import { useRouter } from "next/navigation";

const BlockNote = dynamic(
  () => import("../../../components/blog/BlockNote").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default function CreatePost() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(true);
  const uploadFile = useUploadFile();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isRecipe, setIsRecipe] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState([
    { name: "", description: "", amount: "", unit: "" },
  ]);
  const [missingFields, setMissingFields] = useState(false);
  const [nutrition, setNutrition] = useState<TNutritionInputFields>({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    saturatedFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    fiber: 0,
    sugar: 0,
    vitaminA: 0,
    vitaminC: 0,
    calcium: 0,
    iron: 0,
  });
  const [recipeOptions, setRecipeOptions] = useState<TRecipeOptionInputField>({
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    unit: "",
    keeping: "",
    freezer: "",
  });
  const [foodCategoriesSelected, setFoodCategoriesSelected] = useState<
    string[]
  >([]);
  const [postCategoriesSelected, setPostCategoriesSelected] = useState<
    string[]
  >([]);

  const { data: foodCategories } = useFoodCategoriesQuery();
  const { data: postCategories } = usePostCategoriesQuery();

  const createRecipeMutation = useCreateRecipeMutation();

  const previews =
    files.length > 0
      ? files.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <Image
              key={index}
              src={imageUrl}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
              h={220}
            />
          );
        })
      : null;

  const getContent = () => {
    return localStorage.getItem(POST_CONTENT_LOCAL_STORAGE_KEY);
  };

  const addField = () => {
    setInputFields([
      ...inputFields,
      { name: "", description: "", amount: "", unit: "" },
    ]);
  };

  const removeField = (index: number) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSaveDraft = async () => {
    const thumbnail = files.length > 0 ? await uploadFile(files[0]) : null;

    if (!thumbnail) {
      notifications.show({
        title: "Failed to save draft",
        message: "Thumbnail is required",
        color: "red",
      });
      return;
    }

    const status = "draft";

    const content = getContent();

    if (!content) {
      notifications.show({
        title: "Failed to save draft",
        message: "Content is required",
        color: "red",
      });
      return;
    }

    const ingredients: IngredientRequest[] = inputFields
      .filter((field) => field.name && field.amount && field.unit)
      .map((field) => ({
        name: field.name,
        description: field.description,
        amount: parseFloat(field.amount),
        unit: field.unit,
      }));

    if (ingredients.length !== inputFields.length) {
      notifications.show({
        title: "Failed to save draft",
        message: "All ingredient fields are required",
        color: "red",
      });
      return;
    }

    const foodCategories = foodCategoriesSelected.map(Number);

    if (foodCategories.length < 1) {
      notifications.show({
        title: "Failed to save draft",
        message: "Food category is required",
        color: "red",
      });
      return;
    }

    const postCategories = postCategoriesSelected.map(Number);

    if (postCategories.length < 1) {
      notifications.show({
        title: "Failed to save draft",
        message: "Post category is required",
        color: "red",
      });
      return;
    }

    const data: CreateRecipeRequest = {
      status,
      thumbnail,
      title,
      content,
      ingredients,
      prepTime: recipeOptions.prepTime,
      cookTime: recipeOptions.cookTime,
      servings: recipeOptions.servings,
      calculationUnit: recipeOptions.unit,
      keeping: recipeOptions.keeping,
      freezer: recipeOptions.freezer,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbohydrates: nutrition.carbohydrates,
      fat: nutrition.fat,
      saturatedFat: nutrition.saturatedFat,
      polyunsaturatedFat: nutrition.polyunsaturatedFat,
      monounsaturatedFat: nutrition.monounsaturatedFat,
      transFat: nutrition.transFat,
      cholesterol: nutrition.cholesterol,
      sodium: nutrition.sodium,
      potassium: nutrition.potassium,
      fiber: nutrition.fiber,
      sugar: nutrition.sugar,
      vitaminA: nutrition.vitaminA,
      vitaminC: nutrition.vitaminC,
      calcium: nutrition.calcium,
      iron: nutrition.iron,
      foodCategoryIds: foodCategories,
      postCategoryIds: postCategories,
    };

    createRecipeMutation.mutateAsync(data).then(() => {
      router.push("/me/meal-plans");
      notifications.show({
        title: "Create Recipes",
        color: "green",
        message: "Create Successfully!",
      });
    });
  };

  return (
    <>
      <PostCreateNav
        opened={opened}
        toggle={toggle}
        className="border-b-[1px]"
        onSaveDraft={handleSaveDraft}
      />
      <div className="flex justify-between">
        <div className="mt-1 h-full flex-1">
          <div className="h-[calc(100vh-84px)] overflow-y-auto">
            <div className="px-5">
              <Dropzone onDrop={setFiles} accept={IMAGE_MIME_TYPE}>
                {previews ? (
                  previews
                ) : (
                  <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                  >
                    <Dropzone.Accept>
                      <ArrowUpTrayIcon className="h-10 w-10" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <XMarkIcon className="h-10 w-10" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <PhotoIcon className="h-10 w-10" />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5mb
                      </Text>
                    </div>
                  </Group>
                )}
              </Dropzone>
            </div>
            <div className="mx-auto mb-14 max-w-[1100px]">
              <input
                type="text"
                className="w-full px-[50px] text-5xl font-bold outline-none"
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <BlockNote />
            </div>
            {isRecipe && (
              <div className="mx-auto max-w-[1100px] px-10 pb-10">
                <div className="mb-5">
                  <span className="text-xl font-semibold">Ingredients</span>
                </div>
                <IngredientForm
                  inputFields={inputFields}
                  setInputFields={setInputFields}
                  onAddField={addField}
                  onRemoveField={removeField}
                  setMissingFields={setMissingFields}
                />
              </div>
            )}
          </div>
        </div>
        {opened && (
          <CreatePostSidebar
            foodCategories={foodCategories?.data as TFoodCategory[]}
            postCategories={postCategories?.data as TPostCategory[]}
            setIsRecipe={setIsRecipe}
            isRecipe={isRecipe}
            nutrition={nutrition}
            setNutrition={setNutrition}
            recipeOptions={recipeOptions}
            setRecipeOptions={setRecipeOptions}
            foodCategoriesSelected={foodCategoriesSelected}
            setFoodCategoriesSelected={setFoodCategoriesSelected}
            postCategoriesSelected={postCategoriesSelected}
            setPostCategoriesSelected={setPostCategoriesSelected}
          />
        )}
      </div>
    </>
  );
}
