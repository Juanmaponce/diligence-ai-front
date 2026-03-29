"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type {
  IngestTextPayload,
  IngestTextResponse,
  UploadedDocument,
} from "@/types/api";

interface UseIngestTextOptions {
  onSuccess?: (doc: UploadedDocument) => void;
}

export function useIngestText({ onSuccess }: UseIngestTextOptions = {}) {
  return useMutation({
    mutationFn: async (payload: IngestTextPayload) => {
      const res = await apiClient.post<IngestTextResponse>(
        `/api/proxy/documents`,
        payload
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      const doc: UploadedDocument = {
        doc_id: variables.doc_id,
        source: "text",
        metadata: variables.metadata ?? {},
        chunks_created: data.chunks_created,
      };
      onSuccess?.(doc);
    },
  });
}
