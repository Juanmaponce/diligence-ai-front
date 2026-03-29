"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const ACCEPTED_EXTENSIONS = ".pdf,.xls,.xlsx";

// Magic byte signatures for allowed file types
async function validateMagicBytes(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 8).arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // PDF: %PDF (25 50 44 46)
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return true;
  }
  // XLSX / ZIP-based: PK (50 4B 03 04)
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return true;
  }
  // XLS / OLE2 compound document: D0 CF 11 E0 A1 B1 1A E1
  if (
    bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 && bytes[5] === 0xb1 && bytes[6] === 0x1a && bytes[7] === 0xe1
  ) {
    return true;
  }
  return false;
}

export function Dropzone({ onFileSelect, selectedFile, onClear }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    async (file: File) => {
      setError(null);
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Only PDF, XLS, and XLSX files are supported.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError("File must be under 50MB.");
        return;
      }
      const validBytes = await validateMagicBytes(file);
      if (!validBytes) {
        setError("File content does not match the expected format.");
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    e.target.value = "";
  };

  if (selectedFile) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-blue-500/30 bg-blue-500/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-blue-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-zinc-100">{selectedFile.name}</p>
            <p className="text-xs text-zinc-500">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Remove selected file"
          className="rounded-md p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200",
          isDragging
            ? "border-blue-500 bg-blue-500/5"
            : "border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => handleDrop(e)}
      >
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl border transition-colors",
          isDragging ? "border-blue-500/50 bg-blue-500/10" : "border-zinc-700 bg-zinc-800"
        )}>
          <Upload className={cn("h-5 w-5", isDragging ? "text-blue-400" : "text-zinc-500")} aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-300">
            Drop your file here, or{" "}
            <span className="text-blue-400">browse</span>
          </p>
          <p className="mt-1 text-xs text-zinc-600">PDF, XLS, XLSX — up to 50MB</p>
        </div>
        <input
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {error && (
        <p role="alert" className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
