export type CreateMealPlanCommentRequest = {
  mealPlanId: number;
  parentId?: number;
  content: string;
  rating?: number;
};
