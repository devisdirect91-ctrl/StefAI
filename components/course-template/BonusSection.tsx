import type { CourseAIContent } from "./types";
import { parsePrice } from "./utils";

export default function BonusSection({ data }: { data: CourseAIContent }) {
  if (!data.bonus_section.description?.trim()) return null;

  const price     = parsePrice(data.pricing_section.price);
  const isHighEnd = price > 300;
  const estimated = Math.round(price * 1.5);

  return (
    <section className="bg-zinc-900 py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-5">

        <div className="bg-zinc-800 border border-indigo-500/20 rounded-2xl p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-5">
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
                Inclus dans la formation
              </p>
              <h2 className="text-xl md:text-3xl font-bold text-white leading-snug">
                {data.bonus_section.title}
              </h2>
            </div>

            {isHighEnd && (
              <div className="shrink-0 self-start bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-zinc-500 mb-0.5">Valeur estimée</p>
                <p className="text-2xl font-bold text-white">{estimated} €</p>
                <p className="text-xs text-emerald-400 mt-1 font-medium">
                  Ton prix : {data.pricing_section.price}
                </p>
              </div>
            )}
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {data.bonus_section.description}
          </p>

        </div>
      </div>
    </section>
  );
}
