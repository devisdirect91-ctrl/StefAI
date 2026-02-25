// Dedicated renderer for the "course-pro" template.
// Full e-learning landing page: Hero · Stats · Outcomes · Curriculum ·
// Instructor · Testimonials · Pricing · FAQ.
// Pure React, no client state — compatible with both server and client usage.

import type { LandingTheme } from "@/types/landing";

// ── Theme maps ────────────────────────────────────────────────────────────

const PALETTE_BTN: Record<string, string> = {
  indigo:  "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40",
  violet:  "bg-violet-600 hover:bg-violet-500 shadow-violet-900/40",
  emerald: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40",
  rose:    "bg-rose-600 hover:bg-rose-500 shadow-rose-900/40",
  amber:   "bg-amber-500 hover:bg-amber-400 shadow-amber-900/40",
  slate:   "bg-slate-700 hover:bg-slate-600 shadow-slate-900/40",
  custom:  "bg-slate-700 hover:bg-slate-600 shadow-slate-900/40",
};

const PALETTE_NUM: Record<string, string> = {
  indigo:  "bg-indigo-600",
  violet:  "bg-violet-600",
  emerald: "bg-emerald-600",
  rose:    "bg-rose-600",
  amber:   "bg-amber-500",
  slate:   "bg-slate-600",
  custom:  "bg-slate-600",
};

const PALETTE_CHECK: Record<string, string> = {
  indigo:  "text-indigo-500",
  violet:  "text-violet-500",
  emerald: "text-emerald-500",
  rose:    "text-rose-500",
  amber:   "text-amber-500",
  slate:   "text-slate-500",
  custom:  "text-slate-500",
};

const PALETTE_CHECK_BG: Record<string, string> = {
  indigo:  "bg-indigo-100",
  violet:  "bg-violet-100",
  emerald: "bg-emerald-100",
  rose:    "bg-rose-100",
  amber:   "bg-amber-100",
  slate:   "bg-slate-200",
  custom:  "bg-slate-200",
};

const PALETTE_BADGE: Record<string, string> = {
  indigo:  "bg-indigo-50 text-indigo-600 border-indigo-100",
  violet:  "bg-violet-50 text-violet-600 border-violet-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  rose:    "bg-rose-50 text-rose-600 border-rose-100",
  amber:   "bg-amber-50 text-amber-700 border-amber-100",
  slate:   "bg-slate-100 text-slate-700 border-slate-200",
  custom:  "bg-slate-100 text-slate-700 border-slate-200",
};

const PALETTE_LABEL: Record<string, string> = {
  indigo:  "text-indigo-500",
  violet:  "text-violet-500",
  emerald: "text-emerald-500",
  rose:    "text-rose-500",
  amber:   "text-amber-500",
  slate:   "text-slate-500",
  custom:  "text-slate-500",
};

const PALETTE_LABEL_LIGHT: Record<string, string> = {
  indigo:  "text-indigo-300",
  violet:  "text-violet-300",
  emerald: "text-emerald-300",
  rose:    "text-rose-300",
  amber:   "text-amber-300",
  slate:   "text-slate-400",
  custom:  "text-slate-400",
};

const PALETTE_DOT: Record<string, string> = {
  indigo:  "bg-indigo-400",
  violet:  "bg-violet-400",
  emerald: "bg-emerald-400",
  rose:    "bg-rose-400",
  amber:   "bg-amber-400",
  slate:   "bg-slate-400",
  custom:  "bg-slate-400",
};

const RADIUS_MAP: Record<string, string> = {
  none: "rounded-none",
  sm:   "rounded-lg",
  md:   "rounded-xl",
  lg:   "rounded-2xl",
  xl:   "rounded-3xl",
  full: "rounded-2xl",
};

const SPACING_MAP: Record<string, string> = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  relaxed: "py-20 md:py-28",
};

const FONT_MAP: Record<string, string> = {
  sans:    "font-sans",
  serif:   "font-serif",
  mono:    "font-mono",
  display: "font-sans",
};

// ── Normalisation helpers ─────────────────────────────────────────────────

function str(obj: Record<string, unknown>, key: string, fallback = ""): string {
  const v = obj[key];
  return typeof v === "string" ? v : fallback;
}

