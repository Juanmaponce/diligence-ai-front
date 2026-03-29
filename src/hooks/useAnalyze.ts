"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { AnalyzePayload, AnalyzeResponse } from "@/types/api";

export function useAnalyze() {
  return useMutation({
    mutationFn: async (payload: AnalyzePayload) => {
      const res = await apiClient.post<AnalyzeResponse>(
        `/api/proxy/analyze`,
        payload,
        { timeout: 120_000 } // 2 minutes for long analyses
      );
      return res.data;
    },
    gcTime: 1000 * 60, // Keep result in cache for 1 minute
  });
}
