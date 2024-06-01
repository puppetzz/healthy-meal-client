import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { TDEECalculatorRequest } from "../common/types/request/health-metrics/TDEECalculator";
import { HealthMetricTDEEResponse } from "../common/types/response/health-metric-tdee";
import axiosClient from "../lib/axiosClient";

export const calculateTDEE = async (
  body: TDEECalculatorRequest,
): Promise<ResponseType<HealthMetricTDEEResponse>> => {
  const response = await axiosClient<ResponseType<HealthMetricTDEEResponse>>({
    url: API.CALCULATE_TDEE,
    method: "POST",
    data: body,
  });

  return response.data;
};
