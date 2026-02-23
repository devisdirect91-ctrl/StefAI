// Reusable renderer — /site/[id] (server) and dashboard preview (client).
// isMobile forces single-column grids for the phone-frame preview,
// where CSS md: breakpoints still fire at browser width, not container width.
//
// Architecture — strict layer separation:
//   data.content  → section copy only (AI-editable)
//   data.theme    → all visual class resolution happens HERE, never in sub-renderers
//   data.settings → conversion / payment config — not used during rendering

import EbookRenderer from "./EbookRenderer";
import SaasRenderer from "./SaasRenderer";
import type { LandingData, LandingTheme } from "@/types/landing";

// ── Resolved theme ─────────────────────────────────────────────────────────
// LandingRenderer translates LandingTheme into flat CSS class strings.
// Sub-renderers receive these strings only — they never read LandingTheme.

type ResolvedTheme = {
  container: string;    // root surface + foreground color
  button: string;       // primary action button
  card: string;         // card surface + border
  badge: string;        // small label pill
  muted: string;        // secondary / subdued text
  accent: string;       // bg-* for decorative bars and underlines
  starColor: string;    // star rating fill
  border: string;       // separator border
  radius: string;       // border-radius applied to cards and buttons
  sectionPy: string;    // vertical section padding
  font: string;         // font-family on the root element
  titleClass?: string;  // optional gradient applied to the hero headline
};

// ── Palette → action & badge colours ──────────────────────────────────────

type PaletteTokens = {
  action: string;
  actionHover: string;
  actionShadow: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  titleGradient?: string;
};

const paletteTokens: Record<LandingTheme["palette"], PaletteTokens> = {
  indigo: {
    action:       "bg-indigo-600",
    actionHover:  "hover:bg-indigo-500",
    actionShadow: "shadow-indigo-200",
    accent:       "bg-indigo-500",
    badgeBg:      "bg-indigo-50",
    badgeText:    "text-indigo-600",
    badgeBorder:  "border-indigo-100",
    titleGradient:
      "bg-gradient-to-r from-indigo-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent",
  },
  violet: {
    action:       "bg-violet-600",
    actionHover:  "hover:bg-violet-500",
    actionShadow: "shadow-violet-200",
    accent:       "bg-violet-500",
    badgeBg:      "bg-violet-50",
    badgeText:    "text-violet-600",
    badgeBorder:  "border-violet-100",
    titleGradient:
      "bg-gradient-to-r from-violet-300 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent",
  },
  rose: {
    action:       "bg-rose-600",
    actionHover:  "hover:bg-rose-500",
    actionShadow: "shadow-rose-200",
    accent:       "bg-rose-500",
    badgeBg:      "bg-rose-50",
    badgeText:    "text-rose-600",
    badgeBorder:  "border-rose-100",
    titleGradient:
      "bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 bg-clip-text text-transparent",
  },
  emerald: {
    action:       "bg-emerald-600",
    actionHover:  "hover:bg-emerald-500",
    actionShadow: "shadow-emerald-200",
    accent:       "bg-emerald-500",
    badgeBg:      "bg-emerald-50",
    badgeText:    "text-emerald-600",
    badgeBorder:  "border-emerald-100",
    titleGradient:
      "bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent",
  },
  amber: {
    action:       "bg-amber-500",
    actionHover:  "hover:bg-amber-400",
    actionShadow: "shadow-amber-200",
    accent:       "bg-amber-400",
    badgeBg:      "bg-amber-50",
    badgeText:    "text-amber-700",
    badgeBorder:  "border-amber-100",
  },
  slate: {
    action:       "bg-slate-800",
    actionHover:  "hover:bg-slate-700",
    actionShadow: "shadow-slate-200",
    accent:       "bg-slate-700",
    badgeBg:      "bg-slate-100",
    badgeText:    "text-slate-700",
    badgeBorder:  "border-slate-200",
  },
  custom: {
    action:       "bg-slate-800",
    actionHover:  "hover:bg-slate-700",
    actionShadow: "shadow-slate-200",
    accent:       "bg-slate-700",
    badgeBg:      "bg-slate-100",
    badgeText:    "text-slate-700",
    badgeBorder:  "border-slate-200",
  },
};

// ── Mode → surface colours ─────────────────────────────────────────────────

type SurfaceTokens = {
  container: string;
  card: string;
  muted: string;
  border: string;
};

const surfaceTokens: Record<LandingTheme["mode"], SurfaceTokens> = {
  light: {
    container: "bg-white text-slate-900",
    card:      "bg-slate-50 border border-slate-200",
    muted:     "text-slate-500",
    border:    "border-slate-200",
  },
  dark: {
    container: "bg-slate-950 text-white",
    card:      "bg-slate-900 border border-slate-800",
    muted:     "text-slate-400",
    border:    "border-slate-700",
  },
};

