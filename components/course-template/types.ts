// ── Raw wizard answers ────────────────────────────────────────────────────────

export type CourseData = {
  title: string;
  transformation: string;
  modules: string;
  price: string;
};

// ── AI-structured content (consumed by CourseLandingTemplate) ─────────────────

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
    cta: string;
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
    price: string; // injected from wizard input, not AI-generated
  };
  faq: Array<{ question: string; answer: string }>;
  final_cta: {
    text: string;
    subtext: string;
  };
};

// ── Legacy parsing type (kept for utils.ts compatibility) ────────────────────

export type ParsedModule = {
  number: number;
  rawTitle: string;
  cleanTitle: string;
  icon: string;
};
