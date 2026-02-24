"use client";

import { useState } from "react";
import type { CourseAIContent, CourseAIModule } from "./types";

// ── Mobile-first module row (always used on mobile, grid card on desktop) ──────

function ModuleRow({ mod, index }: { mod: CourseAIModule; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 py-4 text-left"
      >
        {/* Number */}
        <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[11px] font-bold text-indigo-400 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>

        {/* Title */}
        <span className="flex-1 text-[0.9rem] font-medium text-zinc-200 leading-snug">
          {mod.title}
        </span>

        {/* Chevron */}
        <svg
          className={`shrink-0 text-zinc-600 transition-transform duration-200 ${open ? "rotate-180 text-indigo-400" : ""}`}
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="pb-4 pl-11 pr-1">
          <p className="text-[0.85rem] text-zinc-400 leading-relaxed mb-2">
            {mod.description}
          </p>
          {mod.outcome && (
            <p className="text-[0.82rem] text-indigo-400/80 leading-relaxed">
              → {mod.outcome}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Desktop card ───────────────────────────────────────────────────────────────

function ModuleCard({ mod, index }: { mod: CourseAIModule; index: number }) {
  return (
    <div className="group bg-zinc-950 border border-zinc-800 hover:border-indigo-500/25 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-indigo-400 tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 text-[0.88rem] mb-1.5 group-hover:text-white transition-colors leading-snug">
            {mod.title}
          </h3>
          <p className="text-[0.8rem] text-zinc-500 leading-relaxed">{mod.description}</p>
          {mod.outcome && (
            <p className="text-[0.78rem] text-indigo-400/75 mt-2 leading-relaxed">
              → {mod.outcome}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export default function ModulesSection({ data }: { data: CourseAIContent }) {
  const modules = data.modules;

  return (
    <section className="bg-zinc-950 py-14 md:py-24">
      <div className="max-w-4xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
            Le programme
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Ce que tu vas apprendre
          </h2>
          <p className="text-zinc-500 text-sm">
            {modules.length} module{modules.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Mobile: accordion list */}
        <div className="md:hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-5">
          {modules.map((mod, i) => (
            <ModuleRow key={i} mod={mod} index={i + 1} />
          ))}
        </div>

        {/* Desktop: 2-col card grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-3">
          {modules.map((mod, i) => (
            <ModuleCard key={i} mod={mod} index={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
