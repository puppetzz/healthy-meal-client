import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { Comment } from "../common/types/comment";
import { MealPlanComment } from "../common/types/MealPlanComment";
import { CreateCommentRequest } from "../common/types/request/comments/CreateComment";
import { CreateMealPlanCommentRequest } from "../common/types/request/comments/CreateMealPlanComment";
import axiosClient from "../lib/axiosClient";

export const getCommentByPostId = async (
  postId: number,
): Promise<ResponseType<Comment[]>> => {
  const response = await axiosClient<ResponseType<Comment[]>>({
    url: `${API.COMMENTS}/post/${postId}`,
    method: "GET",
  });

  return response.data;
};

export const createComment = async (
  createCommentRequest: CreateCommentRequest,
): Promise<ResponseType<Comment>> => {
  const response = await axiosClient<ResponseType<Comment>>({
    url: API.COMMENTS,
    method: "POST",
    data: createCommentRequest,
  });

  return response.data;
};

export const getCommentByMealPlanId = async (
  mealPlanId: number,
): Promise<ResponseType<MealPlanComment[]>> => {
  const response = await axiosClient<ResponseType<MealPlanComment[]>>({
    url: `${API.COMMENTS}/meal-plan/${mealPlanId}`,
    method: "GET",
  });

  return response.data;
};

export const createMealPlanComment = async (
  createMealPlanCommentRequest: CreateMealPlanCommentRequest,
) => {
  const response = await axiosClient<ResponseType<MealPlanComment>>({
    url: API.MEAL_PLAN_COMMENTS,
    method: "POST",
    data: createMealPlanCommentRequest,
  });

  return response.data;
};
