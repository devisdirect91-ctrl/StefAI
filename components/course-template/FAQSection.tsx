"use client";

import { useState } from "react";
import type { CourseAIContent } from "./types";

type FAQItem = { question: string; answer: string };

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-[18px] text-left gap-5 min-h-[52px]"
      >
        <span className="text-[0.9rem] font-medium text-zinc-200 leading-snug">
          {item.question}
        </span>
        <div
          className={`shrink-0 w-6 h-6 rounded-full border transition-colors ${
            open ? "border-indigo-500 bg-indigo-500/10" : "border-zinc-700"
          } flex items-center justify-center`}
        >
          <svg
            className={`text-zinc-400 transition-transform duration-200 ${
              open ? "rotate-45 text-indigo-400" : ""
            }`}
            width="10" height="10" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="pb-5">
          <p className="text-[0.88rem] text-zinc-400 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ data }: { data: CourseAIContent }) {
  return (
    <section className="bg-zinc-950 py-6 md:py-10">
      <div className="max-w-2xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Questions fréquentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 md:px-7">
          {data.faq.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
