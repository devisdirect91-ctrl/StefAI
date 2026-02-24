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

// ── Output validation schemas (mirror types/landing.ts CourseContent) ─────────

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
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
});

// ── JSON shape scaffold injected into the prompt ──────────────────────────────

const COURSE_JSON_SCHEMA = `{
  "hero": {
    "title": "string — headline puissante orientée transformation (max 10 mots)",
    "subtitle": "string — 1-2 phrases persuasives qui amplifient la transformation promise",
    "cta": "string — CTA principal (ex. S'inscrire maintenant, Accéder à la formation)",
    "secondaryCta": "string — CTA secondaire (ex. Voir le programme, Aperçu gratuit)"
  },
  "stats": [
    { "value": "24",     "label": "Leçons vidéo" },
    { "value": "6",      "label": "Modules" },
    { "value": "12h+",   "label": "De contenu" },
    { "value": "3 800+", "label": "Étudiants" }
  ],
  "outcomes": [
    "string — résultat concret 1, commence par un verbe d'action",
    "string", "string", "string", "string", "string"
  ],
  "modules": [
    {
      "title": "Module 1 – Titre descriptif",
      "description": "string — 1 phrase sur ce que couvre ce module",
      "lessons": ["string — titre de leçon", "string", "string", "string"]
    },
    { "title": "Module 2 – ...", "description": "string", "lessons": ["string", "string", "string"] },
    { "title": "Module 3 – ...", "description": "string", "lessons": ["string", "string", "string", "string"] },
    { "title": "Module 4 – ...", "description": "string", "lessons": ["string", "string", "string"] },
    { "title": "Module 5 – ...", "description": "string", "lessons": ["string", "string", "string", "string"] }
  ],
  "instructor": {
    "name": "string — nom complet du formateur",
    "bio": "string — 2-3 phrases : background, expertise, résultats obtenus ou étudiants formés",
    "credentials": [
      "string — ex. '10+ ans d'expérience dans le domaine'",
      "string — ex. '50 000+ étudiants formés'",
      "string — ex. 'Expert reconnu, auteur, conférencier'"
    ]
  },
  "testimonials": [
    { "name": "string", "role": "string — ex. 'Designer Freelance'", "text": "string — témoignage spécifique avec résultats concrets et métriques (2-3 phrases)" },
    { "name": "string", "role": "string", "text": "string" },
    { "name": "string", "role": "string", "text": "string" }
  ],
  "pricing": {
    "price": "string — prix exact fourni",
    "period": "string — ex. 'paiement unique' ou '/ mois'",
    "features": [
      "string — ex. 'Accès à vie à toutes les leçons'",
      "string", "string", "string", "string", "string"
    ],
    "cta": "string — ex. Je m'inscris maintenant",
    "guarantee": "string — ex. 'Satisfait ou remboursé 30 jours, sans condition'"
  },
  "faq": [
    { "question": "string", "answer": "string — 2-4 phrases qui lèvent l'objection" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" }
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

    const userPrompt = `Tu es un expert copywriter spécialisé dans les landing pages de formation en ligne à haute conversion.

Voici les informations fournies par le créateur de la formation :

Nom de la formation : ${title}
Transformation promise : ${transformation}
Public cible : ${audience}
Problème principal résolu : ${problem}
Modules / programme : ${modules}
Bonus, accompagnement, garantie : ${bonus.trim() || "Aucun spécifié"}
Prix : ${price}

Ta mission :
Génère une landing page complète et optimisée pour la conversion en suivant ces règles :

- hero.title : headline puissante orientée transformation (max 10 mots, commence par un verbe fort ou chiffre précis)
- hero.subtitle : 1-2 phrases persuasives qui amplifient exactement la transformation promise
- stats : adapte les 4 statistiques au contexte réel de la formation (nb leçons, modules, heures de contenu, étudiants estimés)
- outcomes : 6 résultats concrets et mesurables que l'élève obtiendra, chacun commençant par un verbe d'action (Créer, Maîtriser, Déployer, Générer, etc.)
- modules : structure le programme fourni en 5 modules logiques (fondations → avancé), chaque module avec un titre descriptif, 1 phrase de description et 3-4 leçons détaillées
- instructor : crée un formateur fictif mais ultra-crédible, avec un nom réaliste et des credentials directement liés au sujet de la formation
- testimonials : 3 témoignages avec des résultats précis et crédibles (délais concrets, métriques, transformations mesurables)
- pricing.price : utilise exactement "${price}"
- pricing.features : liste les inclusions principales + tous les bonus mentionnés ci-dessus
- pricing.guarantee : formule une garantie forte basée sur : ${bonus.trim() || "satisfait ou remboursé 30 jours"}
- faq : 5 questions qui lèvent les 5 objections les plus courantes (niveau requis, durée, accès, remboursement, prérequis techniques)

Style : clair, professionnel, orienté résultat, sans fluff, 100% conversion-focused.

Retourne UNIQUEMENT un objet JSON dans cette structure exacte — aucun markdown, aucune explication, aucun bloc de code :
${COURSE_JSON_SCHEMA}`;

    const completion = await openai.chat.completions.create({
      model:       "gpt-4o-mini",
      messages:    [{ role: "user", content: userPrompt }],
      temperature: 0.8,
    });

    const aiRaw    = completion.choices[0].message.content ?? "{}";
    const aiParsed = JSON.parse(aiRaw);

    const validate = CourseContentSchema.safeParse(aiParsed);
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
