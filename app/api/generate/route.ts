import { templates } from "@/lib/templates";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ── Zod schemas ────────────────────────────────────────────────────────────
// Single source of truth for both create and edit output validation.
// Mirrors types/landing.ts — kept in sync manually.

const SaasMetricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const SaasFeatureSchema = z.object({
  icon:        z.string(),
  title:       z.string(),
  description: z.string(),
});

const SaasTestimonialSchema = z.object({
  name:    z.string(),
  role:    z.string(),
  company: z.string(),
  text:    z.string(),
});

const SaasPricingPlanSchema = z.object({
  plan:        z.string(),
  price:       z.string(),
  period:      z.string(),
  description: z.string(),
  features:    z.array(z.string()),
  cta:         z.string(),
  highlighted: z.boolean(),
});

const SaasFaqSchema = z.object({
  question: z.string(),
  answer:   z.string(),
});

// ── Course schemas ─────────────────────────────────────────────────────────

const CourseStatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const CourseModuleSchema = z.object({
  title:       z.string(),
  description: z.string(),
  lessons:     z.array(z.string()),
});

const CourseTestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  text: z.string(),
});

const CourseContentSchema = z.object({
  hero: z.object({
    title:        z.string(),
    subtitle:     z.string(),
    cta:          z.string(),
    secondaryCta: z.string(),
  }),
  stats:    z.array(CourseStatSchema),
  outcomes: z.array(z.string()),
  modules:  z.array(CourseModuleSchema),
  instructor: z.object({
    name:        z.string(),
    bio:         z.string(),
    credentials: z.array(z.string()),
  }),
  testimonials: z.array(CourseTestimonialSchema),
  pricing: z.object({
    price:     z.string(),
    period:    z.string(),
    features:  z.array(z.string()),
    cta:       z.string(),
    guarantee: z.string(),
  }),
  faq: z.array(SaasFaqSchema),
});

const SaasContentSchema = z.object({
  hero: z.object({
    title:        z.string(),
    subtitle:     z.string(),
    cta:          z.string(),
    secondaryCta: z.string(),
  }),
  socialProof: z.object({
    metrics: z.array(SaasMetricSchema),
  }),
  features:     z.array(SaasFeatureSchema),
  demo: z.object({
    title:       z.string(),
    description: z.string(),
    cta:         z.string(),
  }),
  testimonials: z.array(SaasTestimonialSchema),
  pricing:      z.array(SaasPricingPlanSchema),
  faq:          z.array(SaasFaqSchema),
  finalCta: z.object({
    title:    z.string(),
    subtitle: z.string(),
    cta:      z.string(),
  }),
});

const BaseContentSchema = z.object({
  hero: z.object({
    title:    z.string(),
    subtitle: z.string(),
    cta:      z.string(),
  }),
  benefits:     z.array(z.string()),
  testimonials: z.array(z.string()),
  pricing: z.object({
    price:     z.string(),
    guarantee: z.string(),
  }),
  problems: z.array(z.string()).optional(),
  chapters: z.array(z.string()).optional(),
});

// Validates the theme was not touched in edit mode.
// Compared as serialized JSON so key order doesn't matter.
const LandingThemeSchema = z.object({
  palette:   z.enum(["indigo", "violet", "rose", "emerald", "amber", "slate", "custom"]),
  mode:      z.enum(["light", "dark"]),
  radius:    z.enum(["none", "sm", "md", "lg", "xl", "full"]),
  spacing:   z.enum(["compact", "default", "relaxed"]),
  fontStyle: z.enum(["sans", "serif", "mono", "display"]),
});

// ── Request body schemas ───────────────────────────────────────────────────

const CreateBodySchema = z.object({
  mode:        z.enum(["create"]).optional(),
  templateId:  z.string(),
  productName: z.string().min(1),
  description: z.string().min(1),
});

const EditBodySchema = z.object({
  mode:           z.literal("edit"),
  instruction:    z.string().min(1),
  currentContent: z.unknown(),
  currentTheme:   LandingThemeSchema.optional(),
});

// ── Shared SaaS content schema (prompt scaffold) ───────────────────────────

