import type { CourseData } from "./types";
import { hasGuarantee } from "./utils";

export default function FinalCTASection({ data }: { data: CourseData }) {
  const guarantee = hasGuarantee(data.bonus);

  return (
    <section className="bg-zinc-950 py-28">

      {/* Full-width accent bar at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-28" />

      <div className="max-w-3xl mx-auto px-6 text-center">

        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-6">
          C&apos;est le moment
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6">
          {data.transformation}
        </h2>

        <p className="text-zinc-400 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
          Des centaines d&apos;étudiants ont déjà fait le choix de se former avec{" "}
          <span className="text-zinc-200 font-semibold">{data.title}</span>.{" "}
          C&apos;est ton tour.
        </p>

        <p className="text-zinc-600 text-sm mb-12">
          La seule différence entre là où tu es et là où tu veux être, c&apos;est{" "}
          <span className="text-zinc-400">la décision que tu prends aujourd&apos;hui.</span>
        </p>

        <button className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-12 py-5 rounded-full text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Je commence maintenant — {data.price}
        </button>

        <p className="text-zinc-600 text-xs mt-5">
          Accès immédiat · Paiement sécurisé
          {guarantee && " · Satisfait ou remboursé 30 jours"}
        </p>

      </div>
    </section>
  );
}
