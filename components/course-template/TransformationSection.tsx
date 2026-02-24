import type { CourseAIContent } from "./types";

export default function TransformationSection({ data }: { data: CourseAIContent }) {
  const { title, benefits } = data.transformation_section;

  return (
    <section className="bg-zinc-900 py-14 md:py-24">
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-9 md:mb-14">
          <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">
            La transformation
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            {title}
          </h2>
        </div>

        {/* Benefits — single col mobile, 2-col sm+ */}
        <ul className="grid sm:grid-cols-2 gap-2.5">
          {benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700/60 rounded-xl px-4 py-3.5"
            >
              {/* Check */}
              <svg
                className="shrink-0 mt-0.5"
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="rgb(52 211 153)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-zinc-300 text-[0.88rem] leading-relaxed">{benefit}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
