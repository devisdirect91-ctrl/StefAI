import { templates } from "@/lib/templates";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ── Request schema ────────────────────────────────────────────────────────────

const CourseWizardBodySchema = z.object({
  templateId:     z.string().default("course-pro"),
  title:          z.string().min(1),
  transformation: z.string().min(1),
  modules:        z.string().min(1),
  bonus:          z.string().optional().default(""),
  price:          z.string().min(1),
});

// ── AI output validation schema ───────────────────────────────────────────────

const CourseAIContentSchema = z.object({
  hero: z.object({
    headline:    z.string(),
    subheadline: z.string(),
    cta:         z.string(),
  }),
  transformation_section: z.object({
    title:    z.string(),
    benefits: z.array(z.string()),
  }),
  modules: z.array(z.object({
    title:       z.string(),
    description: z.string(),
    outcome:     z.string(),
  })),
  bonus_section: z.object({
    title:       z.string(),
    description: z.string(),
  }),
  testimonials: z.array(z.object({
    name:   z.string(),
    quote:  z.string(),
    result: z.string(),
  })),
  pricing_section: z.object({
    headline:      z.string(),
    justification: z.string(),
  }),
  faq: z.array(z.object({
    question: z.string(),
    answer:   z.string(),
  })),
  final_cta: z.object({
    text:    z.string(),
    subtext: z.string(),
  }),
});

// ── Currency normalizer ───────────────────────────────────────────────────────

