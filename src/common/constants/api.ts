export const API = {
  RECIPES: "/recipes",
  GET_FOOD_CATEGORIES: "/categories/foods",
  GET_POST_CATEGORIES: "/categories/posts",
  GET_RECIPES_BY_CATEGORY: (categoryId: number) => `/recipes/${categoryId}`,

  CREATE_UPLOAD_FILE_SIGNER_URL: "/files/upload",
  COMMENTS: "/comments",
  MEAL_PLANS: "/meal-plans",
  CALCULATE_TDEE: "/health-metrics/calculate-tdee",
  MEAL_PLAN_COMMENTS: "/comments/meal-plan",
  GET_HEALTH_METRICS: "/health-metrics",
  GET_RECIPES_BY_USER: "/recipes/my-recipe/all",
  GET_MEAL_PLANS_BY_USER: "/meal-plans/my-meal-plans/all",
};
