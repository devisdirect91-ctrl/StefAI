import type { ReactNode } from "react";
import type { CourseAIContent } from "./types";

// Fixed icons paired with bullet positions (up to 3)
const PAIN_ICONS: ReactNode[] = [
  <svg key="frustration" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(248 113 113)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>,
  <svg key="attempts" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251 146 60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.85" />
  </svg>,
  <svg key="danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(253 224 71)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>,
];

const PAIN_LABELS = ["La frustration", "Les tentatives échouées", "Si tu ne changes rien"];

export default function ProblemSection({ data }: { data: CourseAIContent }) {
  const bullets = data.problem_section.bullets.slice(0, 3);

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-red-400/80 uppercase tracking-[0.2em] mb-4">
            Le problème
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            {data.problem_section.title}
          </h2>
          <p className="text-zinc-500 text-sm mt-4 max-w-md mx-auto">
            Ce n&apos;est pas un problème de motivation. C&apos;est un problème de méthode.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {bullets.map((bullet, i) => (
            <div
              key={i}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-7 flex flex-col gap-5"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                {PAIN_ICONS[i]}
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  {PAIN_LABELS[i] ?? `Point ${i + 1}`}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">{bullet}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge */}
        <div className="mt-14 max-w-xl mx-auto text-center">
          <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-2xl px-7 py-5">
            <p className="text-zinc-300 text-sm leading-relaxed">
              Il ne te manque pas de volonté.{" "}
              <span className="text-white font-medium">
                Il te manque la bonne méthode, la bonne structure,
                et quelqu&apos;un qui t&apos;a déjà tracé le chemin.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
