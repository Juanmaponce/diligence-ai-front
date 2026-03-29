"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FinalAnswerProps {
  answer: string;
  query: string;
}

export function FinalAnswer({ answer, query }: FinalAnswerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(24,24,27,0.9) 60%)",
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 border border-blue-500/20">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          AI Analysis
        </span>
      </div>

      {query && (
        <p className="mb-4 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs italic text-zinc-500">
          &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="prose prose-sm prose-invert max-w-none">
        {answer.split("\n").map((paragraph, i) =>
          paragraph.trim() ? (
            <p key={i} className="text-sm text-zinc-300 leading-relaxed mb-3 last:mb-0">
              {paragraph}
            </p>
          ) : (
            <br key={i} />
          )
        )}
      </div>
    </motion.div>
  );
}
