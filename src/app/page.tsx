import Link from "next/link";
import { Header } from "@/components/layout/Header";
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Shield,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered Due Diligence
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Financial due diligence{" "}
            <span className="text-blue-400">reimagined</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg">
            Upload financial documents, ask questions, and get structured risk
            analysis powered by an autonomous ReAct agent. Built for investors
            and analysts who move fast.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              Start Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-zinc-600">
              No account required · Free to use
            </span>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-800 bg-zinc-900/50 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <FileSearch className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-100">
                  Document Ingestion
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Upload PDFs, Excel files, or paste raw text. Supports
                  financial statements, audit reports, and contracts.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <BrainCircuit className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-100">
                  ReAct Agent Analysis
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  An autonomous agent reasons step-by-step through your
                  documents, surfacing insights you might miss.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-100">
                  Structured Risk Output
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Risk level, key findings, reasoning chain, and source
                  citations — all in a clean, actionable report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 px-4 py-16 text-center">
          <div className="mx-auto max-w-lg">
            <Zap className="mx-auto mb-4 h-8 w-8 text-blue-400" />
            <h2 className="mb-3 text-2xl font-bold text-zinc-50">
              Ready to start?
            </h2>
            <p className="mb-8 text-sm text-zinc-500">
              Upload your first document and get a risk assessment in under a
              minute.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              Open Diligence AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 px-4 py-6 text-center text-xs text-zinc-600">
        Diligence AI — Built with Next.js, FastAPI &amp; ReAct agents
      </footer>
    </div>
  );
}
