"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/results/RiskBadge";
import { KeyFindings } from "@/components/results/KeyFindings";
import { FinalAnswer } from "@/components/results/FinalAnswer";
import { ReasoningSteps } from "@/components/results/ReasoningSteps";
import { SourcesBadges } from "@/components/results/SourcesBadges";
import type { AnalyzeResponse } from "@/types/api";
import { RotateCcw, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StepResultsProps {
  result: AnalyzeResponse;
  query: string;
  onNewAnalysis: () => void;
}

export function StepResults({ result, query, onNewAnalysis }: StepResultsProps) {
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header row: Risk badge + action */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <RiskBadge level={result.risk_level} />
        <Button
          variant="outline"
          onClick={onNewAnalysis}
          className="border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Final answer */}
      <FinalAnswer answer={result.final_answer} query={query} />

      {/* Key findings */}
      {result.key_findings.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key Findings ({result.key_findings.length})
          </h2>
          <KeyFindings findings={result.key_findings} />
        </section>
      )}

      {/* Sources */}
      {result.sources_used.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Sources Referenced
          </h2>
          <SourcesBadges sources={result.sources_used} />
        </section>
      )}

      {/* Reasoning steps (collapsible section) */}
      {result.reasoning_steps.length > 0 && (
        <section className="space-y-3">
          <button
            type="button"
            onClick={() => setShowReasoning(!showReasoning)}
            aria-expanded={showReasoning}
            aria-label={showReasoning ? "Hide agent reasoning" : "Show agent reasoning"}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 hover:border-zinc-700 transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Agent Reasoning ({result.reasoning_steps.length} steps)
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-4 w-4 text-zinc-600 transition-transform duration-200",
                showReasoning && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {showReasoning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ReasoningSteps steps={result.reasoning_steps} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </motion.div>
  );
}
