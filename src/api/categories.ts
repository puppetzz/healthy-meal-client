import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { FoodCategory } from "../common/types/FoodCategory";
import axiosClient from "../lib/axiosClient";

export const getFoodCategories = async (): Promise<
  ResponseType<FoodCategory[]>
> => {
  const response = await axiosClient.get<ResponseType<FoodCategory[]>>(
    API.GET_FOOD_CATEGORIES,
  );

  return response.data;
};
