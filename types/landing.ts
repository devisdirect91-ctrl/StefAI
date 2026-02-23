// ── Legacy atomic types (kept for backward compatibility) ─────────────────

export type HeroSection = {
  title: string;
  subtitle: string;
  cta: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  text: string;
};

export type PricingPlan = {
  plan: string;
  price: string;
  features: string[];
};

// ── SaaS full landing page types ──────────────────────────────────────────

export type SaasMetric = {
  value: string;
  label: string;
};

export type SaasFeature = {
  icon: string;
  title: string;
  description: string;
};

export type SaasTestimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
};

export type SaasPricingPlan = {
  plan: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export type SaasFaq = {
  question: string;
  answer: string;
};

export type SaasContent = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  };
  socialProof: {
    metrics: SaasMetric[];
  };
  features: SaasFeature[];
  demo: {
    title: string;
    description: string;
    cta: string;
  };
  testimonials: SaasTestimonial[];
  pricing: SaasPricingPlan[];
  faq: SaasFaq[];
  finalCta: {
    title: string;
    subtitle: string;
    cta: string;
  };
};

// ── 3-layer architecture ───────────────────────────────────────────────────

/** AI-editable copy layer — all user-facing text and structured content. */
export type LandingContent = SaasContent;

/** Visual controls only — no copy, no business logic. */
export type LandingTheme = {
  /** Named colour palette (maps to a predefined set of CSS tokens). */
  palette:
    | "indigo"
    | "violet"
    | "rose"
    | "emerald"
    | "amber"
    | "slate"
    | "custom";
  /** Light or dark base surface. */
  mode: "light" | "dark";
  /** Border-radius scale applied globally. */
  radius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /** Vertical spacing scale between sections. */
  spacing: "compact" | "default" | "relaxed";
  /** Typeface personality. */
  fontStyle: "sans" | "serif" | "mono" | "display";
};

/** Conversion & payment settings — separate from copy and visuals. */
export type LandingSettings = {
  /** Human-readable product name used in receipts and emails. */
  productName: string;
  /** Display price shown on the page (e.g. "$49"). */
  price: string;
  /** Stripe Price ID for checkout (e.g. "price_1Abc…"). */
  stripePriceId: string;
  /** ISO 4217 currency code (e.g. "USD", "EUR"). */
  currency: string;
  /** URL to redirect to after a successful Stripe payment. */
  successRedirect: string;
};

/** Root type combining all three layers. */
export type LandingData = {
  content: LandingContent;
  theme: LandingTheme;
  settings: LandingSettings;
};
