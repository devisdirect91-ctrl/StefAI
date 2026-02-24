import type { CourseAIContent } from "./types";

function CheckIcon() {
  return (
    <svg
      className="shrink-0 mt-0.5"
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="rgb(52 211 153)" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function TransformationSection({ data }: { data: CourseAIContent }) {
  const { title, benefits } = data.transformation_section;

  return (
    <section className="bg-zinc-950 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            La transformation
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug max-w-3xl mx-auto">
            {title}
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4"
            >
              <CheckIcon />
              <p className="text-zinc-300 text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
