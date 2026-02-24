import type { CourseAIContent, CourseAITestimonial } from "./types";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="rgb(251 191 36)">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: CourseAITestimonial }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col h-full">
      <Stars />
      <p className="text-sm text-zinc-300 leading-relaxed flex-1 mb-4">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
        <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-indigo-300">{getInitials(t.name)}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-200">{t.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t.result}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ data }: { data: CourseAIContent }) {
  return (
    <section className="bg-zinc-950 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8 px-5">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Ils l&apos;ont fait
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Ce que disent les étudiants
          </h2>
        </div>

        {/* Mobile: snap-scroll carousel — cards peeking to signal scrollability */}
        <div className="md:hidden overflow-x-auto scrollbar-none">
          <div className="flex gap-4 px-5 pb-2" style={{ width: "max-content" }}>
            {data.testimonials.map((t, i) => (
              <div key={i} className="w-72 shrink-0">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 px-5">
          {data.testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}
