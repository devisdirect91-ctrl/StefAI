"use client";

import { useState, useRef } from "react";
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
  isUpload?: boolean;
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
  {
    key: "coverImage",
    question: "Tu as une image pour ta formation ?",
    placeholder: "",
    hint: "Optionnel — une photo ou un visuel qui représente ta formation. Elle sera affichée dans l'en-tête de la page.",
    optional: true,
    isUpload: true,
  },
];

// ── Image resize helper ───────────────────────────────────────────────────────

function resizeToBase64(file: File, maxPx = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxPx || height > maxPx) {
          if (width > height) {
            height = Math.round((height * maxPx) / width);
            width = maxPx;
          } else {
            width = Math.round((width * maxPx) / height);
            height = maxPx;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

// ── Upload zone ───────────────────────────────────────────────────────────────

function UploadZone({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const process = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Seules les images sont acceptées (JPG, PNG, WebP…)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 10 Mo.");
      return;
    }
    const b64 = await resizeToBase64(file);
    onChange(b64);
  };

  const onFiles = (files: FileList | null) => {
    if (files && files[0]) process(files[0]);
  };

  if (value) {
    return (
      <div className="relative w-full max-w-sm">
        <img
          src={value}
          alt="Aperçu"
          className="w-full rounded-2xl border border-zinc-700 shadow-lg object-cover max-h-56"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
          aria-label="Supprimer l'image"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <p className="mt-2.5 text-xs text-zinc-500">Image sélectionnée — clique sur ✕ pour en choisir une autre.</p>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); onFiles(e.dataTransfer.files); }}
        className={`w-full border-2 border-dashed rounded-2xl px-6 py-10 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-indigo-500 bg-indigo-500/5"
            : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/40"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <p className="text-sm text-zinc-300 font-medium">Clique pour choisir une image</p>
        <p className="text-xs text-zinc-600 mt-1">ou glisse-dépose ici · JPG, PNG, WebP · max 10 Mo</p>
      </div>
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
    </div>
  );
}

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
    coverImage: "",
  });

  const current = STEPS[step];
  const value = (answers[current.key] ?? "") as string;
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const canContinue = !!(current.optional || value.trim());
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
        {current.isUpload ? (
          <UploadZone
            value={value}
            onChange={(v) => setAnswers((a) => ({ ...a, [current.key]: v }))}
          />
        ) : current.multiline ? (
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
        {!current.multiline && !current.isUpload && canContinue && !isLast && (
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
