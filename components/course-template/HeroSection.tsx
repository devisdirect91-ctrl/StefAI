import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function HeroSection({ data }: { data: CourseAIContent }) {
  const price     = parsePrice(data.pricing_section.price);
  const isPremium = price > 200;
  const hasBonus  = !!data.bonus_section.description?.trim();

  return (
    <section className="relative bg-zinc-950 overflow-hidden py-20 md:py-36">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 text-center">

        {/* Badges */}
        {(isPremium || hasBonus) && (
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {isPremium && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full tracking-wide">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Formation premium
              </span>
            )}
            {hasBonus && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full tracking-wide">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                Bonus inclus
              </span>
            )}
          </div>
        )}

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-white leading-[1.12] tracking-tight mb-5 md:mb-6">
          {data.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
          {data.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-12 md:mb-16">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/25">
            {data.hero.cta} — {data.pricing_section.price}
          </button>
          <button className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-7 py-4 rounded-full text-sm transition-all">
            Voir le programme
          </button>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            { n: "3 800+",    label: "étudiants" },
            { n: "4.9 / 5",   label: "note moyenne" },
            { n: "Accès vie", label: "à vie après achat" },
          ].map(({ n, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-300">{n}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
