"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { HealthResponse } from "@/types/api";

export function useHealthCheck() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await apiClient.get<HealthResponse>(
        `/api/proxy/health`
      );
      return res.data;
    },
    refetchInterval: 30_000,
    retry: 1,
  });

  const isHealthy =
    !isError && !isLoading && data?.status === "healthy";

  return { isHealthy, isLoading, data };
}