function arr<T>(obj: Record<string, unknown>, key: string): T[] {
  const v = obj[key];
  return Array.isArray(v) ? (v as T[]) : [];
}

function ob(root: Record<string, unknown>, key: string): Record<string, unknown> {
  const v = root[key];
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
}

// ── Small primitives ──────────────────────────────────────────────────────

function SectionLabel({
  children,
  light = false,
  color = "text-indigo-500",
  colorLight = "text-indigo-300",
}: {
  children: string;
  light?: boolean;
  color?: string;
  colorLight?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 mb-4">
      <div
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          light ? colorLight : color
        }`}
      >
        {children}
      </div>
      <div className="w-8 h-px bg-current opacity-30" />
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────

type Props = {
  content:  Record<string, unknown>;
  isMobile: boolean;
  theme?:   LandingTheme;
};

// ── Component ─────────────────────────────────────────────────────────────

export default function CourseRenderer({ content, isMobile, theme }: Props) {
  const pal       = theme?.palette  ?? "indigo";
  const btn       = PALETTE_BTN[pal]        ?? PALETTE_BTN.indigo;
  const numBg     = PALETTE_NUM[pal]        ?? PALETTE_NUM.indigo;
  const checkTxt  = PALETTE_CHECK[pal]      ?? PALETTE_CHECK.indigo;
  const checkBg   = PALETTE_CHECK_BG[pal]   ?? PALETTE_CHECK_BG.indigo;
  const badge     = PALETTE_BADGE[pal]      ?? PALETTE_BADGE.indigo;
  const labelTxt  = PALETTE_LABEL[pal]      ?? PALETTE_LABEL.indigo;
  const labelLight = PALETTE_LABEL_LIGHT[pal] ?? PALETTE_LABEL_LIGHT.indigo;
  const dot       = PALETTE_DOT[pal]        ?? PALETTE_DOT.indigo;
  const radius    = RADIUS_MAP[theme?.radius  ?? "lg"]      ?? "rounded-2xl";
  const sectionPy = SPACING_MAP[theme?.spacing ?? "default"] ?? "py-16 md:py-24";
  const fontClass = FONT_MAP[theme?.fontStyle  ?? "sans"]   ?? "font-sans";
  // ── Normalise sections ────────────────────────────────────────────────
  const heroRaw = ob(content, "hero");
  const hero = {
    title:        str(heroRaw, "title"),
    subtitle:     str(heroRaw, "subtitle"),
    cta:          str(heroRaw, "cta", "Enroll Now"),
    secondaryCta: str(heroRaw, "secondaryCta", "Preview Course"),
    cover_image:  str(heroRaw, "cover_image"),
  };

  const stats        = arr<Record<string, unknown>>(content, "stats");
  const outcomes     = arr<string>(content, "outcomes");
  const modules      = arr<Record<string, unknown>>(content, "modules");

  const instructorRaw = ob(content, "instructor");
  const instructor = {
    name:        str(instructorRaw, "name"),
    bio:         str(instructorRaw, "bio"),
    credentials: arr<string>(instructorRaw, "credentials"),
  };

  const testimonials = arr<Record<string, unknown>>(content, "testimonials");

  const pricingRaw = ob(content, "pricing");
  const pricing = {
    price:    str(pricingRaw, "price"),
    period:   str(pricingRaw, "period"),
    features: arr<string>(pricingRaw, "features"),
    cta:      str(pricingRaw, "cta", "Enroll Now"),
    guarantee: str(pricingRaw, "guarantee"),
  };

  const faq = arr<Record<string, unknown>>(content, "faq");

  // ── Grid helpers ──────────────────────────────────────────────────────
  const col2 = isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
  const col3 = isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  const col4 = isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";

  const avatarBg = [
    "bg-indigo-600",
    "bg-violet-600",
    "bg-cyan-600",
    "bg-emerald-600",
    "bg-pink-600",
  ];

  const totalLessons = modules.reduce(
    (acc, m) => acc + (Array.isArray(m.lessons) ? m.lessons.length : 0),
    0,
  );

  return (
    <div className={`bg-white text-slate-900 ${fontClass} antialiased`}>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(99,102,241,0.28),transparent)]" />

        <div
          className={`relative max-w-4xl mx-auto px-6 text-center ${
            isMobile ? "py-16" : "py-28 md:py-40"
          }`}
        >
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/5 border border-white/15 ${labelLight} rounded-full px-4 py-1.5 text-xs font-semibold mb-8 tracking-wide`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
            Online Course
          </div>

          {/* Headline */}
          {hero.title && (
            <h1
              className={`font-black tracking-tight leading-none mb-6 ${
                isMobile ? "text-3xl" : "text-5xl md:text-7xl"
              }`}
            >
              <span className="bg-gradient-to-br from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                {hero.title}
              </span>
            </h1>
          )}

          {/* Subtitle */}
          {hero.subtitle && (
            <p
              className={`text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 ${
                isMobile ? "text-sm" : "text-lg md:text-xl"
              }`}
            >
              {hero.subtitle}
            </p>
          )}

          {/* CTA row */}
          <div
            className={`flex ${
              isMobile ? "flex-col" : "flex-col sm:flex-row"
            } items-center justify-center gap-4`}
          >
            <button className={`${btn} text-white font-bold py-4 px-8 ${radius} transition-all hover:scale-105 shadow-xl flex items-center gap-2`}>
              {hero.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-2xl transition-all hover:bg-white/5 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              {hero.secondaryCta}
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-slate-600 text-xs">
            Lifetime access · Certificate of completion · 30-day money-back guarantee
          </p>

          {/* Cover image */}
          {hero.cover_image && (
            <div className="mt-12">
              <img
                src={hero.cover_image}
                alt="Illustration de la formation"
                className={`mx-auto w-full object-cover rounded-2xl border border-white/10 shadow-2xl ${
                  isMobile ? "max-w-xs" : "max-w-lg"
                }`}
              />
            </div>
          )}
        </div>
      </section>

      {/* ══ 2. STATS BAR ══════════════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 px-6 py-14">
          <div className={`max-w-4xl mx-auto grid gap-8 text-center ${col4}`}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  className={`font-black text-slate-900 leading-none ${
                    isMobile ? "text-3xl" : "text-4xl md:text-5xl"
                  }`}
                >
                  {typeof stat.value === "string" ? stat.value : ""}
                </div>
                <div className="text-slate-500 text-sm mt-2">
                  {typeof stat.label === "string" ? stat.label : ""}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 3. OUTCOMES ══════════════════════════════════════════════════ */}
      {outcomes.length > 0 && (
        <section className={`px-6 ${sectionPy} max-w-5xl mx-auto`}>
          <div className="text-center mb-16">
            <SectionLabel color={labelTxt} colorLight={labelLight}>Learning Outcomes</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              What you&apos;ll learn
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
              Practical skills you can apply immediately after each lesson.
            </p>
          </div>

          <div className={`grid gap-3 ${col2}`}>
            {outcomes.map((outcome, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 bg-slate-50 border border-slate-200 ${radius} p-4`}
              >
                <div className={`w-5 h-5 rounded-full ${checkBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <CheckIcon className={`${checkTxt} w-3 h-3`} />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 4. CURRICULUM ════════════════════════════════════════════════ */}
      {modules.length > 0 && (
        <section className={`bg-slate-50 border-y border-slate-200 px-6 ${sectionPy}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel color={labelTxt} colorLight={labelLight}>Course Content</SectionLabel>
              <h2
                className={`font-bold text-slate-900 mt-2 ${
                  isMobile ? "text-2xl" : "text-3xl md:text-4xl"
                }`}
              >
                Course curriculum
              </h2>
              <p className="text-slate-500 mt-3 text-sm md:text-base">
                {modules.length} modules · {totalLessons} lessons
              </p>
            </div>

            <div className="space-y-3">
              {modules.map((module, i) => {
                const title       = typeof module.title       === "string" ? module.title       : "";
                const description = typeof module.description === "string" ? module.description : "";
                const lessons     = Array.isArray(module.lessons) ? (module.lessons as string[]) : [];

                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
                  >
                    {/* Module header */}
                    <div className="px-6 py-5 flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-lg ${numBg} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-slate-500 text-xs leading-relaxed mt-1">
                            {description}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 whitespace-nowrap shrink-0">
                        {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Lessons list */}
                    {lessons.length > 0 && (
                      <div className="border-t border-slate-100">
                        {lessons.map((lesson, li) => (
                          <div
                            key={li}
                            className="flex items-center gap-3 px-6 py-3 border-b border-slate-50 last:border-b-0"
                          >
                            <svg
                              className="w-4 h-4 text-slate-300 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="10" fill="currentColor" opacity={0.2} />
                              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                            </svg>
                            <span className="text-slate-600 text-sm">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. INSTRUCTOR ════════════════════════════════════════════════ */}
      {instructor.name && (
        <section className={`px-6 ${sectionPy} max-w-4xl mx-auto`}>
          <div className="text-center mb-16">
            <SectionLabel color={labelTxt} colorLight={labelLight}>Your Instructor</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              Meet your instructor
            </h2>
          </div>

          <div
            className={`flex ${
              isMobile ? "flex-col" : "flex-col md:flex-row"
            } items-center gap-10 bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10`}
          >
            {/* Avatar */}
            <div className="shrink-0">
              <div className={`w-24 h-24 rounded-2xl ${numBg} flex items-center justify-center text-white text-3xl font-black`}>
                {instructor.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold text-slate-900 mb-2 ${isMobile ? "text-xl" : "text-2xl"}`}
              >
                {instructor.name}
              </h3>
              {instructor.bio && (
                <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-5">
                  {instructor.bio}
                </p>
              )}
              {instructor.credentials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {instructor.credentials.map((cred, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      <CheckIcon className={`${checkTxt} w-3 h-3`} />
                      {cred}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ 6. TESTIMONIALS ════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className={`bg-slate-50 border-y border-slate-200 px-6 ${sectionPy}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel color={labelTxt} colorLight={labelLight}>Student Reviews</SectionLabel>
              <h2
                className={`font-bold text-slate-900 mt-2 ${
                  isMobile ? "text-2xl" : "text-3xl md:text-4xl"
                }`}
              >
                What students say
              </h2>
            </div>

            <div className={`grid gap-5 ${col3}`}>
              {testimonials.map((t, i) => {
                const name     = typeof t.name === "string" ? t.name : "";
                const role     = typeof t.role === "string" ? t.role : "";
                const text     = typeof t.text === "string" ? t.text : "";
                const initials = name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg
                          key={s}
                          className="w-4 h-4 text-amber-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate-600 leading-relaxed italic text-sm flex-1">
                      &ldquo;{text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div
                        className={`${
                          avatarBg[i % avatarBg.length]
                        } w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {initials || "S"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{name}</div>
                        {role && <div className="text-xs text-slate-400">{role}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 7. PRICING ════════════════════════════════════════════════════ */}
      {pricing.price && (
        <section className="bg-slate-950 text-white px-6 py-20 md:py-28 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(99,102,241,0.22),transparent)]" />

          <div className="relative max-w-md mx-auto">
            <div className="text-center mb-10">
              <SectionLabel light color={labelTxt} colorLight={labelLight}>Enroll Today</SectionLabel>
              <h2
                className={`font-bold text-white mt-2 ${
                  isMobile ? "text-2xl" : "text-3xl md:text-4xl"
                }`}
              >
                Start learning now
              </h2>
            </div>

            <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-10">
              <div className={`inline-block ${badge} text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border`}>
                Full Course Access
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`font-black leading-none text-slate-900 ${
                    isMobile ? "text-5xl" : "text-6xl"
                  }`}
                >
                  {pricing.price}
                </span>
                {pricing.period && (
                  <span className="text-slate-400 text-sm">{pricing.period}</span>
                )}
              </div>

              <p className="text-xs text-slate-400 mb-7">
                Lifetime access · All future updates included
              </p>

              {pricing.features.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {pricing.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckIcon className="text-indigo-500 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <button className={`w-full ${btn} text-white py-4 ${radius} font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg mb-5`}>
                {pricing.cta}
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {pricing.guarantee && (
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  {pricing.guarantee}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ 8. FAQ ════════════════════════════════════════════════════════ */}
      {faq.length > 0 && (
        <section className={`px-6 ${sectionPy} max-w-3xl mx-auto`}>
          <div className="text-center mb-16">
            <SectionLabel color={labelTxt} colorLight={labelLight}>FAQ</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => {
              const question = typeof item.question === "string" ? item.question : "";
              const answer   = typeof item.answer   === "string" ? item.answer   : "";

              return (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="px-6 py-5 bg-slate-50 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {question}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200">
                    <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
