"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getHealthMetrics } from "../api/health-metrics";

export const useHealthMetricsQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_HEALTH_METRICS],
    queryFn: async () => {
      const healthMetrics = await getHealthMetrics();

      return healthMetrics;
    },
  });
};
