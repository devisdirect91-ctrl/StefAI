import type { CourseAIContent } from "./types";

export default function FinalCTASection({ data }: { data: CourseAIContent }) {
  const cta  = data.hero.cta;
  const ps   = data.pricing_section;
  const fcta = data.final_cta;

  return (
    <section className="bg-zinc-950 py-20 md:py-28">

      {/* Full-width accent bar at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-20 md:mb-28" />

      <div className="max-w-3xl mx-auto px-5 text-center">

        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-6">
          C&apos;est le moment
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
          {fcta.text}
        </h2>

        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
          {fcta.subtext}
        </p>

        <button className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-5 rounded-full text-sm md:text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {cta} — {ps.price}
        </button>

        <p className="text-zinc-600 text-xs mt-5">
          Accès immédiat · Paiement sécurisé
          {ps.justification ? ` · ${ps.justification}` : ""}
        </p>

      </div>
    </section>
  );
}
