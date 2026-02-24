import type { CourseData } from "./types";
import { truncate } from "./utils";

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  stars: number;
  text: string;
};

function buildTestimonials(data: CourseData): Testimonial[] {
  const audience      = data.audience.split(/,|qui\s|et\s/)[0].trim();
  const transform     = truncate(data.transformation, 80).toLowerCase();

  return [
    {
      initials: "SM",
      name: "Sophie M.",
      role: audience,
      stars: 5,
      text: `Avant cette formation, je me reconnaissais exactement dans la description du problème. En suivant ${data.title} pas à pas, j'ai réussi à ${transform}. Résultats visibles en moins de 3 semaines.`,
    },
    {
      initials: "TL",
      name: "Thomas L.",
      role: "Ancien étudiant · Promo 2024",
      stars: 5,
      text: `J'avais essayé des dizaines de tutoriels gratuits sans jamais vraiment progresser. Cette formation m'a donné la structure qui manquait. La méthode est claire, progressive, et surtout — elle fonctionne vraiment.`,
    },
    {
      initials: "CR",
      name: "Camille R.",
      role: "Freelance · Recommande à 100 %",
      stars: 5,
      text: `Ce qui fait la différence ici, c'est l'approche orientée résultats. Zéro blabla, que des actions concrètes. En 30 jours, j'ai obtenu plus de progrès qu'en 6 mois à me débrouiller seul(e).`,
    },
  ];
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < count ? "rgb(251 191 36)" : "rgb(63 63 70)"}>
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ data }: { data: CourseData }) {
  const testimonials = buildTestimonials(data);

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Ils l&apos;ont fait
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ce que disent les étudiants
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-7 flex flex-col gap-5"
            >
              <Stars count={t.stars} />

              <p className="text-zinc-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-indigo-300">{t.initials}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
