"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { isHealthy, isLoading } = useHealthCheck();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <BrainCircuit className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-zinc-100">
            Diligence <span className="text-blue-400">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                isLoading
                  ? "bg-zinc-500 animate-pulse"
                  : isHealthy
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            />
            <span>
              {isLoading ? "Connecting..." : isHealthy ? "API Online" : "API Offline"}
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-800" />

          <Link
            href="/analyze"
            className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-400 transition-colors"
          >
            Start Analysis
          </Link>
        </div>
      </div>
    </header>
  );
}