const SAAS_SCHEMA = `{
  "hero": {
    "title": "string — bold, outcome-driven headline (max 10 words)",
    "subtitle": "string — 1–2 sentences expanding the value prop",
    "cta": "string — primary CTA (action verb, e.g. Start Free Trial)",
    "secondaryCta": "string — secondary CTA (e.g. Watch Demo)"
  },
  "socialProof": {
    "metrics": [
      { "value": "50,000+", "label": "Active Teams" },
      { "value": "$2.4B",   "label": "Revenue Tracked" },
      { "value": "99.9%",   "label": "Uptime SLA" },
      { "value": "4.9/5",   "label": "G2 Rating" }
    ]
  },
  "features": [
    { "icon": "⚡", "title": "string", "description": "string — 1–2 sentences" },
    { "icon": "🔐", "title": "string", "description": "string" },
    { "icon": "📊", "title": "string", "description": "string" },
    { "icon": "🔗", "title": "string", "description": "string" },
    { "icon": "🤖", "title": "string", "description": "string" },
    { "icon": "🌍", "title": "string", "description": "string" }
  ],
  "demo": {
    "title": "string — demo section headline",
    "description": "string — 2–3 sentences on what the demo shows",
    "cta": "string — e.g. Book a Live Demo"
  },
  "testimonials": [
    { "name": "string", "role": "string", "company": "string", "text": "string — specific, results-focused quote (2–3 sentences)" },
    { "name": "string", "role": "string", "company": "string", "text": "string" },
    { "name": "string", "role": "string", "company": "string", "text": "string" }
  ],
  "pricing": [
    {
      "plan": "Starter",  "price": "$0",     "period": "/ month",
      "description": "string — 1 sentence for this tier",
      "features": ["string", "string", "string", "string", "string"],
      "cta": "Get Started Free", "highlighted": false
    },
    {
      "plan": "Growth",   "price": "$49",    "period": "/ month",
      "description": "string",
      "features": ["string", "string", "string", "string", "string", "string", "string"],
      "cta": "Start Free Trial", "highlighted": true
    },
    {
      "plan": "Enterprise", "price": "Custom", "period": "",
      "description": "string",
      "features": ["string", "string", "string", "string", "string", "string", "string", "string"],
      "cta": "Contact Sales", "highlighted": false
    }
  ],
  "faq": [
    { "question": "string", "answer": "string — 2–4 sentences" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" }
  ],
  "finalCta": {
    "title": "string — strong closing headline (max 8 words)",
    "subtitle": "string — reinforce value + urgency",
    "cta": "string — final CTA button text"
  }
}`;

const COURSE_SCHEMA = `{
  "hero": {
    "title": "string — outcome-driven headline (max 10 words, e.g. 'Master X in 30 Days')",
    "subtitle": "string — 1–2 sentences on the transformation students achieve",
    "cta": "string — enroll CTA (e.g. Enroll Now, Get Instant Access)",
    "secondaryCta": "string — soft CTA (e.g. Preview Course, Watch Free Lesson)"
  },
  "stats": [
    { "value": "24",     "label": "Video Lessons" },
    { "value": "6",      "label": "Modules" },
    { "value": "12h+",   "label": "Video Content" },
    { "value": "3,800+", "label": "Students Enrolled" }
  ],
  "outcomes": [
    "string — concrete skill, start with an action verb (e.g. 'Build and deploy a production app')",
    "string", "string", "string", "string", "string"
  ],
  "modules": [
    {
      "title": "Module 1 – Descriptive Title",
      "description": "string — 1 sentence on what this module covers",
      "lessons": ["string — lesson title", "string", "string", "string"]
    },
    { "title": "Module 2 – ...", "description": "string", "lessons": ["string", "string", "string"] },
    { "title": "Module 3 – ...", "description": "string", "lessons": ["string", "string", "string", "string"] },
    { "title": "Module 4 – ...", "description": "string", "lessons": ["string", "string", "string"] },
    { "title": "Module 5 – ...", "description": "string", "lessons": ["string", "string", "string", "string"] }
  ],
  "instructor": {
    "name": "string — instructor full name",
    "bio": "string — 2–3 sentences: background, expertise, results achieved or students taught",
    "credentials": [
      "string — e.g. '10+ years industry experience'",
      "string — e.g. 'Taught 50,000+ students'",
      "string — e.g. 'Former Google Engineer'"
    ]
  },
  "testimonials": [
    { "name": "string", "role": "string — e.g. 'Software Developer'", "text": "string — specific, results-focused (2–3 sentences with concrete outcomes)" },
    { "name": "string", "role": "string", "text": "string" },
    { "name": "string", "role": "string", "text": "string" }
  ],
  "pricing": {
    "price": "string — e.g. '$197' or '$49'",
    "period": "string — e.g. 'one-time' or '/ month'",
    "features": [
      "string — e.g. 'Lifetime access to all lessons'",
      "string", "string", "string", "string", "string"
    ],
    "cta": "string — e.g. Enroll Now",
    "guarantee": "string — e.g. '30-day money-back guarantee, no questions asked'"
  },
  "faq": [
    { "question": "string", "answer": "string — 2–4 sentences addressing the concern" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" }
  ]
}`;

