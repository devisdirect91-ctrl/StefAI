"use client";

import { useState } from "react";
import type { CourseAIContent } from "./types";

export default function StickyBundle({ data, courseId }: { data: CourseAIContent; courseId?: string }) {
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
    <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-center">

        {/* Buy button */}
        <div className="relative">
          <span className="absolute inset-0 rounded-2xl bg-indigo-500/40 animate-ping" style={{ animationDuration: "2s" }} />
          <button onClick={handleBuy} disabled={loading} className="group relative inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold tracking-widest uppercase px-8 py-3 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:opacity-70">
            {loading ? "Chargement…" : "Acheter maintenant"}
            <svg
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
