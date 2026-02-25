"use client";

import { useState } from "react";
import type { CourseAIContent, CourseAITestimonial } from "./types";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="rgb(251 191 36)">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: CourseAITestimonial }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 w-full">
      <Stars />
      <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-5 border-t border-zinc-800">
        <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-indigo-300">{getInitials(t.name)}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-200">{t.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t.result}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ data }: { data: CourseAIContent }) {
  const testimonials = data.testimonials;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-zinc-950 py-6 md:py-10">
      <div className="max-w-2xl mx-auto px-5">

        <div className="text-center mb-6">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Ils l&apos;ont fait
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Ce que disent les étudiants
          </h2>
        </div>

        {/* Card */}
        <TestimonialCard t={testimonials[current]} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">

          {/* Prev */}
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
            aria-label="Précédent"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-5 h-1.5 bg-indigo-500"
                    : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
            aria-label="Suivant"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
