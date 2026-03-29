"use client";

import { useState, useId } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/upload/Dropzone";
import { RawTextInput } from "@/components/upload/RawTextInput";
import { MetadataForm } from "@/components/upload/MetadataForm";
import { UploadStatus } from "@/components/upload/UploadStatus";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import { useIngestText } from "@/hooks/useIngestText";
import type { DocumentMetadata, UploadedDocument } from "@/types/api";
import { FileText, Type, ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepUploadProps {
  onDocumentUploaded: (doc: UploadedDocument) => void;
  uploadedDocuments: UploadedDocument[];
  onNext: () => void;
}

type InputMode = "file" | "text";

export function StepUpload({
  onDocumentUploaded,
  uploadedDocuments,
  onNext,
}: StepUploadProps) {
  const reactId = useId();
  const [inputMode, setInputMode] = useState<InputMode>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  // useId() is stable between server and client — avoids hydration mismatch.
  // nanoid is only called in event handlers (resetForm) where it's always client-side.
  const [docId, setDocId] = useState(() => `doc-${reactId.replace(/[^a-z0-9]/gi, "")}`);
  const [metadata, setMetadata] = useState<DocumentMetadata>({});
  const [lastIndexed, setLastIndexed] = useState<UploadedDocument | null>(null);

  const uploadMutation = useUploadDocument({
    onSuccess: (doc) => {
      setLastIndexed(doc);
      onDocumentUploaded(doc);
      setSelectedFile(null);
      resetForm();
    },
  });

  const ingestMutation = useIngestText({
    onSuccess: (doc) => {
      setLastIndexed(doc);
      onDocumentUploaded(doc);
      setRawText("");
      resetForm();
    },
  });

  function resetForm() {
    setDocId(`doc-${nanoid(8)}`);
    setMetadata({});
  }

  function handleSubmit() {
    if (inputMode === "file" && selectedFile) {
      uploadMutation.mutate({ file: selectedFile, doc_id: docId, metadata });
    } else if (inputMode === "text" && rawText.trim()) {
      ingestMutation.mutate({ doc_id: docId, content: rawText, metadata });
    }
  }

  const isUploading = uploadMutation.isPending || ingestMutation.isPending;
  const uploadProgress = inputMode === "file" ? uploadMutation.uploadProgress : 0;
  const error = uploadMutation.error || ingestMutation.error;

  const canSubmit =
    !isUploading &&
    docId.trim() &&
    (inputMode === "file" ? !!selectedFile : rawText.trim().length > 0);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        {/* Mode toggle */}
        <div
          role="tablist"
          aria-label="Document input method"
          className="mb-6 flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1"
        >
          {(["file", "text"] as InputMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={inputMode === mode}
              onClick={() => setInputMode(mode)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                inputMode === mode
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {mode === "file" ? (
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Type className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {mode === "file" ? "Upload File" : "Paste Text"}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-5">
          {inputMode === "file" ? (
            <Dropzone
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              onClear={() => setSelectedFile(null)}
            />
          ) : (
            <RawTextInput value={rawText} onChange={setRawText} />
          )}

          {/* Metadata */}
          <div>
            <p className="mb-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Document Metadata
            </p>
            <MetadataForm
              docId={docId}
              onDocIdChange={setDocId}
              metadata={metadata}
              onMetadataChange={setMetadata}
            />
          </div>

          {/* Upload status */}
          <UploadStatus
            isPending={isUploading}
            progress={uploadProgress}
            indexedDoc={lastIndexed}
            error={error as Error | null}
          />

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white disabled:opacity-40"
          >
            {isUploading ? (
              "Indexing document..."
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Index Document
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Indexed docs list */}
      {uploadedDocuments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            {uploadedDocuments.length} document{uploadedDocuments.length !== 1 ? "s" : ""} indexed
          </p>
          {uploadedDocuments.map((doc) => (
            <div
              key={doc.doc_id}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5"
            >
              <FileText className="h-4 w-4 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-mono text-zinc-300">{doc.doc_id}</p>
                <p className="text-xs text-zinc-600">
                  {doc.metadata.company && `${doc.metadata.company} · `}
                  {doc.chunks_created} chunks · {doc.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Next */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={uploadedDocuments.length === 0}
          className="bg-blue-500 hover:bg-blue-400 text-white disabled:opacity-40"
        >
          Continue to Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
