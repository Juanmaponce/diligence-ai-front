"use client";

import { Button } from "@/components/ui/button";
import { QueryForm } from "@/components/query/QueryForm";
import { AnalysisLoading } from "@/components/results/AnalysisLoading";
import { useAnalyze } from "@/hooks/useAnalyze";
import type { AnalyzeResponse, UploadedDocument } from "@/types/api";
import { ArrowLeft } from "lucide-react";

interface StepQueryProps {
  uploadedDocuments: UploadedDocument[];
  onBack: () => void;
  onAnalysisComplete: (result: AnalyzeResponse, query: string) => void;
}

export function StepQuery({
  uploadedDocuments,
  onBack,
  onAnalysisComplete,
}: StepQueryProps) {
  const analyzeMutation = useAnalyze();

  function handleSubmit(query: string, docIds: string[], maxSteps: number) {
    analyzeMutation.mutate(
      { query, doc_ids: docIds, max_reasoning_steps: maxSteps },
      {
        onSuccess: (data) => {
          onAnalysisComplete(data, query);
        },
      }
    );
  }

  if (analyzeMutation.isPending) {
    return <AnalysisLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        {analyzeMutation.isError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
          >
            <p className="text-xs text-red-400">
              Analysis failed. Please try again.
            </p>
            <button
              type="button"
              onClick={() => analyzeMutation.reset()}
              className="mt-1 text-xs text-red-400/70 underline hover:text-red-300"
            >
              Dismiss
            </button>
          </div>
        )}

        <QueryForm
          documents={uploadedDocuments}
          onSubmit={handleSubmit}
          isPending={analyzeMutation.isPending}
        />
      </div>

      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-zinc-500 hover:text-zinc-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>
      </div>
    </div>
  );
}
