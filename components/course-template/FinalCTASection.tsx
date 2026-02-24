import type { CourseAIContent } from "./types";

export default function FinalCTASection({ data }: { data: CourseAIContent }) {
  const cta  = data.hero.cta;
  const ps   = data.pricing_section;
  const fcta = data.final_cta;

  return (
    <section className="bg-zinc-900 py-16 md:py-28 relative overflow-hidden">

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

        <p className="text-zinc-400 text-[0.95rem] md:text-lg leading-relaxed mb-9 md:mb-11 max-w-xl mx-auto">
          {fcta.subtext}
        </p>

        {/* CTA — full-width on mobile */}
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold px-10 py-4 md:py-5 rounded-2xl text-[0.92rem] md:text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/20">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {cta} — {ps.price}
        </button>

        <p className="text-zinc-600 text-[12px] mt-4">
          Accès immédiat · Paiement sécurisé
          {ps.justification ? ` · ${ps.justification}` : ""}
        </p>

      </div>
    </section>
  );
}
