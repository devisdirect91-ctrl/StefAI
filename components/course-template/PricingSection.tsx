import type { CourseData } from "./types";
import { parsePrice, hasGuarantee, truncate } from "./utils";

function buildFeatures(data: CourseData): string[] {
  const base = [
    "Accès immédiat à toutes les leçons",
    "Accès à vie — sans date d'expiration",
    "Mises à jour incluses gratuitement",
    "Exercices pratiques à chaque module",
  ];

  if (data.bonus?.trim()) {
    base.push("Tous les bonus inclus");
  }

  if (hasGuarantee(data.bonus)) {
    base.push("Garantie satisfait ou remboursé 30 jours");
  } else {
    base.push("Support par email inclus");
  }

  return base;
}

export default function PricingSection({ data }: { data: CourseData }) {
  const price         = parsePrice(data.price);
  const isAccessible  = price <= 100;
  const guarantee     = hasGuarantee(data.bonus);
  const features      = buildFeatures(data);
  const transformShort = truncate(data.transformation, 55);

  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Tarif
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            {isAccessible
              ? "Un investissement accessible"
              : `Investi dans ${transformShort.toLowerCase()}`}
          </h2>
        </div>

        {/* Pricing card */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden">

          {/* Price band */}
          <div className="bg-indigo-600/10 border-b border-zinc-800 px-8 py-8 text-center">
            <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-1">
              {data.price}
            </div>
            <p className="text-zinc-500 text-sm">paiement unique · accès à vie</p>
          </div>

          {/* Features + CTA */}
          <div className="px-8 py-8">
            <ul className="space-y-3.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                  <svg
                    className="shrink-0"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="rgb(99 102 241)"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20">
              Je commence maintenant — {data.price}
            </button>

            {guarantee && (
              <p className="text-center text-xs text-zinc-500 mt-4">
                Satisfait ou remboursé 30 jours · Sans condition · Sans question
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
