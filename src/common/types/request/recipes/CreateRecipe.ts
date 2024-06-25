export type CreateRecipeRequest = {
  status: string;
  thumbnail: string;
  title: string;
  content: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  servingSize: number;
  calculationUnit: string;
  keeping: string;
  ingredients?: IngredientRequest[];
  foodCategoryIds: number[];
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  saturatedFat?: number;
  polyunsaturatedFat?: number;
  monounsaturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  potassium?: number;
  fiber?: number;
  sugar?: number;
  vitaminA?: number;
  vitaminC?: number;
  calcium?: number;
  iron?: number;
};

export type IngredientRequest = {
  name: string;
  description: string;
  amount: number;
  unit: string;
};
