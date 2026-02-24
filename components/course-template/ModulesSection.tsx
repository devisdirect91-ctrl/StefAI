"use client";

import { useState } from "react";
import type { CourseData } from "./types";
import type { ParsedModule } from "./types";
import { parseModules } from "./utils";

// ── Card layout (≤ 6 modules) ────────────────────────────────────────────────

function ModuleCard({ mod }: { mod: ParsedModule }) {
  return (
    <div className="group bg-zinc-950 border border-zinc-800 hover:border-indigo-500/30 rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-indigo-400 tabular-nums">
            {String(mod.number).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 text-sm mb-2 group-hover:text-white transition-colors">
            {mod.cleanTitle}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Concepts clés, exercices pratiques et résultats mesurables à la fin de ce module.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Accordion layout (> 6 modules) ───────────────────────────────────────────

function ModuleAccordion({ mod }: { mod: ParsedModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden transition-colors hover:border-zinc-700">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 hover:bg-zinc-800 transition-colors text-left gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold text-indigo-400 tabular-nums shrink-0">
            {String(mod.number).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-zinc-200 truncate">
            {mod.cleanTitle}
          </span>
        </div>
        <svg
          className={`shrink-0 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800">
          <p className="text-sm text-zinc-400 leading-relaxed">
            Concepts clés, exercices pratiques et résultats mesurables à la fin de ce module.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────

export default function ModulesSection({ data }: { data: CourseData }) {
  const modules      = parseModules(data.modules);
  const useAccordion = modules.length > 6;

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Le programme
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ce que tu vas apprendre
          </h2>
          <p className="text-zinc-500 text-sm">
            {modules.length} module{modules.length > 1 ? "s" : ""} pour une progression
            du débutant à l&apos;expert, sans jamais te perdre.
          </p>
        </div>

        {/* Grid or Accordion */}
        {useAccordion ? (
          <div className="max-w-2xl mx-auto space-y-2">
            {modules.map((mod) => (
              <ModuleAccordion key={mod.number} mod={mod} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <ModuleCard key={mod.number} mod={mod} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
