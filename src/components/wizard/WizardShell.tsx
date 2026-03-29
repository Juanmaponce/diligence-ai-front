"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { number: 1, label: "Upload Documents" },
  { number: 2, label: "Run Analysis" },
  { number: 3, label: "View Results" },
];

interface WizardShellProps {
  currentStep: 1 | 2 | 3;
  children: React.ReactNode;
}

export function WizardShell({ currentStep, children }: WizardShellProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Stepper */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-0">
          {STEPS.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step circle */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300",
                      isCompleted
                        ? "border-blue-500 bg-blue-500 text-white"
                        : isActive
                        ? "border-blue-500 bg-zinc-950 text-blue-400"
                        : "border-zinc-700 bg-zinc-950 text-zinc-600"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden text-xs font-medium sm:block transition-colors",
                      isActive
                        ? "text-zinc-100"
                        : isCompleted
                        ? "text-zinc-400"
                        : "text-zinc-600"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-3 mb-5 h-px w-16 sm:w-24 transition-colors duration-500",
                      step.number < currentStep ? "bg-blue-500" : "bg-zinc-800"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
