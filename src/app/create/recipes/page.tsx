"use client";

import { useUploadFile } from "../../../hooks/useUploadFile";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Text } from "@mantine/core";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Image } from "@mantine/core";
import { useCallback, useState } from "react";
import { MutationRecipesSidebar } from "../../../components/sidebar/CreatePostSidebar";
import { useFoodCategoriesQuery } from "../../../queries";
import { TFoodCategory } from "../../../common/types/FoodCategory";
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
import { Navbar } from "../../../components/nav/Navbar";
import { EPostStatus } from "../../../common/enums/PostStatus";

const BlockNote = dynamic(
  () => import("../../../components/blog/BlockNote").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default function CreatePost() {
  const router = useRouter();
  const uploadFile = useUploadFile();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState<string>("");
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
    servingSize: 0,
    unit: "",
    keeping: "",
  });
  const [foodCategoriesSelected, setFoodCategoriesSelected] = useState<
    string[]
  >([]);

  const { data: foodCategories } = useFoodCategoriesQuery();

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

  const handleSave = useCallback(
    async (status: EPostStatus) => {
      const thumbnail = files.length > 0 ? await uploadFile(files[0]) : null;

      if (!thumbnail) {
        notifications.show({
          title: "Tạo Công Thức Không Thành Công",
          message: "Thumbnail không được để trống",
          color: "red",
        });
        return;
      }

      if (!title) {
        notifications.show({
          title: "Tạo Công Thức Không Thành Công",
          message: "Tiêu đề không được để trống",
          color: "red",
        });
        return;
      }

      const content = getContent();

      if (!content) {
        notifications.show({
          title: "Tạo Công Thức Không Thành Công",
          message: "Nội dung không được để trống",
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
          title: "Tạo Công Thức Không Thành Công",
          message: "Bạn phải nhập đầy đủ các thành phần",
          color: "red",
        });
        return;
      }

      const foodCategories = foodCategoriesSelected.map(Number);

      if (foodCategories.length < 1) {
        notifications.show({
          title: "Tạo Công Thức Không Thành Công",
          message: "Bạn phải chọn ít nhất 1 thể loại cho công thức",
          color: "red",
        });
        return;
      }

      for (const [key, value] of Object.entries(recipeOptions)) {
        if (!value || value === 0) {
          notifications.show({
            title: "Tạo Công Thức Không Thành Công",
            message: `${key} không được để trống`,
            color: "red",
          });
          return;
        }
      }

      const data: CreateRecipeRequest = {
        status: status,
        thumbnail,
        title,
        content,
        ingredients,
        prepTime: recipeOptions.prepTime,
        cookTime: recipeOptions.cookTime,
        servings: recipeOptions.servings,
        servingSize: recipeOptions.servingSize,
        calculationUnit: recipeOptions.unit,
        keeping: recipeOptions.keeping,
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
      };

      createRecipeMutation.mutateAsync(data).then(() => {
        router.push("/me/recipes");
        notifications.show({
          title: "Create Recipes",
          color: "green",
          message: "Create Successfully!",
        });
        localStorage.removeItem(POST_CONTENT_LOCAL_STORAGE_KEY);
      });
    },
    [
      files,
      inputFields,
      foodCategoriesSelected,
      createRecipeMutation,
      getContent,
    ],
  );

  return (
    <>
      <Navbar />
      <div className="flex justify-between border-t-[1px]">
        <div className="mt-1 h-full flex-1">
          <div className="h-[calc(100vh-102px)] overflow-y-auto">
            <div className="flex w-full justify-center px-5">
              <Dropzone
                onDrop={setFiles}
                accept={IMAGE_MIME_TYPE}
                className="w-[80%]"
              >
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
                className="mt-5 w-full px-[50px] text-5xl font-bold outline-none"
                placeholder="Nhập Tiêu Đề"
                onChange={(e) => setTitle(e.target.value)}
              />
              <BlockNote />
            </div>
            <div className="mx-auto max-w-[1100px] px-10 pb-10">
              <div className="mb-5">
                <span className="text-xl font-semibold">Thành Phần</span>
              </div>
              <IngredientForm
                inputFields={inputFields}
                setInputFields={setInputFields}
                onAddField={addField}
                onRemoveField={removeField}
                setMissingFields={setMissingFields}
              />
            </div>
          </div>
        </div>
        <MutationRecipesSidebar
          foodCategories={foodCategories?.data as TFoodCategory[]}
          nutrition={nutrition}
          setNutrition={setNutrition}
          recipeOptions={recipeOptions}
          setRecipeOptions={setRecipeOptions}
          foodCategoriesSelected={foodCategoriesSelected}
          setFoodCategoriesSelected={setFoodCategoriesSelected}
          handleSubmit={handleSave}
          isCreate={true}
        />
      </div>
    </>
  );
}
