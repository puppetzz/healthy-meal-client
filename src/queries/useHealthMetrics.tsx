"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getHealthMetrics } from "../api/health-metrics";

export const useHealthMetricsQuery = (tdee: number) => {
  return useSuspenseQuery({
    queryKey: [QueryKey.GET_HEALTH_METRICS, tdee],
    queryFn: async () => {
      const healthMetrics = await getHealthMetrics();

      return healthMetrics;
    },
  });
};
