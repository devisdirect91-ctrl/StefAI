import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function BonusSection({ data }: { data: CourseAIContent }) {
  if (!data.bonus_section.description?.trim()) return null;

  const price     = parsePrice(data.pricing_section.price);
  const isHighEnd = price > 300;
  const estimated = Math.round(price * 1.5);

  return (
    <section className="bg-zinc-900 py-14 md:py-24">
      <div className="max-w-4xl mx-auto px-5">

        <div className="relative bg-zinc-800/60 border border-indigo-500/15 rounded-2xl overflow-hidden p-7 md:p-12">

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
            <div>
              <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-2">
                Inclus dans la formation
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                {data.bonus_section.title}
              </h2>
            </div>

            {isHighEnd && (
              <div className="shrink-0 self-start bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-center">
                <p className="text-[11px] text-zinc-500 mb-1">Valeur estimée</p>
                <p className="text-2xl font-bold text-white">{estimated} €</p>
                <p className="text-[11px] text-emerald-400 mt-1.5 font-medium">
                  Ton prix : {data.pricing_section.price}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="relative text-zinc-300 text-sm leading-relaxed">
            {data.bonus_section.description}
          </p>

        </div>
      </div>
    </section>
  );
}
