"use client";

import { FileText } from "lucide-react";

interface SourcesBadgesProps {
  sources: string[];
}

export function SourcesBadges({ sources }: SourcesBadgesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => (
        <span
          key={source}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400"
        >
          <FileText className="h-3 w-3 text-zinc-600" />
          {source}
        </span>
      ))}
    </div>
  );
}
