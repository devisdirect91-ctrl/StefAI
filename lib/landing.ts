import type { LandingTheme, LandingSettings } from "@/types/landing";

/** Maps a legacy style string to a default LandingTheme. */
export function styleToTheme(style: string | null | undefined): LandingTheme {
  const map: Record<string, LandingTheme> = {
    "saas-pro":     { palette: "indigo", mode: "dark",  radius: "lg", spacing: "default", fontStyle: "sans" },
    "modern":       { palette: "slate",  mode: "light", radius: "lg", spacing: "default", fontStyle: "display" },
    "premium":      { palette: "violet", mode: "dark",  radius: "lg", spacing: "default", fontStyle: "sans" },
    "corporate":    { palette: "indigo", mode: "light", radius: "md", spacing: "default", fontStyle: "sans" },
    "minimal":      { palette: "slate",  mode: "light", radius: "lg", spacing: "default", fontStyle: "sans" },
    "soft-premium": { palette: "amber",  mode: "light", radius: "lg", spacing: "default", fontStyle: "sans" },
    "fun":          { palette: "rose",   mode: "light", radius: "full", spacing: "default", fontStyle: "sans" },
  };
  return map[style ?? ""] ?? { palette: "indigo", mode: "dark", radius: "lg", spacing: "default", fontStyle: "sans" };
}

export const DEFAULT_SETTINGS: LandingSettings = {
  productName:     "",
  price:           "",
  stripePriceId:   "",
  currency:        "USD",
  successRedirect: "/",
};