function buildBaseSchema(isEbook: boolean): string {
  return `{
  "hero": { "title": "string", "subtitle": "string", "cta": "string" },
  "benefits": ["string", "string", "string", "string", "string"],
  "testimonials": ["Short quote from a reader", "Short quote from another reader", "Short quote from a third reader"],
  "pricing": { "price": "string", "guarantee": "string" }${isEbook ? `,
  "problems": [
    "First-person pain point the reader faces (1–2 sentences)",
    "Second pain point",
    "Third pain point"
  ],
  "chapters": [
    "Chapter 1 – Title",
    "Chapter 2 – Title",
    "Chapter 3 – Title",
    "Chapter 4 – Title",
    "Chapter 5 – Title"
  ]` : ""}
}`;
}

// ── Mode: Create ───────────────────────────────────────────────────────────

async function handleCreate(raw: unknown): Promise<Response> {
  const parsed = CreateBodySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { templateId, productName, description } = parsed.data;

  const selectedTemplate = templates.find((t) => t.id === templateId);
  if (!selectedTemplate) {
    return Response.json({ error: "Template not found" }, { status: 404 });
  }

  const isEbook   = selectedTemplate.type === "ebook";
  const isCourse  = selectedTemplate.type === "course";
  const isSaasPro = selectedTemplate.style === "saas-pro";

  const userPrompt = isSaasPro
    ? `
You are a senior B2B SaaS copywriter specializing in high-converting landing pages for tech startups.

Product name: ${productName}
Description: ${description}

Tone: modern, confident, tech-forward, minimal but premium
Target audience: B2B decision-makers (CTOs, VPs, founders)

Rules:
- Every line must earn its place — no filler, no buzzwords without substance
- Headlines: bold, outcome-driven, short (max 10 words)
- CTAs: action verbs + clear benefit (Start Free Trial, Book a Demo, Get Access)
- Testimonials: specific, credible, results-focused — include real-sounding metrics and named roles
- Pricing: adapt the price points to match the product's perceived value and market
- FAQ: address real objections (pricing, security, setup time, cancellation, integrations)
- Features: pick relevant emojis and write concrete descriptions, not generic ones
- socialProof metrics: credible, specific numbers tied to the product's core value

Return ONLY a JSON object in this exact shape — no markdown, no explanation, no code fences:
${SAAS_SCHEMA}
`
    : isCourse
    ? `
You are a conversion-focused course copywriter specializing in online education platforms.

Product name: ${productName}
Description: ${description}

Tone: inspiring, expert, clear, results-oriented
Target audience: aspiring learners who want to gain a specific skill or transform their career

Rules:
- Hero headline: outcome-driven, max 10 words, start with an action verb or transformation statement
- Outcomes: 6 items, each starting with an action verb (Build, Learn, Master, Create, Deploy, etc.)
- Modules: 5 modules, each with 3–4 lessons, structured logically from foundations → advanced
- Instructor: create a credible, expert instructor persona with specific, believable credentials
- Testimonials: specific, results-focused — include concrete outcomes (e.g. "I got a job offer in 3 months")
- Pricing: set a realistic single price for an online course ($97–$497 for premium, $29–$79 for accessible)
- FAQ: address the 5 most common objections (beginner-friendly?, duration?, lifetime access?, refund policy?, prerequisites?)
- stats: adapt the 4 stats to the course (lesson count, modules, hours of content, student count)

Return ONLY a JSON object in this exact shape — no markdown, no explanation, no code fences:
${COURSE_SCHEMA}
`
    : `
You are a conversion-focused landing page copywriter specializing in ${isEbook ? "ebook and digital product sales" : "online course sales"}.

Template style: ${selectedTemplate.style}
Product type: ${selectedTemplate.type}
${isEbook ? "Product format: Premium ebook / PDF guide / playbook" : ""}

Product name: ${productName}
Description: ${description}

Rules:
- High conversion copy — every word must earn its place
- Short, punchy sentences
- Clear, urgent CTA (use action verbs: Download, Get, Grab, Access)
- Adapt tone to template style
${isEbook ? `- problems: write as if the reader is saying it themselves (first-person pain points)
- chapters: format as "Chapter N – Descriptive Title" that tease the content
- benefits: focus on transformation and outcomes, not features` : ""}

Return ONLY a JSON object in this exact shape — no markdown, no explanation:
${buildBaseSchema(isEbook)}

Rules for testimonials: each item must be a plain string (the quote only, no name, no object).
Rules for problems (ebook only): each item must be a plain string written in first person, describing the reader's frustration.
Rules for chapters (ebook only): each item must be a plain string formatted as "Chapter N – Title".
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userPrompt }],
    temperature: 0.8,
  });

  const aiRaw   = completion.choices[0].message.content ?? "{}";
  const aiParsed = JSON.parse(aiRaw);

  // Validate AI output against the expected schema
  const schema   = isSaasPro ? SaasContentSchema : isCourse ? CourseContentSchema : BaseContentSchema;
  const validate = schema.safeParse(aiParsed);
  if (!validate.success) {
    return Response.json(
      { error: "AI output failed schema validation", issues: validate.error.issues },
      { status: 502 },
    );
  }

  return Response.json({
    mode:     "create",
    template: selectedTemplate,
    content:  validate.data,
  });
}

// ── Mode: Edit ─────────────────────────────────────────────────────────────

const EDIT_SYSTEM_PROMPT =
  "You are editing content only. Never change theme or settings. " +
  "Apply the user's instruction to the content JSON and return the complete updated content " +
  "with exactly the same structure and all fields preserved. " +
  "Output a single raw JSON object — no markdown, no explanation, no extra keys.";

async function handleEdit(raw: unknown): Promise<Response> {
  const parsed = EditBodySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { instruction, currentContent, currentTheme } = parsed.data;

  // Validate the incoming theme before doing any AI work, so we have a
  // known-good reference to compare against after the edit.
  const themeSnapshot = currentTheme
    ? LandingThemeSchema.safeParse(currentTheme)
    : null;

  if (currentTheme && !themeSnapshot?.success) {
    return Response.json(
      { error: "Invalid currentTheme", issues: themeSnapshot?.error.issues },
      { status: 400 },
    );
  }

  const userMessage =
    `Current content:\n${JSON.stringify(currentContent, null, 2)}\n\n` +
    `Instruction: ${instruction}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.6,
    messages: [
      { role: "system", content: EDIT_SYSTEM_PROMPT },
      { role: "user",   content: userMessage },
    ],
  });

  const aiRaw    = completion.choices[0].message.content ?? "{}";
  const aiParsed = JSON.parse(aiRaw);

  // Detect which schema matches the incoming content shape and validate output
  const isSaas   = "socialProof" in aiParsed || "finalCta"   in aiParsed;
  const isCourse = "modules"     in aiParsed || "instructor" in aiParsed;
  const schema   = isSaas ? SaasContentSchema : isCourse ? CourseContentSchema : BaseContentSchema;
  const validate = schema.safeParse(aiParsed);

  if (!validate.success) {
    return Response.json(
      { error: "AI output failed schema validation", issues: validate.error.issues },
      { status: 502 },
    );
  }

  // Guard: ensure the AI did not smuggle theme or settings keys into the response
  const forbiddenKeys = ["theme", "settings", "palette", "mode", "radius", "spacing", "fontStyle"];
  const found = forbiddenKeys.filter((k) => k in aiParsed);
  if (found.length > 0) {
    return Response.json(
      { error: "AI attempted to modify protected keys", keys: found },
      { status: 502 },
    );
  }

  // Guard: if a theme snapshot was provided, assert it is byte-identical after the edit
  if (themeSnapshot?.success) {
    const before = JSON.stringify(themeSnapshot.data);
    const after  = JSON.stringify(currentTheme);
    if (before !== after) {
      return Response.json(
        { error: "Theme integrity check failed — theme must not change in edit mode" },
        { status: 502 },
      );
    }
  }

  return Response.json({
    mode:    "edit",
    content: validate.data,
  });
}

// ── Route entry point ──────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    if (body?.mode === "edit") {
      return handleEdit(body);
    }

    return handleCreate(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
