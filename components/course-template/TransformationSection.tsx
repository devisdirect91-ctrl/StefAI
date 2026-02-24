import type { CourseAIContent } from "./types";

function CheckIcon({ color = "rgb(52 211 153)" }: { color?: string }) {
  return (
    <svg
      className="shrink-0 mt-0.5"
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function TransformationSection({ data }: { data: CourseAIContent }) {
  // Use first 2 problem bullets for the "Avant" card
  const beforeItems = data.problem_section.bullets.slice(0, 2);

  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            La transformation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug max-w-3xl mx-auto">
            {data.transformation_section.title}
          </h2>
        </div>

        {/* Before / After */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-20">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Avant
              </span>
            </div>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <li key={i} className="text-zinc-400 text-sm leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-950/50 border border-indigo-500/25 rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Après
              </span>
            </div>
            <p className="text-zinc-100 text-sm leading-relaxed font-medium">
              {data.transformation_section.title}
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-6 text-center">
            Ce que tu vas accomplir
          </h3>
          <ul className="space-y-4">
            {data.transformation_section.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                <CheckIcon />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
