"use client";

import { FileText, CheckSquare, Square } from "lucide-react";
import type { UploadedDocument } from "@/types/api";
import { cn } from "@/lib/utils";

interface DocSelectorProps {
  documents: UploadedDocument[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function DocSelector({ documents, selectedIds, onChange }: DocSelectorProps) {
  function toggle(id: string) {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((d) => d !== id)
        : [...selectedIds, id]
    );
  }

  function toggleAll() {
    onChange(
      selectedIds.length === documents.length
        ? []
        : documents.map((d) => d.doc_id)
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-zinc-400">
          Documents to query
        </label>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          {selectedIds.length === documents.length ? "Deselect all" : "Select all"}
        </button>
      </div>

      <div className="space-y-1.5">
        {documents.map((doc) => {
          const isSelected = selectedIds.includes(doc.doc_id);
          return (
            <button
              key={doc.doc_id}
              type="button"
              onClick={() => toggle(doc.doc_id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all",
                isSelected
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              {isSelected ? (
                <CheckSquare className="h-4 w-4 text-blue-400 shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-zinc-600 shrink-0" />
              )}
              <FileText className="h-4 w-4 text-zinc-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-mono text-zinc-200">{doc.doc_id}</p>
                <p className="text-xs text-zinc-600">
                  {doc.metadata.company && `${doc.metadata.company} · `}
                  {doc.metadata.year && `${doc.metadata.year} · `}
                  {doc.chunks_created} chunks
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
