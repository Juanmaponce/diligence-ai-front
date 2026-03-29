"use client";

import { Textarea } from "@/components/ui/textarea";

interface RawTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TEXT_MAX_LENGTH = 500_000;

export function RawTextInput({ value, onChange }: RawTextInputProps) {
  const atLimit = value.length >= TEXT_MAX_LENGTH;
  return (
    <div className="space-y-1.5">
      <Textarea
        placeholder="Paste financial document content here — earnings reports, balance sheets, contracts..."
        className="min-h-[160px] resize-y bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-xs leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={TEXT_MAX_LENGTH}
      />
      <p className={`text-right text-xs ${atLimit ? "text-red-400" : "text-zinc-600"}`}>
        {value.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} characters
      </p>
    </div>
  );
}