function normalizeCurrency(price: string): string {
  return price
    .replace(/\b(euros?|EUR)\b/gi, "€")
    .replace(/\b(dollars?\s*(?:us|américains?)?|USD)\b/gi, "$")
    .replace(/\b(pounds?|livres?\s*sterlings?|GBP)\b/gi, "£")
    .replace(/\b(yens?|JPY)\b/gi, "¥")
    .replace(/\b(francs?\s*suisses?|CHF)\b/gi, "CHF")
    .replace(/\b(couronnes?\s*suédoises?|SEK)\b/gi, "kr")
    .trim();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse free-text module list into an array of raw titles (one per non-empty line). */
function parseModuleTitles(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Build the modules scaffold with exactly N entries matching the user's titles. */
function buildModulesScaffold(titles: string[]): string {
  const entries = titles.map((title, i) =>
    `    {\n      "title": "${title.replace(/"/g, "'")}",\n      "description": "1 phrase sur ce que couvre ce module",\n      "outcome": "résultat concret obtenu à la fin de ce module"\n    }`,
  );
  return `  "modules": [\n${entries.join(",\n")}\n  ]`;
}

// ── JSON scaffold injected into the prompt ────────────────────────────────────

function buildCourseJsonSchema(moduleTitles: string[]): string {
  return `{
  "hero": {
    "headline": "headline puissante orientée résultat (max 12 mots, commence par un verbe fort ou chiffre précis)",
    "subheadline": "1-2 phrases persuasives qui amplifient la transformation promise",
    "cta": "texte du bouton principal (ex. Je commence maintenant · Accéder à la formation)"
  },
  "transformation_section": {
    "title": "vision de la transformation, 1 phrase forte (ex. Imagine enfin réussir à...)",
    "benefits": [
      "bénéfice concret 1 — commence par un verbe d'action",
      "bénéfice concret 2",
      "bénéfice concret 3",
      "bénéfice concret 4",
      "bénéfice concret 5",
      "bénéfice concret 6"
    ]
  },
${buildModulesScaffold(moduleTitles)},
  "bonus_section": {
    "title": "Tout ce que tu reçois en plus",
    "description": "2-3 phrases décrivant les bonus, accompagnement ou garantie inclus. Laisse description vide si aucun bonus n'est spécifié."
  },
  "testimonials": [
    {
      "name": "Prénom N. — nom fictif mais réaliste",
      "quote": "témoignage spécifique avec résultat concret et métrique, 2-3 phrases",
      "result": "rôle ou résultat obtenu (ex. Freelance Design · +3 500 €/mois en 60 jours)"
    },
    {
      "name": "string",
      "quote": "string",
      "result": "string"
    },
    {
      "name": "string",
      "quote": "string",
      "result": "string"
    }
  ],
  "pricing_section": {
    "headline": "titre accrocheur pour la section tarif (ex. Investi dans ta transformation)",
    "justification": "1 phrase qui justifie l'investissement ou formule la garantie de remboursement"
  },
  "faq": [
    {
      "question": "Est-ce adapté aux débutants ?",
      "answer": "réponse complète qui lève l'objection, 2-4 phrases"
    },
    {
      "question": "Combien de temps faut-il consacrer par semaine ?",
      "answer": "string"
    },
    {
      "question": "Y a-t-il une garantie de remboursement ?",
      "answer": "string"
    },
    {
      "question": "Comment accéder à la formation après l'achat ?",
      "answer": "string"
    },
    {
      "question": "question sur le retour sur investissement ou les prérequis",
      "answer": "string"
    }
  ],
  "final_cta": {
    "text": "titre fort pour la section finale (ex. Prêt à changer ta vie ?)",
    "subtext": "1-2 phrases de clôture qui créent l'urgence ou renforcent la confiance"
  }
}`;}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  try {
    const body   = await req.json();
    const parsed = CourseWizardBodySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid request", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { templateId, title, transformation, modules, price } = parsed.data;

    const selectedTemplate =
      templates.find((t) => t.id === templateId) ??
      templates.find((t) => t.id === "course-pro");

    if (!selectedTemplate) {
      return Response.json({ error: "Template not found" }, { status: 404 });
    }

    const moduleTitles   = parseModuleTitles(modules);
    const moduleCount    = moduleTitles.length;
    const jsonSchema     = buildCourseJsonSchema(moduleTitles);

    const userPrompt = `Tu es un expert en copywriting et UX conversion pour formations en ligne.

Un utilisateur a rempli un formulaire pour créer une landing page.

Voici les réponses pertinentes :

Titre : ${title}
Transformation : ${transformation}
Modules : ${modules}
Prix : ${price}

IMPORTANT :
- Ignore complètement les problèmes et l'audience — ils ne figurent pas dans la structure.
- Les réponses peuvent être vagues ou mal formulées.
- Reformule et structure intelligemment.
- Génère un texte cohérent et convaincant, orienté conversion.
- Ne jamais copier les phrases brutes telles quelles.
- Si le prix est élevé, renforcer la valeur perçue.
- Le tableau "modules" doit contenir EXACTEMENT ${moduleCount} entrée${moduleCount > 1 ? "s" : ""}, une par module listé ci-dessus. Respecte l'ordre et utilise les titres fournis comme base.

Retourne STRICTEMENT un JSON valide sans texte autour, sans markdown, sans bloc de code.

Format attendu :

${jsonSchema}`;

    const completion = await openai.chat.completions.create({
      model:       "gpt-4o-mini",
      messages:    [{ role: "user", content: userPrompt }],
      temperature: 0.8,
    });

    const aiRaw = completion.choices[0].message.content ?? "{}";

    let aiParsed: unknown;
    try {
      aiParsed = JSON.parse(aiRaw);
    } catch {
      return Response.json(
        { error: "AI returned invalid JSON", raw: aiRaw.slice(0, 300) },
        { status: 502 },
      );
    }

    const validate = CourseAIContentSchema.safeParse(aiParsed);
    if (!validate.success) {
      return Response.json(
        { error: "AI output failed schema validation", issues: validate.error.issues },
        { status: 502 },
      );
    }

    // Inject price from wizard (not AI-generated)
    const content = {
      ...validate.data,
      pricing_section: {
        ...validate.data.pricing_section,
        price: normalizeCurrency(price),
      },
    };

    return Response.json({
      mode:     "create",
      template: selectedTemplate,
      content,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