// ── Dimension maps ─────────────────────────────────────────────────────────

const radiusMap: Record<LandingTheme["radius"], string> = {
  none: "rounded-none",
  sm:   "rounded-lg",
  md:   "rounded-xl",
  lg:   "rounded-2xl",
  xl:   "rounded-3xl",
  full: "rounded-full",
};

const spacingMap: Record<LandingTheme["spacing"], string> = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  relaxed: "py-20 md:py-28",
};

const fontMap: Record<LandingTheme["fontStyle"], string> = {
  sans:    "font-sans",
  serif:   "font-serif",
  mono:    "font-mono",
  display: "font-sans",
};

// ── Theme resolver — the only place LandingTheme → CSS string mapping occurs

function resolveTheme(theme: LandingTheme): ResolvedTheme {
  const pal     = paletteTokens[theme.palette] ?? paletteTokens.slate;
  const surface = surfaceTokens[theme.mode]    ?? surfaceTokens.light;

  return {
    container:  surface.container,
    button:     `${pal.action} text-white ${pal.actionHover} active:scale-[0.98] shadow-md ${pal.actionShadow}`,
    card:       surface.card,
    badge:      `${pal.badgeBg} ${pal.badgeText} border ${pal.badgeBorder}`,
    muted:      surface.muted,
    accent:     pal.accent,
    starColor:  "text-amber-400",
    border:     surface.border,
    radius:     radiusMap[theme.radius]     ?? "rounded-2xl",
    sectionPy:  spacingMap[theme.spacing]   ?? "py-16 md:py-24",
    font:       fontMap[theme.fontStyle]    ?? "font-sans",
    titleClass: theme.mode === "dark" ? pal.titleGradient : undefined,
  };
}

// ── Renderer routing ───────────────────────────────────────────────────────
// Routes on content shape, not on visual style.
// "saas"    → content has socialProof / finalCta  (SaasContent)
// "ebook"   → content has problems / chapters
// "generic" → fallback

type RendererKey = "saas" | "ebook" | "generic";

function detectRenderer(content: Record<string, unknown>): RendererKey {
  if ("socialProof" in content || "finalCta" in content) return "saas";
  if ("problems" in content || "chapters" in content)    return "ebook";
  return "generic";
}

// ── Normalisers (generic renderer only) ───────────────────────────────────

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string") return [item];
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const text = o.text ?? o.feedback ?? o.quote ?? o.review ?? o.comment;
      if (typeof text === "string" && text) return [text];
    }
    return [];
  });
}

function toPricing(value: unknown): { price: string; guarantee: string } | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const o = value as Record<string, unknown>;
  return {
    price:     typeof o.price     === "string" ? o.price     : "",
    guarantee: typeof o.guarantee === "string" ? o.guarantee : "",
  };
}

function toHero(value: unknown): { title: string; subtitle: string; cta: string } {
  const fallback = { title: "", subtitle: "", cta: "Get Started" };
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  const o = value as Record<string, unknown>;
  return {
    title:    typeof o.title    === "string" ? o.title    : "",
    subtitle: typeof o.subtitle === "string" ? o.subtitle : "",
    cta:      typeof o.cta      === "string" && o.cta ? o.cta : "Get Started",
  };
}

// ── Section title (generic renderer) ──────────────────────────────────────

function SectionTitle({
  children,
  accent,
  radius,
  isMobile,
}: {
  children: string;
  accent: string;
  radius: string;
  isMobile: boolean;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className={`font-bold mb-4 ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"}`}>
        {children}
      </h2>
      <div className={`w-10 h-1 ${accent} ${radius} mx-auto`} />
    </div>
  );
}

// ── Decorative avatars (generic renderer) ─────────────────────────────────

const AVATAR_BG   = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"];
const AVATAR_INIT = ["M", "T", "S", "J", "L"];

// ── Props ──────────────────────────────────────────────────────────────────

type Props = {
  data: LandingData;
  isMobile?: boolean;
};

// ── Component ──────────────────────────────────────────────────────────────

