import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { styleToTheme } from "@/lib/landing";

// ── Zod schemas ────────────────────────────────────────────────────────────

const LandingThemeSchema = z.object({
  palette:   z.enum(["indigo", "violet", "rose", "emerald", "amber", "slate", "custom"]),
  mode:      z.enum(["light", "dark"]),
  radius:    z.enum(["none", "sm", "md", "lg", "xl", "full"]),
  spacing:   z.enum(["compact", "default", "relaxed"]),
  fontStyle: z.enum(["sans", "serif", "mono", "display"]),
});

const LandingSettingsSchema = z.object({
  productName:     z.string(),
  price:           z.string(),
  stripePriceId:   z.string(),
  currency:        z.string(),
  successRedirect: z.string(),
});

const PublishBodySchema = z.object({
  content:  z.record(z.unknown()),
  theme:    LandingThemeSchema.optional(),
  settings: LandingSettingsSchema.optional(),
  // Legacy fields — accepted for backward compat but not persisted
  style:    z.string().optional(),
  type:     z.string().optional(),
});

// ── Route ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const raw    = await req.json();
    const parsed = PublishBodySchema.safeParse(raw);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid request", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { content, settings, style } = parsed.data;

    // Resolve theme: prefer explicit theme, fall back to legacy style conversion
    const theme = parsed.data.theme ?? styleToTheme(style);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data, error } = await supabase
      .from("landings")
      .insert([{ content, theme, settings: settings ?? null }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ id: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
