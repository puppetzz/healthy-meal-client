import { useMutation } from "@tanstack/react-query";
import { TDEECalculatorRequest } from "../common/types/request/health-metrics/TDEECalculator";
import { calculateTDEE } from "../api/health-metrics";

export const useCalculateTDEEMutation = () => {
  return useMutation({
    mutationFn: async (body: TDEECalculatorRequest) => {
      const data = await calculateTDEE(body);

      return data;
    },
  });
};
