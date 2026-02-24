"use client";

import { useState } from "react";
import type { CourseAIContent, CourseAIModule } from "./types";

function ModuleRow({ mod, index }: { mod: CourseAIModule; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-4 text-left min-h-[56px]"
      >
        <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[11px] font-bold text-indigo-400 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-medium text-zinc-200 leading-snug">
          {mod.title}
        </span>
        <svg
          className={`shrink-0 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180 text-indigo-400" : ""}`}
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="pb-4 pl-10 pr-2 -mt-1">
          <p className="text-sm text-zinc-400 leading-relaxed">{mod.description}</p>
          {mod.outcome && (
            <p className="text-xs text-indigo-400/80 mt-2 leading-relaxed">→ {mod.outcome}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ mod, index }: { mod: CourseAIModule; index: number }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 rounded-xl p-5 transition-all">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <span className="text-xs font-bold text-indigo-400 tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-100 leading-snug mb-1.5">
            {mod.title}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">{mod.description}</p>
          {mod.outcome && (
            <p className="text-xs text-indigo-400/75 mt-2 leading-relaxed">→ {mod.outcome}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ModulesSection({ data }: { data: CourseAIContent }) {
  const modules = data.modules;

  return (
    <section className="bg-zinc-950 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-5">

        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Le programme
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
            Ce que tu vas apprendre
          </h2>
          <p className="text-sm text-zinc-500">
            {modules.length} module{modules.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-4">
          {modules.map((mod, i) => (
            <ModuleRow key={i} mod={mod} index={i + 1} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-3">
          {modules.map((mod, i) => (
            <ModuleCard key={i} mod={mod} index={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