export default function LandingRenderer({ data, isMobile = false }: Props) {
  // Resolve theme once — all visual classes flow from here, never from sub-renderers
  const theme = resolveTheme(data.theme);

  const content =
    data.content && typeof data.content === "object" && !Array.isArray(data.content)
      ? (data.content as Record<string, unknown>)
      : {};

  const renderer = detectRenderer(content);

  // ── Route: SaaS ─────────────────────────────────────────────────────────
  if (renderer === "saas") {
    return <SaasRenderer content={content} isMobile={isMobile} />;
  }

  // ── Route: Ebook ─────────────────────────────────────────────────────────
  if (renderer === "ebook") {
    return (
      <EbookRenderer
        hero={toHero(content.hero)}
        benefits={toStringArray(content.benefits)}
        testimonials={toStringArray(content.testimonials)}
        pricing={toPricing(content.pricing)}
        problems={toStringArray(content.problems)}
        chapters={toStringArray(content.chapters)}
        isMobile={isMobile}
      />
    );
  }

  // ── Route: Generic ────────────────────────────────────────────────────────
  // All visual classes come from the resolved theme — none are hardcoded here.

  const hero         = toHero(content.hero);
  const benefits     = toStringArray(content.benefits);
  const testimonials = toStringArray(content.testimonials);
  const pricing      = toPricing(content.pricing);

  const colsBenefits     = isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  const colsTestimonials = isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`${theme.container} ${theme.font}`}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden px-6 py-20 md:py-36 min-h-[70vh]">
        <div className="relative flex items-center justify-center gap-2 mb-8">
          <span className={`${theme.starColor} text-base tracking-widest`}>★★★★★</span>
          <span className={`text-xs md:text-sm ${theme.muted} font-medium`}>
            Trusted by thousands
          </span>
        </div>

        {hero.title && (
          <h1
            className={`relative font-black leading-tight tracking-tight mb-6
              ${isMobile ? "text-3xl" : "text-4xl md:text-6xl lg:text-7xl"}
              ${theme.titleClass ?? ""}`}
          >
            {hero.title}
          </h1>
        )}

        {hero.subtitle && (
          <p
            className={`relative max-w-2xl leading-relaxed mb-10 ${theme.muted}
              ${isMobile ? "text-sm" : "text-base md:text-xl"}`}
          >
            {hero.subtitle}
          </p>
        )}

        <button
          className={`relative ${theme.button}
            ${isMobile ? "w-full max-w-xs" : "px-10"}
            py-4 ${theme.radius} font-bold text-base
            flex items-center justify-center gap-2
            transition-all duration-200 hover:scale-105`}
        >
          {hero.cta}
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* ══ BENEFITS ══════════════════════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className={`px-6 ${theme.sectionPy} max-w-5xl mx-auto`}>
          <SectionTitle accent={theme.accent} radius={theme.radius} isMobile={isMobile}>
            What you will learn
          </SectionTitle>

          <div className={`grid gap-4 ${colsBenefits}`}>
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className={`${theme.card} flex items-start gap-4 p-5 ${theme.radius}`}
              >
                <div
                  className={`${theme.badge} w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className={`leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className={`px-6 ${theme.sectionPy} max-w-5xl mx-auto`}>
          <SectionTitle accent={theme.accent} radius={theme.radius} isMobile={isMobile}>
            What people are saying
          </SectionTitle>

          <div className={`grid gap-4 ${colsTestimonials}`}>
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`${theme.card} flex flex-col gap-4 p-6 ${theme.radius}`}
              >
                <span className={`${theme.starColor} text-sm tracking-widest`}>★★★★★</span>
                <p className={`italic leading-relaxed flex-1 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}>
                  &ldquo;{testimonial}&rdquo;
                </p>
                <div className={`flex items-center gap-3 pt-4 border-t ${theme.border}`}>
                  <div
                    className={`${AVATAR_BG[i % AVATAR_BG.length]} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {AVATAR_INIT[i % AVATAR_INIT.length]}
                  </div>
                  <span className={`text-xs font-medium ${theme.muted}`}>Verified user</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ PRICING ═══════════════════════════════════════════════════════ */}
      {pricing && (
        <section className={`px-6 ${theme.sectionPy} max-w-sm mx-auto text-center`}>
          <SectionTitle accent={theme.accent} radius={theme.radius} isMobile={isMobile}>
            Get access
          </SectionTitle>

          <div className={`${theme.card} p-8 md:p-10 ${theme.radius}`}>
            <div
              className={`inline-block ${theme.badge} text-xs font-semibold px-4 py-1.5 rounded-full mb-6`}
            >
              Lifetime access
            </div>

            {pricing.price && (
              <div
                className={`font-black leading-none mb-2 ${isMobile ? "text-5xl" : "text-6xl md:text-7xl"}`}
              >
                {pricing.price}
              </div>
            )}

            <p className={`text-xs ${theme.muted} mb-8`}>
              One-time payment · Immediate access
            </p>

            <button
              className={`${theme.button} w-full py-4 ${theme.radius} font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 mb-6`}
            >
              {hero.cta}
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {pricing.guarantee && (
              <div className={`flex items-center justify-center gap-2 ${theme.muted} text-xs`}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                {pricing.guarantee}
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
