"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { WizardShell } from "@/components/wizard/WizardShell";
import { StepUpload } from "@/components/wizard/StepUpload";
import { StepQuery } from "@/components/wizard/StepQuery";
import { StepResults } from "@/components/wizard/StepResults";
import type { UploadedDocument, AnalyzeResponse } from "@/types/api";

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [lastQuery, setLastQuery] = useState<string>("");

  function handleDocumentUploaded(doc: UploadedDocument) {
    setUploadedDocuments((prev) => {
      const exists = prev.find((d) => d.doc_id === doc.doc_id);
      if (exists) return prev.map((d) => (d.doc_id === doc.doc_id ? doc : d));
      return [...prev, doc];
    });
  }

  function handleAnalysisComplete(result: AnalyzeResponse, query: string) {
    setAnalysisResult(result);
    setLastQuery(query);
    setCurrentStep(3);
  }

  function handleReset() {
    setCurrentStep(1);
    setUploadedDocuments([]);
    setAnalysisResult(null);
    setLastQuery("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Header />
      <main className="flex flex-1 flex-col px-4 py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-semibold text-zinc-100">
              Due Diligence Analysis
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Upload documents, run your query, and review the AI-generated risk assessment.
            </p>
          </div>

          <WizardShell currentStep={currentStep}>
            {currentStep === 1 && (
              <StepUpload
                onDocumentUploaded={handleDocumentUploaded}
                uploadedDocuments={uploadedDocuments}
                onNext={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <StepQuery
                uploadedDocuments={uploadedDocuments}
                onBack={() => setCurrentStep(1)}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}
            {currentStep === 3 && analysisResult && (
              <StepResults
                result={analysisResult}
                query={lastQuery}
                onNewAnalysis={handleReset}
              />
            )}
          </WizardShell>
        </div>
      </main>
    </div>
  );
}
