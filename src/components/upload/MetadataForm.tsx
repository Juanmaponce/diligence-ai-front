"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOC_TYPES } from "@/lib/constants";
import type { DocumentMetadata } from "@/types/api";

interface MetadataFormProps {
  docId: string;
  onDocIdChange: (value: string) => void;
  metadata: DocumentMetadata;
  onMetadataChange: (metadata: DocumentMetadata) => void;
}

const DOC_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export function MetadataForm({
  docId,
  onDocIdChange,
  metadata,
  onMetadataChange,
}: MetadataFormProps) {
  const docIdInvalid = docId.length > 0 && !DOC_ID_PATTERN.test(docId);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Document ID</label>
        <Input
          value={docId}
          onChange={(e) => onDocIdChange(e.target.value)}
          className={`bg-zinc-900 border-zinc-700 text-zinc-100 text-xs focus:border-blue-500 font-mono ${docIdInvalid ? "border-red-500" : ""}`}
          placeholder="doc-abc123"
          aria-describedby={docIdInvalid ? "doc-id-error" : undefined}
        />
        {docIdInvalid && (
          <p id="doc-id-error" role="alert" className="text-xs text-red-400">
            Only letters, numbers, hyphens, and underscores (max 64 chars).
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Company</label>
        <Input
          value={metadata.company ?? ""}
          onChange={(e) =>
            onMetadataChange({ ...metadata, company: e.target.value })
          }
          className="bg-zinc-900 border-zinc-700 text-zinc-100 text-xs focus:border-blue-500"
          placeholder="Acme Corp"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Year</label>
        <Input
          type="number"
          value={metadata.year ?? ""}
          onChange={(e) =>
            onMetadataChange({
              ...metadata,
              year: e.target.value ? parseInt(e.target.value, 10) : undefined,
            })
          }
          className="bg-zinc-900 border-zinc-700 text-zinc-100 text-xs focus:border-blue-500"
          placeholder="2024"
          min={1900}
          max={2100}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Document Type</label>
        <Select
          value={metadata.type ?? ""}
          onValueChange={(value) =>
            onMetadataChange({ ...metadata, type: value })
          }
        >
          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100 text-xs focus:border-blue-500">
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {DOC_TYPES.map((t) => (
              <SelectItem
                key={t.value}
                value={t.value}
                className="text-zinc-100 text-xs focus:bg-zinc-800"
              >
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
