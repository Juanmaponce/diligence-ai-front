"use client";

import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Skull,
} from "lucide-react";
import type { RiskLevel } from "@/types/api";
import { RISK_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Skull,
} as const;

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "lg";
}

const FALLBACK_CONFIG = {
  label: "Unknown Risk",
  color: "text-zinc-400",
  bg: "bg-zinc-500/10",
  border: "border-zinc-500/30",
  icon: "AlertTriangle" as keyof typeof ICONS,
};

export function RiskBadge({ level, size = "lg" }: RiskBadgeProps) {
  const config = RISK_CONFIG[level] ?? FALLBACK_CONFIG;
  const Icon = ICONS[config.icon as keyof typeof ICONS] ?? AlertTriangle;

  if (size === "sm") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
          config.color,
          config.bg,
          config.border
        )}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-3 rounded-2xl border-2 px-8 py-6",
        config.bg,
        config.border
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2",
          config.bg,
          config.border
        )}
      >
        <Icon className={cn("h-7 w-7", config.color)} />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Risk Level
        </p>
        <p className={cn("text-2xl font-bold", config.color)}>
          {config.label}
        </p>
      </div>
    </div>
  );
}
