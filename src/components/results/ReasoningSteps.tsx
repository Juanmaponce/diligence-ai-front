"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReasoningStep } from "@/types/api";
import { Brain, Zap, Eye } from "lucide-react";

interface ReasoningStepsProps {
  steps: ReasoningStep[];
}

export function ReasoningSteps({ steps }: ReasoningStepsProps) {
  return (
    <div className="space-y-2">
      <Accordion type="single" collapsible className="space-y-2">
        {steps.map((step, index) => (
          <AccordionItem
            key={index}
            value={`step-${step.step_number}`}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-0 overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                  {step.step_number}
                </span>
                <span className="text-xs font-medium text-zinc-400">
                  Reasoning step {step.step_number}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3 pt-2">
                {/* Thought */}
                {step.thought && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-purple-400" />
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                        Thought
                      </span>
                    </div>
                    <p className="text-xs italic text-zinc-400 leading-relaxed pl-5">
                      {step.thought}
                    </p>
                  </div>
                )}

                {/* Action */}
                {step.action && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                        Action
                      </span>
                    </div>
                    <code className="block rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 leading-relaxed pl-5 font-mono">
                      {step.action}
                    </code>
                  </div>
                )}

                {/* Observation */}
                {step.observation && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                        Observation
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed pl-5">
                      {step.observation}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
