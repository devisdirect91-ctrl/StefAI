import type { CourseAIContent } from "./types";

export default function PricingSection({ data }: { data: CourseAIContent }) {
  const ps  = data.pricing_section;
  const cta = data.hero.cta;

  return (
    <section className="bg-zinc-950 py-16 md:py-24">
      <div className="max-w-sm mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Tarif
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            {ps.headline}
          </h2>
        </div>

        {/* Pricing card */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden">

          {/* Price band */}
          <div className="bg-indigo-600/10 border-b border-zinc-800 px-8 py-8 text-center">
            <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-1">
              {ps.price}
            </div>
            <p className="text-zinc-500 text-sm">paiement unique · accès à vie</p>
          </div>

          {/* CTA + justification */}
          <div className="px-8 py-8">
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20">
              {cta} — {ps.price}
            </button>

            {ps.justification && (
              <p className="text-center text-xs text-zinc-500 mt-4 leading-relaxed">
                {ps.justification}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
