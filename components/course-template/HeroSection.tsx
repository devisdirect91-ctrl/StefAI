import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function HeroSection({ data }: { data: CourseAIContent }) {
  const price     = parsePrice(data.pricing_section.price);
  const isPremium = price > 200;
  const hasBonus  = !!data.bonus_section.description?.trim();

  return (
    <section className="relative bg-zinc-950 overflow-hidden py-14 md:py-32">

      {/* Ambient glow — toned down on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[550px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 text-center">

        {/* Badges */}
        {(isPremium || hasBonus) && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {isPremium && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full tracking-wide">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Formation premium
              </span>
            )}
            {hasBonus && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full tracking-wide">
                Bonus inclus
              </span>
            )}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-[2.05rem] leading-[1.1] sm:text-[2.6rem] md:text-[3.4rem] font-bold text-white tracking-tight mb-4 md:mb-5">
          {data.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className="text-[0.95rem] md:text-lg text-zinc-400 leading-relaxed mb-9 md:mb-11 max-w-xl mx-auto">
          {data.hero.subheadline}
        </p>

        {/* CTAs — stacked full-width on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10 md:mb-14">
          <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-8 py-[14px] rounded-2xl text-[0.92rem] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20">
            {data.hero.cta} — {data.pricing_section.price}
          </button>
          <button className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-7 py-[14px] rounded-2xl text-[0.92rem] transition-all">
            Voir le programme
          </button>
        </div>

        {/* Social proof — compact row with separators */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { n: "3 800+",   label: "étudiants" },
            { n: "4.9 / 5",  label: "satisfaction" },
            { n: "Accès vie", label: "à vie" },
          ].map(({ n, label }, i) => (
            <div key={label} className="flex items-center gap-1 text-[13px]">
              {i > 0 && <span className="text-zinc-700 mr-4">·</span>}
              <span className="font-semibold text-zinc-300">{n}</span>
              <span className="text-zinc-500 ml-1">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
