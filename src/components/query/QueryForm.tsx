"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DocSelector } from "@/components/query/DocSelector";
import type { UploadedDocument } from "@/types/api";
import { Sparkles } from "lucide-react";

const QUERY_MAX_LENGTH = 5000;

interface QueryFormProps {
  documents: UploadedDocument[];
  onSubmit: (query: string, docIds: string[], maxSteps: number) => void;
  isPending: boolean;
}

const EXAMPLE_QUERIES = [
  "What are the main financial risks in these documents?",
  "Analyze the debt-to-equity ratio and liquidity position",
  "Are there any red flags in the revenue recognition policies?",
];

export function QueryForm({ documents, onSubmit, isPending }: QueryFormProps) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(
    documents.map((d) => d.doc_id)
  );
  const [maxSteps, setMaxSteps] = useState(5);

  // Sync selectedIds when the documents list changes (e.g. user uploads more docs)
  useEffect(() => {
    setSelectedIds((prev) => {
      const docIdSet = new Set(documents.map((d) => d.doc_id));
      const kept = prev.filter((id) => docIdSet.has(id));
      const newIds = documents
        .filter((d) => !prev.includes(d.doc_id))
        .map((d) => d.doc_id);
      return [...kept, ...newIds];
    });
  }, [documents]);

  const canSubmit =
    !isPending &&
    query.trim().length > 0 &&
    query.length <= QUERY_MAX_LENGTH &&
    selectedIds.length > 0;

  return (
    <div className="space-y-5">
      {/* Query textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Due diligence question
        </label>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What financial risks should I be aware of before investing in this company?"
          className="min-h-[100px] resize-none bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 text-sm leading-relaxed"
          disabled={isPending}
          maxLength={QUERY_MAX_LENGTH}
        />
        <p className={`text-right text-xs ${query.length >= QUERY_MAX_LENGTH ? "text-red-400" : "text-zinc-600"}`}>
          {query.length.toLocaleString()} / {QUERY_MAX_LENGTH.toLocaleString()}
        </p>
        {/* Example queries */}
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuery(q)}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors truncate max-w-[200px]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Doc selector */}
      <DocSelector
        documents={documents}
        selectedIds={selectedIds}
        onChange={setSelectedIds}
      />

      {/* Reasoning steps slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-zinc-400">
            Max reasoning steps
          </label>
          <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-300">
            {maxSteps}
          </span>
        </div>
        <Slider
          value={[maxSteps]}
          onValueChange={([v]) => setMaxSteps(v)}
          min={1}
          max={10}
          step={1}
          disabled={isPending}
          className="[&>span]:bg-blue-500 [&>span>span]:bg-zinc-700"
        />
        <div className="flex justify-between text-xs text-zinc-700">
          <span>Faster</span>
          <span>More thorough</span>
        </div>
      </div>

      <Button
        onClick={() => onSubmit(query, selectedIds, maxSteps)}
        disabled={!canSubmit}
        className="w-full bg-blue-500 hover:bg-blue-400 text-white disabled:opacity-40 font-semibold"
        size="lg"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Analyze Documents
      </Button>
    </div>
  );
}
