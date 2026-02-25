import type { CourseAIContent } from "./types";

export default function TransformationSection({ data }: { data: CourseAIContent }) {
  const { title, benefits } = data.transformation_section;

  return (
    <section className="bg-zinc-900 py-6 md:py-10">
      <div className="max-w-2xl mx-auto px-5">

        <div className="text-center mb-6">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            La transformation
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug">
            {title}
          </h2>
        </div>

        <ul className="space-y-2.5">
          {benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-zinc-800 border border-zinc-700/50 rounded-xl px-4 py-3.5"
            >
              <svg
                className="shrink-0 mt-0.5 text-emerald-400"
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-sm text-zinc-300 leading-relaxed">{benefit}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
