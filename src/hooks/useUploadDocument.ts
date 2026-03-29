"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useState } from "react";
import type {
  DocumentMetadata,
  UploadDocumentResponse,
  UploadedDocument,
} from "@/types/api";

interface UploadDocumentInput {
  file: File;
  doc_id: string;
  metadata: DocumentMetadata;
}

interface UseUploadDocumentOptions {
  onSuccess?: (doc: UploadedDocument) => void;
}

export function useUploadDocument({
  onSuccess,
}: UseUploadDocumentOptions = {}) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({ file, doc_id, metadata }: UploadDocumentInput) => {
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("doc_id", doc_id);
      formData.append("metadata", JSON.stringify(metadata));

      const res = await apiClient.post<UploadDocumentResponse>(
        `/api/proxy/documents/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            if (e.total) {
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      setUploadProgress(100);
      const doc: UploadedDocument = {
        doc_id: variables.doc_id,
        filename: variables.file.name,
        source: "file",
        metadata: variables.metadata,
        chunks_created: data.chunks_created,
      };
      onSuccess?.(doc);
    },
    onError: () => {
      setUploadProgress(0);
    },
  });

  return { ...mutation, uploadProgress };
}
