import type { CourseAIContent } from "./course-template/types";
import type { LandingTheme } from "@/types/landing";
import HeroSection           from "./course-template/HeroSection";
import TransformationSection from "./course-template/TransformationSection";
import ModulesSection        from "./course-template/ModulesSection";
import TestimonialsSection   from "./course-template/TestimonialsSection";
import PricingSection        from "./course-template/PricingSection";
import FAQSection            from "./course-template/FAQSection";
import StickyBundle          from "./course-template/StickyBundle";
import FinalCTASection       from "./course-template/FinalCTASection";

export type { CourseAIContent };

// Override --color-indigo-* variables to remap the accent palette.
// Tailwind v4 generates bg-indigo-600 as background-color: var(--color-indigo-600),
// so CSS custom property cascading applies the change to all child elements.
const PALETTE_VARS: Record<string, Record<string, string>> = {
  indigo:  {},
  violet:  { "--color-indigo-300": "#c4b5fd", "--color-indigo-400": "#a78bfa", "--color-indigo-500": "#8b5cf6", "--color-indigo-600": "#7c3aed" },
  emerald: { "--color-indigo-300": "#6ee7b7", "--color-indigo-400": "#34d399", "--color-indigo-500": "#10b981", "--color-indigo-600": "#059669" },
  rose:    { "--color-indigo-300": "#fda4af", "--color-indigo-400": "#fb7185", "--color-indigo-500": "#f43f5e", "--color-indigo-600": "#e11d48" },
  amber:   { "--color-indigo-300": "#fcd34d", "--color-indigo-400": "#fbbf24", "--color-indigo-500": "#f59e0b", "--color-indigo-600": "#d97706" },
  slate:   { "--color-indigo-300": "#cbd5e1", "--color-indigo-400": "#94a3b8", "--color-indigo-500": "#64748b", "--color-indigo-600": "#475569" },
  custom:  {},
};

export default function CourseLandingTemplate({ data, theme }: { data: CourseAIContent; theme?: LandingTheme }) {
  const paletteVars = theme ? (PALETTE_VARS[theme.palette] ?? {}) : {};
  const fontClass   = theme?.fontStyle === "serif" ? "font-serif" : theme?.fontStyle === "mono" ? "font-mono" : "";

  return (
    <div className={`antialiased ${fontClass}`} style={paletteVars as React.CSSProperties}>
      <StickyBundle          data={data} />
      <HeroSection           data={data} />
      <TransformationSection data={data} />
      <ModulesSection        data={data} />
      <TestimonialsSection   data={data} />
      <PricingSection        data={data} />
      <FAQSection            data={data} />
      <FinalCTASection       data={data} />
    </div>
  );
}
