"use client";

import { useUploadFile } from "../../../../hooks/useUploadFile";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Text } from "@mantine/core";
import { Image } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useFoodCategoriesQuery,
  useRecipeByIdQuery,
} from "../../../../queries";
import { TFoodCategory } from "../../../../common/types/FoodCategory";
import dynamic from "next/dynamic";
import { notifications } from "@mantine/notifications";
import { IngredientForm } from "../../../../components/form/IngredientForm";
import { TNutritionInputFields } from "../../../../common/types/form/NutritionInputField";
import { TRecipeOptionInputField } from "../../../../common/types/form/RecipeOptionInputField";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { TUpdateRecipeRequest } from "../../../../common/types/request/recipes/UpdateRecipe";
import { useUpdateRecipeMutation } from "../../../../mutation/useUpdateRecipe";
import { TIngredientRequest } from "../../../../common/types/request/recipes/Ingredient";
import { useRouter } from "next/navigation";
import { Navbar } from "../../../../components/nav/Navbar";
import { MutationRecipesSidebar } from "../../../../components/sidebar/CreatePostSidebar";
import { EPostStatus } from "../../../../common/enums/PostStatus";

const BlockNote = dynamic(
  () =>
    import("../../../../components/blog/BlockNote").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default function EditRecipes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: recipe } = useRecipeByIdQuery(params.id);

  const isInitialDataRef = useRef<boolean>(true);

  const uploadFile = useUploadFile();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isRecipe, setIsRecipe] = useState<boolean>(true);
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

  const updateRecipeMutation = useUpdateRecipeMutation();

  const previews = useMemo(() => {
    if (files.length > 0)
      return files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <Image
            key={index}
            src={imageUrl}
            alt="img"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
            h={220}
          />
        );
      });

    if (recipe?.data.thumbnail) {
      return <Image src={recipe.data.thumbnail} alt="img" h={220} />;
    }

    return null;
  }, [files, recipe]);

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

  const handleUpdate = async (status: EPostStatus) => {
    const thumbnail =
      files.length > 0 ? await uploadFile(files[0]) : recipe?.data.thumbnail;

    if (!thumbnail) {
      notifications.show({
        title: "Cập nhật Công Thức Không Thành Công",
        message: "Ảnh nền cho công thức không được để trống",
        color: "red",
      });
      return;
    }

    if (!content) {
      notifications.show({
        title: "Cập nhật Công Thức Không Thành Công",
        message: "Nội dung của công thức không được để trống",
        color: "red",
      });
      return;
    }

    if (!title) {
      notifications.show({
        title: "Cập nhật Công Thức Không Thành Công",
        message: "Tiêu đề của công thức không được để trống",
        color: "red",
      });
      return;
    }

    const ingredients: TIngredientRequest[] = inputFields
      .filter((field) => field.name && field.amount && field.unit)
      .map((field) => ({
        name: field.name,
        description: field.description,
        amount: parseFloat(field.amount),
        unit: field.unit,
      }));

    if (ingredients.length !== inputFields.length) {
      notifications.show({
        title: "Cập nhật Công Thức Không Thành Công",
        message: "Bạn Phải điền đầy đủ thông tin về thành phần công thức",
        color: "red",
      });
      return;
    }

    const foodCategories = foodCategoriesSelected.map(Number);

    if (foodCategories.length < 1) {
      notifications.show({
        title: "Cập nhật Công Thức Không Thành Công",
        message: "Bạn phải chọn ít nhất 1 thể loại cho công thức",
        color: "red",
      });
      return;
    }
    const id = recipe?.data.id || Number(params.id);

    const data: TUpdateRecipeRequest = {
      id,
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

    updateRecipeMutation
      .mutateAsync(data)
      .then(() => {
        router.push("/me/recipes");
        notifications.show({
          title: "Cập Nhật Công Thức",
          color: "green",
          message: "Cập nhật công thức thành công!",
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Cập Nhật Công Thức",
          color: "red",
          message: `Đã có lỗi xảy ra: ${error.response.data.message}`,
        });
      });
  };

  useEffect(() => {
    if (recipe?.data && isInitialDataRef.current) {
      setTitle(recipe.data.title);
      setContent(recipe.data.content);

      if (recipe.data.recipe) {
        if (recipe.data.recipe?.ingredient)
          setInputFields(
            recipe.data.recipe?.ingredient?.map((data) => ({
              name: data.name,
              description: data.description,
              amount: data.amount.toString(),
              unit: data.unit,
            })),
          );

        setRecipeOptions({
          prepTime: recipe.data.recipe.prepTime,
          cookTime: recipe.data.recipe.cookTime,
          servings: recipe.data.recipe.servings,
          servingSize: recipe.data.recipe.servingSize,
          unit: recipe.data.recipe.calculationUnit,
          keeping: recipe.data.recipe.keeping,
        });

        setFoodCategoriesSelected(
          recipe.data.recipe.recipeFoodCategory.map((data) =>
            data.foodCategory.id.toString(),
          ),
        );

        setNutrition({
          calories: recipe.data.recipe.nutrition.calories,
          protein: recipe.data.recipe.nutrition.protein,
          carbohydrates: recipe.data.recipe.nutrition.carbohydrates,
          fat: recipe.data.recipe.nutrition.fat,
          saturatedFat: recipe.data.recipe.nutrition.saturatedFat || 0,
          polyunsaturatedFat:
            recipe.data.recipe.nutrition.polyunsaturatedFat || 0,
          monounsaturatedFat:
            recipe.data.recipe.nutrition.monounsaturatedFat || 0,
          transFat: recipe.data.recipe.nutrition.transFat || 0,
          cholesterol: recipe.data.recipe.nutrition.cholesterol || 0,
          sodium: recipe.data.recipe.nutrition.sodium || 0,
          potassium: recipe.data.recipe.nutrition.potassium || 0,
          fiber: recipe.data.recipe.nutrition.fiber || 0,
          sugar: recipe.data.recipe.nutrition.sugar || 0,
          vitaminA: recipe.data.recipe.nutrition.vitaminA || 0,
          vitaminC: recipe.data.recipe.nutrition.vitaminC || 0,
          calcium: recipe.data.recipe.nutrition.calcium || 0,
          iron: recipe.data.recipe.nutrition.iron || 0,
        });
      }

      isInitialDataRef.current = false;
    }
  }, [recipe]);

  return (
    <>
      <Navbar />
      <div className="flex justify-between border-t-[1px] bg-white">
        <div className="mt-2 h-full flex-1">
          <div className="h-[calc(100vh-110px)] overflow-y-auto">
            <div className="flex w-full justify-center px-20">
              <Dropzone
                onDrop={setFiles}
                accept={IMAGE_MIME_TYPE}
                className="w-[85%]"
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
                      <IconUpload className="h-10 w-10" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX className="h-10 w-10" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto className="h-10 w-10" />
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
            <div className="mx-auto mb-14 max-w-[1100px] pt-5">
              <input
                type="text"
                className="w-full px-[50px] text-5xl font-bold outline-none"
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <div className="px-[50px]">
                <BlockNote content={content} setContent={setContent} />
              </div>
            </div>
            {isRecipe && (
              <div className="mx-auto max-w-[1100px] px-10 pb-10">
                <div className="mb-5">
                  <span className="text-xl font-semibold">Thầnh Phần</span>
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
        <MutationRecipesSidebar
          foodCategories={foodCategories?.data as TFoodCategory[]}
          nutrition={nutrition}
          setNutrition={setNutrition}
          recipeOptions={recipeOptions}
          setRecipeOptions={setRecipeOptions}
          foodCategoriesSelected={foodCategoriesSelected}
          setFoodCategoriesSelected={setFoodCategoriesSelected}
          handleSubmit={handleUpdate}
          isCreate={false}
        />
      </div>
    </>
  );
}
