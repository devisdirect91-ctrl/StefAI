import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function HeroSection({ data }: { data: CourseAIContent }) {
  const price     = parsePrice(data.pricing_section.price);
  const isPremium = price > 200;
  const hasBonus  = !!data.bonus_section.description?.trim();

  return (
    <section className="relative bg-zinc-950 overflow-hidden">

      {/* Glow — clipped to section, no overflow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="mt-[-80px] w-[480px] h-[320px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 py-12 md:py-28 text-center">

        {/* Badges */}
        {(isPremium || hasBonus) && (
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {isPremium && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Formation premium
              </span>
            )}
            {hasBonus && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Bonus inclus
              </span>
            )}
          </div>
        )}

        {/* Headline — 3xl on mobile, bigger on desktop */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          {data.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
          {data.hero.subheadline}
        </p>

        {/* Primary CTA — full-width on mobile */}
        <div className="mb-4">
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-500/10">
            {data.hero.cta} — {data.pricing_section.price}
          </button>
        </div>

        {/* Secondary — text link, doesn't compete with primary */}
        <button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4 mb-10 md:mb-12">
          Voir le programme ↓
        </button>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {[
            { n: "3 800+",   label: "étudiants" },
            { n: "4.9 / 5",  label: "satisfaction" },
            { n: "Accès vie", label: "à vie" },
          ].map(({ n, label }, i, arr) => (
            <div key={label} className="flex items-center gap-1.5 text-sm">
              {i > 0 && <span className="text-zinc-700 -ml-3 mr-3">·</span>}
              <span className="font-semibold text-zinc-300">{n}</span>
              <span className="text-zinc-500">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
