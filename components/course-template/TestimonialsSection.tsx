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
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="rgb(251 191 36)">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: CourseAITestimonial }) {
  const initials = getInitials(t.name);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-7 flex flex-col gap-5">
      <Stars />

      <p className="text-zinc-300 text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
        <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-indigo-300">{initials}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-200">{t.name}</p>
          <p className="text-xs text-zinc-500">{t.result}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ data }: { data: CourseAIContent }) {
  return (
    <section className="bg-zinc-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Ils l&apos;ont fait
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ce que disent les étudiants
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}
