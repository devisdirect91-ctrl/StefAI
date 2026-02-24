"use client";

import { useState } from "react";
import type { CourseData } from "./course-template/types";

// Re-export so existing imports keep working
export type CourseAnswers = CourseData;

type Step = {
  key: keyof CourseData;
  question: string;
  placeholder: string;
  hint: string;
  multiline?: boolean;
  optional?: boolean;
};

// ── Steps ────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    key: "title",
    question: "Quel est le nom de ta formation ?",
    placeholder: "ex. Maîtriser Figma en 30 jours",
    hint: "Le nom exact qui apparaîtra sur ta landing page.",
  },
  {
    key: "transformation",
    question: "Quelle transformation concrète ton élève obtiendra-t-il ?",
    placeholder:
      "ex. Passer de zéro à designer freelance capable de facturer 3 000 €/mois en 60 jours",
    hint:
      "Le résultat concret après avoir suivi la formation — sois précis et ambitieux.",
    multiline: true,
  },
  {
    key: "modules",
    question: "Quels sont les modules principaux ?",
    placeholder:
      "Module 1 – Les fondamentaux\nModule 2 – Maîtriser les outils\nModule 3 – Visuels qui convertissent\n...",
    hint: "Liste les grands chapitres, un par ligne. Nommage libre.",
    multiline: true,
  },
  {
    key: "price",
    question: "Quel est le prix de la formation ?",
    placeholder: "ex. 297 € ou 3 × 99 €",
    hint: "Le prix affiché sur la landing page (unique, mensuel ou échelonné).",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

type Props = {
  onComplete: (answers: CourseData) => void;
  loading: boolean;
};

export default function CourseWizard({ onComplete, loading }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CourseData>({
    title: "",
    transformation: "",
    modules: "",
    price: "",
  });

  const current = STEPS[step];
  const value = answers[current.key];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const canContinue = !!(current.optional || (value ?? "").trim());
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (!canContinue || loading) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !current.multiline && canContinue) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="max-w-2xl">

      {/* ── Progress header ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Question {step + 1} / {STEPS.length}
          </span>

          {/* Step dots */}
          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < step
                    ? "w-2 h-2 bg-indigo-500"
                    : i === step
                    ? "w-2.5 h-2.5 bg-indigo-400"
                    : "w-2 h-2 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── Question (keyed to re-trigger animation) ── */}
      <div key={step} className="mb-8 animate-fade-up">
        <h2 className="text-2xl font-bold text-zinc-100 leading-snug mb-1.5">
          {current.question}
          {current.optional && (
            <span className="ml-2 text-sm font-normal text-zinc-600">
              (optionnel)
            </span>
          )}
        </h2>
        <p className="text-sm text-zinc-500">{current.hint}</p>
      </div>

      {/* ── Input (keyed so autoFocus fires on each step) ── */}
      <div className="mb-8" key={`input-${step}`}>
        {current.multiline ? (
          <textarea
            value={value}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, [current.key]: e.target.value }))
            }
            placeholder={current.placeholder}
            rows={current.key === "modules" ? 5 : 3}
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors resize-none leading-relaxed"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, [current.key]: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            placeholder={current.placeholder}
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
            autoFocus
          />
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center gap-3">
        {!isFirst && (
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={loading}
            className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 px-5 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!canContinue || loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
        >
          {isLast ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {loading ? "Génération en cours…" : "Générer ma page"}
            </>
          ) : (
            <>
              Continuer
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        {/* Enter hint for single-line inputs */}
        {!current.multiline && canContinue && !isLast && (
          <span className="text-xs text-zinc-600">
            ou{" "}
            <kbd className="font-mono bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 text-[10px]">
              Enter
            </kbd>
          </span>
        )}
      </div>
    </div>
  );
}
