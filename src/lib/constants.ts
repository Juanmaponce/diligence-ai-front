import type { RiskLevel } from "@/types/api";

export const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  low: {
    label: "Low Risk",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: "ShieldCheck",
  },
  medium: {
    label: "Medium Risk",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: "AlertTriangle",
  },
  high: {
    label: "High Risk",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    icon: "AlertOctagon",
  },
  critical: {
    label: "Critical Risk",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: "Skull",
  },
};

export const ANALYSIS_LOADING_TEXTS = [
  "Parsing financial documents...",
  "Identifying key entities...",
  "Evaluating risk factors...",
  "Cross-referencing sources...",
  "Analyzing financial ratios...",
  "Running due diligence checks...",
  "Synthesizing findings...",
  "Generating risk assessment...",
];

export const DOC_TYPES = [
  { value: "financial_statement", label: "Financial Statement" },
  { value: "annual_report", label: "Annual Report" },
  { value: "audit_report", label: "Audit Report" },
  { value: "contract", label: "Contract" },
  { value: "prospectus", label: "Prospectus" },
  { value: "other", label: "Other" },
];
