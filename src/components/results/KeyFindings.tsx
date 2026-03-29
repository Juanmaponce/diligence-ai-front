"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface KeyFindingsProps {
  findings: string[];
}

export function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="space-y-2">
      {findings.map((finding, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 hover:border-zinc-700 transition-colors"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-sm text-zinc-300 leading-relaxed">{finding}</p>
        </motion.div>
      ))}
    </div>
  );
}
