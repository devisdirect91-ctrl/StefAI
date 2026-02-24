import type { CourseData } from "./types";
import { parseBonus, parsePrice } from "./utils";

export default function BonusSection({ data }: { data: CourseData }) {
  const bonuses    = parseBonus(data.bonus);
  const price      = parsePrice(data.price);
  const isHighEnd  = price > 300;
  const estimated  = Math.round(price * 1.5);

  if (!bonuses.length) return null;

  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className="relative bg-zinc-900 border border-indigo-500/20 rounded-3xl overflow-hidden p-10 md:p-14">

          {/* Subtle corner glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header row */}
          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
                Inclus dans la formation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Tout ce que tu reçois
              </h2>
            </div>

            {isHighEnd && (
              <div className="shrink-0 bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-5 text-center">
                <p className="text-xs text-zinc-500 mb-1">Valeur estimée</p>
                <p className="text-3xl font-bold text-white">{estimated} €</p>
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  Ton investissement : {data.price}
                </p>
              </div>
            )}
          </div>

          {/* Bonus items grid */}
          <div className="relative grid md:grid-cols-2 gap-3">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-zinc-950/60 border border-zinc-800 rounded-xl p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke="rgb(129 140 248)"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-300 leading-snug">{bonus}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
