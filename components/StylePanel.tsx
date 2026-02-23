"use client";

import { useState } from "react";
import type { LandingTheme } from "@/types/landing";

type Props = {
  theme: LandingTheme;
  onChange: (theme: LandingTheme) => void;
};

const PALETTES: { label: string; value: LandingTheme["palette"]; hex: string }[] = [
  { label: "Indigo",  value: "indigo",  hex: "#4f46e5" },
  { label: "Blue",    value: "violet",  hex: "#7c3aed" },
  { label: "Emerald", value: "emerald", hex: "#059669" },
  { label: "Rose",    value: "rose",    hex: "#e11d48" },
  { label: "Orange",  value: "amber",   hex: "#f59e0b" },
];

const FONT_OPTIONS: { label: string; value: LandingTheme["fontStyle"] }[] = [
  { label: "Modern",  value: "sans"  },
  { label: "Tech",    value: "mono"  },
  { label: "Elegant", value: "serif" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 bg-zinc-800/60 p-1 rounded-xl border border-zinc-700/50">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            value === opt.value
              ? "bg-zinc-700 text-zinc-100 shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function StylePanel({ theme, onChange }: Props) {
  const [draft, setDraft] = useState<LandingTheme>(theme);

  function set<K extends keyof LandingTheme>(key: K, value: LandingTheme[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(theme);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-b-2xl p-5 space-y-6 w-full">

      {/* Palette */}
      <div>
        <SectionLabel>Color</SectionLabel>
        <div className="flex items-center gap-2.5">
          {PALETTES.map((p) => {
            const active = draft.palette === p.value;
            return (
              <button
                key={p.value}
                type="button"
                title={p.label}
                onClick={() => set("palette", p.value)}
                className="w-7 h-7 rounded-full transition-transform hover:scale-110 focus:outline-none"
                style={{
                  backgroundColor: p.hex,
                  outline: active ? `2px solid ${p.hex}` : "2px solid transparent",
                  outlineOffset: "3px",
                  transform: active ? "scale(1.15)" : undefined,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Mode */}
      <div>
        <SectionLabel>Mode</SectionLabel>
        <ToggleGroup
          options={[
            { label: "Light", value: "light" as const },
            { label: "Dark",  value: "dark"  as const },
          ]}
          value={draft.mode}
          onChange={(v) => set("mode", v)}
        />
      </div>

      {/* Radius */}
      <div>
        <SectionLabel>Radius</SectionLabel>
        <ToggleGroup
          options={[
            { label: "Medium", value: "md" as const },
            { label: "Large",  value: "lg" as const },
          ]}
          value={draft.radius}
          onChange={(v) => set("radius", v)}
        />
      </div>

      {/* Spacing */}
      <div>
        <SectionLabel>Spacing</SectionLabel>
        <ToggleGroup
          options={[
            { label: "Normal", value: "default" as const },
            { label: "Large",  value: "relaxed" as const },
          ]}
          value={draft.spacing}
          onChange={(v) => set("spacing", v)}
        />
      </div>

      {/* Font */}
      <div>
        <SectionLabel>Font</SectionLabel>
        <ToggleGroup
          options={FONT_OPTIONS}
          value={draft.fontStyle}
          onChange={(v) => set("fontStyle", v)}
        />
      </div>

      {/* Confirm */}
      <button
        type="button"
        disabled={!isDirty}
        onClick={() => onChange(draft)}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
          isDirty
            ? "bg-indigo-600 hover:bg-indigo-500 text-white"
            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>

    </div>
  );
}
