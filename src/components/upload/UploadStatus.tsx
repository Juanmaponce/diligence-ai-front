"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { UploadedDocument } from "@/types/api";

interface UploadStatusProps {
  isPending: boolean;
  progress: number;
  indexedDoc: UploadedDocument | null;
  error: Error | null;
}

export function UploadStatus({ isPending, progress, indexedDoc, error }: UploadStatusProps) {
  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
        <p className="text-xs text-red-400">
          Upload failed: {error.message}
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
            <span className="text-xs text-zinc-400">Uploading & indexing...</span>
          </div>
          <span className="text-xs font-mono text-zinc-500">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1 bg-zinc-800 [&>div]:bg-blue-500" />
      </div>
    );
  }

  if (indexedDoc) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <div>
            <span className="text-xs font-medium text-emerald-300">Indexed successfully</span>
            <p className="text-xs text-zinc-500">
              {indexedDoc.chunks_created} chunks · ID:{" "}
              <code className="font-mono text-zinc-400">{indexedDoc.doc_id}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
