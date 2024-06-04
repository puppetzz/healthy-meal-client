import { User } from "./User";

export type MealPlanComment = {
  id: number;
  mealPlanId: number;
  parentId: number;
  authorId: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comment?: MealPlanComment[];
};
