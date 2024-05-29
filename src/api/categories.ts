import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { FoodCategory } from "../common/types/FoodCategory";
import { PostCategory } from "../common/types/PostCategory";
import axiosClient from "../lib/axiosClient";

export const getFoodCategories = async (): Promise<
  ResponseType<FoodCategory[]>
> => {
  const response = await axiosClient.get<ResponseType<FoodCategory[]>>(
    API.GET_FOOD_CATEGORIES,
  );

  return response.data;
};

export const getPostCategories = async (): Promise<
  ResponseType<PostCategory[]>
> => {
  const response = await axiosClient.get<ResponseType<PostCategory[]>>(
    API.GET_POST_CATEGORIES,
  );

  return response.data;
};
