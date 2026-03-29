"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { HealthResponse } from "@/types/api";

export function useHealthCheck() {
  const { data, isPending, isError } = useQuery({
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

  // Use isPending (status === 'pending') rather than isLoading (isPending && isFetching)
  // so the server render matches the client's initial render — server never sets isFetching=true.
  const isHealthy =
    !isError && !isPending && data?.status === "healthy";

  return { isHealthy, isLoading: isPending, data };
}
