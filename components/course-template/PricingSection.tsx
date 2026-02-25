import type { CourseAIContent } from "./types";

export default function PricingSection({ data }: { data: CourseAIContent }) {
  const ps  = data.pricing_section;
  const cta = data.hero.cta;

  return (
    <section className="bg-zinc-950 py-6 md:py-10">
      <div className="max-w-sm mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
            Tarif
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {ps.headline}
          </h2>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden">

          {/* Price band */}
          <div className="bg-indigo-600/8 border-b border-zinc-800 px-6 py-7 text-center">
            <div className="text-5xl font-bold text-white tracking-tight mb-1">
              {ps.price}
            </div>
            <p className="text-zinc-500 text-[13px]">paiement unique · accès à vie</p>
          </div>

          {/* CTA */}
          <div className="px-6 py-6">
            <button className="group w-full inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold tracking-widest uppercase py-[14px] rounded-xl text-xs transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25">
              Accéder à la formation
              <svg className="transition-transform group-hover:translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {ps.justification && (
              <p className="text-center text-[12px] text-zinc-500 mt-4 leading-relaxed">
                {ps.justification}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
