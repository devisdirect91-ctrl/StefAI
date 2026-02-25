"use client";

import { useState } from "react";
import type { CourseAIContent } from "./types";

export default function FinalCTASection({ data, courseId }: { data: CourseAIContent; courseId?: string }) {
  const cta  = data.hero.cta;
  const ps   = data.pricing_section;
  const fcta = data.final_cta;
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    if (!courseId || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-zinc-900 py-8 md:py-12 relative overflow-hidden">

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 text-center">

        <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-5">
          C&apos;est le moment
        </p>

        <h2 className="text-[1.8rem] leading-[1.15] sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          {fcta.text}
        </h2>

        <p className="text-zinc-400 text-[0.95rem] md:text-lg leading-relaxed mb-7 max-w-xl mx-auto">
          {fcta.subtext}
        </p>

        {/* CTA — full-width on mobile */}
        <button onClick={handleBuy} disabled={loading} className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold tracking-widest uppercase px-10 py-4 md:py-5 rounded-2xl text-xs transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/25 disabled:opacity-70">
          {loading ? "Chargement…" : "Accéder à la formation"}
          <svg className="transition-transform group-hover:translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <p className="text-zinc-600 text-[12px] mt-4">
          Accès immédiat · Paiement sécurisé
          {ps.justification ? ` · ${ps.justification}` : ""}
        </p>

      </div>
    </section>
  );
}
