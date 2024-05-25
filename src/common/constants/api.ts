export const API = {
  GET_RECIPES: "/recipes",
  GET_FOOD_CATEGORIES: "/food-categories",
  GET_RECIPES_BY_CATEGORY: (categoryId: number) => `/recipes/${categoryId}`,
};
