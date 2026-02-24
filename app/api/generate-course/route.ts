import { templates } from "@/lib/templates";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ── Request schema ────────────────────────────────────────────────────────────

const CourseWizardBodySchema = z.object({
  templateId:     z.string().default("course-pro"),
  title:          z.string().min(1),
  transformation: z.string().min(1),
  audience:       z.string().min(1),
  problem:        z.string().min(1),
  modules:        z.string().min(1),
  bonus:          z.string(),
  price:          z.string().min(1),
});

// ── Output validation schema (CourseAIContent) ────────────────────────────────

const CourseAIContentSchema = z.object({
  hero: z.object({
    headline:    z.string(),
    subheadline: z.string(),
  }),
  problem_section: z.object({
    title:   z.string(),
    bullets: z.array(z.string()),
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
    price:         z.string(),
    cta:           z.string(),
    features:      z.array(z.string()),
  }),
  faq: z.array(z.object({
    question: z.string(),
    answer:   z.string(),
  })),
});

// ── JSON scaffold injected into the prompt ────────────────────────────────────

const COURSE_JSON_SCHEMA = `{
  "hero": {
    "headline": "headline puissante orientée résultat (max 12 mots, commence par un verbe fort ou chiffre précis)",
    "subheadline": "1-2 phrases persuasives qui amplifient la transformation promise"
  },
  "problem_section": {
    "title": "titre accrocheur pour la section problème (ex. Pourquoi tu stagnes encore ?)",
    "bullets": [
      "bullet problème 1 — formulé avec empathie, 1-2 phrases",
      "bullet problème 2 — tentatives échouées ou ressources inefficaces",
      "bullet problème 3 — conséquences si rien ne change"
    ]
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
  "modules": [
    {
      "title": "Module 1 – Titre descriptif du module",
      "description": "1 phrase sur ce que couvre ce module",
      "outcome": "résultat concret obtenu à la fin de ce module"
    },
    {
      "title": "Module 2 – ...",
      "description": "string",
      "outcome": "string"
    },
    {
      "title": "Module 3 – ...",
      "description": "string",
      "outcome": "string"
    },
    {
      "title": "Module 4 – ...",
      "description": "string",
      "outcome": "string"
    },
    {
      "title": "Module 5 – ...",
      "description": "string",
      "outcome": "string"
    }
  ],
  "bonus_section": {
    "title": "Tout ce que tu reçois en plus",
    "description": "2-3 phrases décrivant les bonus, accompagnement ou garantie inclus"
  },
  "testimonials": [
    {
      "name": "Prénom N. — nom fictif mais réaliste",
      "quote": "témoignage spécifique avec résultat concret et métrique, 2-3 phrases",
      "result": "rôle ou résultat obtenu (ex. Freelance Design · +3 500€/mois en 60 jours)"
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
    "justification": "1-2 phrases qui justifient l'investissement ou formulent la garantie de remboursement",
    "price": "PRICE_PLACEHOLDER",
    "cta": "texte du bouton principal (ex. Je m'inscris maintenant)",
    "features": [
      "inclus 1 (ex. Accès à vie à toutes les leçons)",
      "inclus 2 (ex. Mises à jour gratuites incluses)",
      "inclus 3",
      "inclus 4",
      "inclus 5",
      "inclus 6 — bonus ou garantie le cas échéant"
    ]
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
  ]
}`;

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

    const {
      templateId,
      title,
      transformation,
      audience,
      problem,
      modules,
      bonus,
      price,
    } = parsed.data;

    const selectedTemplate =
      templates.find((t) => t.id === templateId) ??
      templates.find((t) => t.id === "course-pro");

    if (!selectedTemplate) {
      return Response.json({ error: "Template not found" }, { status: 404 });
    }

    // Inject the actual price into the JSON scaffold
    const jsonSchemaWithPrice = COURSE_JSON_SCHEMA.replace("PRICE_PLACEHOLDER", price);

    const userPrompt = `Tu es un expert en copywriting et en stratégie marketing spécialisé dans les formations en ligne.

Un utilisateur a rempli un formulaire pour créer une landing page.

Voici ses réponses brutes :

Titre : ${title}
Transformation : ${transformation}
Audience : ${audience}
Problème : ${problem}
Modules : ${modules}
Bonus : ${bonus.trim() || "Aucun spécifié"}
Prix : ${price}

IMPORTANT :

Les réponses peuvent être vagues, mal formulées ou répétitives.

Ta mission :

1. Comprendre l'intention réelle derrière chaque réponse.
2. Reformuler professionnellement.
3. Clarifier la promesse.
4. Structurer une landing page cohérente.
5. Supprimer toute phrase absurde ou maladroite.
6. Adapter le ton à l'audience.
7. Si le prix est élevé, renforcer la valeur perçue.
8. Si l'audience est débutante, rassurer.
9. Si l'audience est professionnelle, adopter un ton expert.
10. Ne jamais copier les phrases brutes telles quelles.
11. Toujours reformuler intelligemment.

Retourne STRICTEMENT un JSON valide sans texte autour, sans markdown, sans bloc de code.

Format attendu :

${jsonSchemaWithPrice}`;

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

    return Response.json({
      mode:     "create",
      template: selectedTemplate,
      content:  validate.data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
