import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { Post } from "../common/types/post";
import { CreateRecipeRequest } from "../common/types/request/recipes/CreateRecipe";
import { GetRecipesReq } from "../common/types/request/recipes/GetRecipes";
import { TUpdateRecipeRequest } from "../common/types/request/recipes/UpdateRecipe";
import { TRecipesPaginationResponse } from "../common/types/response/RecipesPagination";
import axiosClient from "../lib/axiosClient";

export const getRecipes = async (
  getRecipeReq: GetRecipesReq,
): Promise<ResponseType<TRecipesPaginationResponse>> => {
  const response = await axiosClient<ResponseType<TRecipesPaginationResponse>>(
    API.RECIPES,
    {
      params: getRecipeReq,
    },
  );

  return response.data;
};

export const getRecipeById = async (
  id: string,
): Promise<ResponseType<Post>> => {
  const response = await axiosClient<ResponseType<Post>>({
    url: `${API.RECIPES}/${id}`,
    method: "GET",
  });

  return response.data;
};

export const createRecipes = async (data: CreateRecipeRequest) => {
  const response = await axiosClient({
    url: API.RECIPES,
    method: "POST",
    data,
  });

  return response.data;
};

export const updateRecipes = async (data: TUpdateRecipeRequest) => {
  const response = await axiosClient({
    url: API.RECIPES,
    method: "PUT",
    data,
  });

  return response.data;
};

export const getRecipesByUser = async (
  getRecipeReq: GetRecipesReq,
): Promise<ResponseType<TRecipesPaginationResponse>> => {
  const response = await axiosClient<ResponseType<TRecipesPaginationResponse>>(
    API.GET_RECIPES_BY_USER,
    {
      params: getRecipeReq,
    },
  );

  return response.data;
};
