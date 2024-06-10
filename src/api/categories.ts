import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { TFoodCategory } from "../common/types/FoodCategory";
import { TPostCategory } from "../common/types/PostCategory";
import axiosClient from "../lib/axiosClient";

export const getFoodCategories = async (): Promise<
  ResponseType<TFoodCategory[]>
> => {
  const response = await axiosClient.get<ResponseType<TFoodCategory[]>>(
    API.GET_FOOD_CATEGORIES,
  );

  return response.data;
};

export const getPostCategories = async (): Promise<
  ResponseType<TPostCategory[]>
> => {
  const response = await axiosClient.get<ResponseType<TPostCategory[]>>(
    API.GET_POST_CATEGORIES,
  );

  return response.data;
};
