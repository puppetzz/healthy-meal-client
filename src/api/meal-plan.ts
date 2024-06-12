import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { MealPlan } from "../common/types/MealPlan";
import { TCreateMealPlanRequest } from "../common/types/request/meal-plan/CreateMealPlan";
import { TUpdateMealPlanRequest } from "../common/types/request/meal-plan/UpdateMealPlan";
import { Pagination } from "../common/types/request/pagination";
import { MealPlanPagination } from "../common/types/response/MealPlanPagination";
import axiosClient from "../lib/axiosClient";

export const getMealPlans = async (
  Pagination: Pagination,
): Promise<ResponseType<MealPlanPagination>> => {
  const response = await axiosClient<ResponseType<MealPlanPagination>>({
    url: API.MEAL_PLANS,
    method: "GET",
    params: {
      page: Pagination.page,
      pageSize: Pagination.pageSize,
    },
  });
  return response.data;
};

export const getMealPlanById = async (id: number) => {
  const response = await axiosClient<ResponseType<MealPlan>>({
    url: `${API.MEAL_PLANS}/${id}`,
    method: "GET",
  });
  return response.data;
};

export const createMealPlan = async (data: TCreateMealPlanRequest) => {
  const response = await axiosClient<ResponseType<MealPlan>>({
    url: API.MEAL_PLANS,
    method: "POST",
    data,
  });

  return response.data;
};

export const getMealPlansByUser = async (
  Pagination: Pagination,
): Promise<ResponseType<MealPlanPagination>> => {
  const response = await axiosClient<ResponseType<MealPlanPagination>>({
    url: API.GET_MEAL_PLANS_BY_USER,
    method: "GET",
    params: {
      page: Pagination.page,
      pageSize: Pagination.pageSize,
    },
  });
  return response.data;
};

export const updateMealPlan = async (data: TUpdateMealPlanRequest) => {
  const response = await axiosClient<ResponseType<MealPlan>>({
    url: API.MEAL_PLANS,
    method: "PUT",
    data,
  });

  return response.data;
};
