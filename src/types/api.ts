export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  version?: string;
}

export interface DocumentMetadata {
  company?: string;
  year?: number;
  type?: string;
}

export interface IngestTextPayload {
  doc_id: string;
  content: string;
  metadata?: DocumentMetadata;
}

export interface IngestTextResponse {
  doc_id: string;
  chunks_created: number;
  message: string;
}

export interface UploadDocumentResponse {
  doc_id: string;
  chunks_created: number;
  filename: string;
  message: string;
}

export interface AnalyzePayload {
  query: string;
  doc_ids?: string[];
  max_reasoning_steps?: number;
}

export interface ReasoningStep {
  step_number: number;
  thought: string;
  action: string;
  observation: string;
}

export interface AnalyzeResponse {
  reasoning_steps: ReasoningStep[];
  final_answer: string;
  risk_level: RiskLevel;
  key_findings: string[];
  sources_used: string[];
}

export interface UploadedDocument {
  doc_id: string;
  filename?: string;
  source: "file" | "text";
  metadata: DocumentMetadata;
  chunks_created: number;
}
