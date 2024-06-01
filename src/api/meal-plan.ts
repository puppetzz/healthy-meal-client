import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
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
