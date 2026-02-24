// ── Raw wizard answers (unchanged — still used by CourseWizard) ──────────────

export type CourseData = {
  title: string;
  transformation: string;
  audience: string;
  problem: string;
  modules: string;
  bonus?: string;
  price: string;
};

// ── AI-structured content (new — consumed by CourseLandingTemplate) ──────────

export type CourseAIModule = {
  title: string;
  description: string;
  outcome: string;
};

export type CourseAITestimonial = {
  name: string;
  quote: string;
  result: string;
};

export type CourseAIContent = {
  hero: {
    headline: string;
    subheadline: string;
  };
  problem_section: {
    title: string;
    bullets: string[];
  };
  transformation_section: {
    title: string;
    benefits: string[];
  };
  modules: CourseAIModule[];
  bonus_section: {
    title: string;
    description: string;
  };
  testimonials: CourseAITestimonial[];
  pricing_section: {
    headline: string;
    justification: string;
    price: string;
    cta: string;
    features: string[];
  };
  faq: Array<{ question: string; answer: string }>;
};

// ── Legacy parsing type (kept for utils.ts compatibility) ────────────────────

export type ParsedModule = {
  number: number;
  rawTitle: string;
  cleanTitle: string;
  icon: string;
};
