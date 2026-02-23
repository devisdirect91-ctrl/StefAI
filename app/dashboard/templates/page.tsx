"use client";

import { useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";

const categories = ["All", ...Array.from(new Set(templates.map((t) => t.tag)))];

export default function TemplatesPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? templates : templates.filter((t) => t.tag === active);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Templates</h1>
        <p className="text-zinc-500 mt-1 text-sm">
          Pick a template to start generating your landing page
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-7">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
              active === cat
                ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/25"
                : "text-zinc-500 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="group relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all"
          >
            {/* Neutral preview */}
            <div className="h-44 relative overflow-hidden bg-zinc-800/40">
              <div className="absolute inset-3 rounded-xl border border-zinc-700/50 bg-zinc-900/80 p-3 flex flex-col gap-2">
                <div className="h-2 w-20 rounded-full bg-indigo-400/40" />
                <div className="h-1.5 w-28 rounded-full bg-zinc-600" />
                <div className="h-1.5 w-24 rounded-full bg-zinc-700" />
                <div className="mt-1 w-14 h-5 rounded-lg bg-indigo-600 flex items-center justify-center text-[9px] font-medium text-white">
                  Get Access
                </div>
                <div className="mt-auto grid grid-cols-3 gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg bg-zinc-800 p-1">
                      <div className="h-1 w-5 rounded-full bg-zinc-600 mb-0.5" />
                      <div className="h-0.5 w-4 rounded-full bg-zinc-700" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link
                  href={`/dashboard/create/${tpl.id}`}
                  className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-colors"
                >
                  Use this template
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-zinc-100">{tpl.name}</h3>
                <span className="text-[10px] font-medium text-indigo-400">
                  {tpl.tag}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-snug">{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
