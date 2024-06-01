export const API = {
  RECIPES: "/recipes",
  GET_FOOD_CATEGORIES: "/categories/foods",
  GET_POST_CATEGORIES: "/categories/posts",
  GET_RECIPES_BY_CATEGORY: (categoryId: number) => `/recipes/${categoryId}`,

  CREATE_UPLOAD_FILE_SIGNER_URL: "/files/upload",
  COMMENTS: "/comments",
  MEAL_PLANS: "/meal-plans",
  CALCULATE_TDEE: "/health-metrics/calculate-tdee",
};
