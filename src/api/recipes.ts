import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { GetRecipesReq } from "../common/types/request/recipes/GetRecipes";
import { PostPagination } from "../common/types/response/PostPagination";
import axiosClient from "../lib/axiosClient";

export const getRecipes = async (
  getRecipeReq: GetRecipesReq,
): Promise<ResponseType<PostPagination>> => {
  const response = await axiosClient<ResponseType<PostPagination>>(
    API.GET_RECIPES,
    {
      params: getRecipeReq,
    },
  );

  return response.data;
};
