"use client";

import { useEffect, useState } from "react";
import { ANALYSIS_LOADING_TEXTS } from "@/lib/constants";
import { BrainCircuit } from "lucide-react";

export function AnalysisLoading() {
  const [elapsed, setElapsed] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotator = setInterval(() => {
      setTextIndex((i) => (i + 1) % ANALYSIS_LOADING_TEXTS.length);
    }, 2500);
    return () => clearInterval(rotator);
  }, []);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const elapsedStr = minutes > 0
    ? `${minutes}m ${seconds}s`
    : `${seconds}s`;

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Animated ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-blue-500/10" />
        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-blue-500/20" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/30 bg-zinc-900">
          <BrainCircuit className="h-7 w-7 text-blue-400" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-zinc-100">Analyzing documents...</p>
        <p className="text-xs text-zinc-500 min-h-[1rem] transition-all duration-500">
          {ANALYSIS_LOADING_TEXTS[textIndex]}
        </p>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="font-mono text-xs text-zinc-500">{elapsedStr}</span>
      </div>

      {/* Skeleton cards */}
      <div className="w-full max-w-md space-y-3">
        {[80, 60, 90, 50].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-zinc-800 animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}
