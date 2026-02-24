import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function BonusSection({ data }: { data: CourseAIContent }) {
  if (!data.bonus_section.description?.trim()) return null;

  const price     = parsePrice(data.pricing_section.price);
  const isHighEnd = price > 300;
  const estimated = Math.round(price * 1.5);

  return (
    <section className="bg-zinc-950 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">

        <div className="relative bg-zinc-900 border border-indigo-500/20 rounded-3xl overflow-hidden p-10 md:p-14">

          {/* Subtle corner glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header row */}
          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
                Inclus dans la formation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {data.bonus_section.title}
              </h2>
            </div>

            {isHighEnd && (
              <div className="shrink-0 bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-5 text-center">
                <p className="text-xs text-zinc-500 mb-1">Valeur estimée</p>
                <p className="text-3xl font-bold text-white">{estimated} €</p>
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  Ton investissement : {data.pricing_section.price}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="relative text-zinc-300 text-sm leading-relaxed max-w-2xl">
            {data.bonus_section.description}
          </p>

        </div>
      </div>
    </section>
  );
}
