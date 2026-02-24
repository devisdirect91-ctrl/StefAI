"use client";

import { useState } from "react";
import type { CourseData } from "./types";
import { parsePrice, hasGuarantee } from "./utils";

type FAQItem = { q: string; a: string };

function buildFAQ(data: CourseData): FAQItem[] {
  const audience   = data.audience.split(/,|qui\s|et\s/)[0].trim().toLowerCase();
  const guarantee  = hasGuarantee(data.bonus);
  const price      = parsePrice(data.price);

  return [
    {
      q: "Est-ce adapté aux débutants ?",
      a: `Cette formation a été conçue spécialement pour ${audience}. Que tu partes de zéro ou que tu aies déjà quelques bases, le programme est structuré progressivement — tu avanceras à ton propre rythme, sans jamais te sentir perdu(e).`,
    },
    {
      q: "Combien de temps faut-il consacrer par semaine ?",
      a: `Compte environ 1 à 2 heures par jour selon ton emploi du temps. La formation est pensée pour des personnes occupées : les modules sont courts, actionnables, et tu verras des résultats concrets dès les premières semaines.`,
    },
    {
      q: guarantee ? "Quelle est la garantie de remboursement ?" : "Y a-t-il une politique de remboursement ?",
      a: guarantee
        ? `Oui. Si tu suis la formation et que tu n'obtiens pas de résultats, on te rembourse intégralement dans les 30 jours suivant ton achat — sans justification, sans question.`
        : `Ta satisfaction est notre priorité. Si tu rencontres un problème dans les 14 jours suivant ton achat, contacte-nous et nous trouverons une solution.`,
    },
    {
      q: "Comment accéder à la formation après l'achat ?",
      a: `Dès ta commande validée, tu reçois immédiatement un email avec tes accès. La formation est 100 % en ligne, accessible sur ordinateur, tablette ou mobile, à n'importe quelle heure du jour ou de la nuit.`,
    },
    {
      q: `Pourquoi investir ${data.price} dans cette formation ?`,
      a: `Compare cet investissement au coût de ne rien changer : rester bloqué(e) des mois de plus, perdre du temps sur des ressources gratuites éparpillées, ou rater des opportunités. ${data.title} te permet de ${data.transformation.toLowerCase()}. Le retour sur investissement est immédiat et mesurable.`,
    },
  ];
}

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-6"
      >
        <span className="text-sm font-medium text-zinc-200 leading-snug">
          {item.q}
        </span>
        <div className={`shrink-0 w-6 h-6 rounded-full border transition-colors ${open ? "border-indigo-500 bg-indigo-500/10" : "border-zinc-700"} flex items-center justify-center`}>
          <svg
            className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-45 text-indigo-400" : ""}`}
            width="10" height="10" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ data }: { data: CourseData }) {
  const faq = buildFAQ(data);

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Questions fréquentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl px-7 divide-zinc-800">
          {faq.map((item) => (
            <FAQItem key={item.q} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
