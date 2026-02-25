import type { CourseAIContent } from "./types";

export default function BundleSection({ data }: { data: CourseAIContent }) {
  const { modules, pricing_section } = data;

  return (
    <section className="bg-zinc-950 py-6 md:py-10">
      <div className="max-w-lg mx-auto px-5">

        <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-indigo-600/8 border-b border-zinc-800 px-6 py-6 text-center">
            <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-2">
              L&apos;offre complète
            </p>
            <h2 className="text-xl font-bold text-white leading-snug">
              {pricing_section.headline}
            </h2>
          </div>

          {/* Module list */}
          <div className="px-6 py-5 border-b border-zinc-800">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Ce que tu obtiens
            </p>
            <ul className="space-y-2.5">
              {modules.map((mod, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-zinc-300 leading-snug">{mod.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price + CTA */}
          <div className="px-6 py-6 text-center">

            {/* Price */}
            <div className="mb-1">
              <span className="text-5xl font-bold text-white tracking-tight">
                {pricing_section.price}
              </span>
            </div>
            <p className="text-[12px] text-zinc-500 mb-6">
              paiement unique · accès à vie
            </p>

            {/* Animated buy button */}
            <div className="relative inline-flex w-full justify-center">
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-2xl bg-indigo-500/30 animate-ping" style={{ animationDuration: "2s" }} />
              <button className="group relative w-full inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold tracking-widest uppercase px-9 py-4 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                Acheter maintenant
                <svg
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Justification */}
            {pricing_section.justification && (
              <p className="text-[11px] text-zinc-600 mt-4 leading-relaxed">
                {pricing_section.justification}
              </p>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
