import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function HeroSection({ data }: { data: CourseAIContent }) {
  const price     = parsePrice(data.pricing_section.price);
  const isPremium = price > 200;

  return (
    <section className="relative bg-zinc-950 overflow-hidden py-12 md:py-20">

      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[380px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[260px] h-[180px] rounded-full bg-indigo-500/5 blur-2xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 text-center">

        {/* Top pill */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
          <span className="text-xs font-medium text-zinc-400 tracking-wide">
            {isPremium ? "Formation premium" : "Formation en ligne"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
          {data.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className="text-[0.95rem] text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">
          {data.hero.subheadline}
        </p>

        {/* CTA */}
        <div className="mb-8">
          <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold tracking-widest uppercase px-9 py-4 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5">
            Accéder à la formation
            <svg className="transition-transform group-hover:translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Social proof strip */}
        <div className="border-t border-zinc-800/60 pt-6 flex items-center justify-center gap-10 flex-wrap">
          {[
            { n: "3 800+", label: "étudiants" },
            { n: "4.9 / 5", label: "satisfaction" },
            { n: "Accès à vie", label: "sans expiration" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-bold text-zinc-200">{n}</span>
              <span className="text-[11px] text-zinc-600 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
