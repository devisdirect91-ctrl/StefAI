"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { label: "Analyzing your product" },
  { label: "Writing the hero section" },
  { label: "Generating benefits" },
  { label: "Creating testimonials" },
  { label: "Calculating ideal pricing" },
  { label: "Optimizing for conversion" },
  { label: "Finalizing your page" },
];

const NORMAL_MS = 1200;
const FAST_MS = 110;
const CLOSE_MS = 700;

type Props = {
  done: boolean;
  onFinished: () => void;
};

export default function GeneratingOverlay({ done, onFinished }: Props) {
  const [step, setStep] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  useEffect(() => {
    if (done || step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), NORMAL_MS);
    return () => clearTimeout(t);
  }, [step, done]);

  useEffect(() => {
    if (!done) return;

    if (step < STEPS.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), FAST_MS);
      return () => clearTimeout(t);
    }

    setAllDone(true);
    const t = setTimeout(() => onFinishedRef.current(), CLOSE_MS);
    return () => clearTimeout(t);
  }, [done, step]);

  const progress = allDone
    ? 100
    : Math.round(((step + 0.9) / STEPS.length) * (done ? 100 : 95));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-10 w-full max-w-md mx-4 shadow-2xl shadow-black/60">

        {/* Spinner / check */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />

            {allDone ? (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"
                  style={{ animationDuration: done ? "0.4s" : "1s" }}
                />
                <div
                  className="absolute inset-[5px] rounded-full border-2 border-transparent border-t-indigo-400/50 animate-spin"
                  style={{
                    animationDuration: done ? "0.6s" : "1.6s",
                    animationDirection: "reverse",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-400 tabular-nums">{progress}%</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-zinc-100 text-lg font-bold text-center mb-1">
          {allDone ? "Your page is ready" : "Generating your page"}
        </h2>
        <p className="text-zinc-500 text-sm text-center mb-7">
          {allDone
            ? "Your landing page has been generated successfully."
            : "AI is building your landing page..."}
        </p>

        {/* Steps */}
        <div className="space-y-2.5 mb-7">
          {STEPS.map((s, i) => {
            const isDone = i < step || allDone;
            const isActive = i === step && !allDone;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isDone || isActive ? "opacity-100" : "opacity-25"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-colors duration-200 ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {isDone ? (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : i + 1}
                </div>

                <span
                  className={`text-sm transition-colors duration-200 ${
                    isDone
                      ? "text-zinc-600 line-through"
                      : isActive
                      ? "text-zinc-100 font-medium"
                      : "text-zinc-600"
                  }`}
                >
                  {s.label}
                </span>

                {isActive && (
                  <span className="flex gap-[3px] ml-auto">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-600">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                allDone ? "bg-emerald-500" : "bg-indigo-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
