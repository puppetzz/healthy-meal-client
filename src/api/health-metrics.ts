import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { TDEECalculatorRequest } from "../common/types/request/health-metrics/TDEECalculator";
import { THealthMetricTDEEResponse } from "../common/types/response/health-metric-tdee";
import axiosClient from "../lib/axiosClient";

export const calculateTDEE = async (
  body: TDEECalculatorRequest,
): Promise<ResponseType<THealthMetricTDEEResponse>> => {
  const response = await axiosClient<ResponseType<THealthMetricTDEEResponse>>({
    url: API.CALCULATE_TDEE,
    method: "POST",
    data: body,
  });

  return response.data;
};

export const getHealthMetrics = async () => {
  const response = await axiosClient<ResponseType<THealthMetricTDEEResponse>>({
    url: API.HEALTH_METRICS,
    method: "GET",
  });

  return response.data;
};
