import { createClient } from "@supabase/supabase-js";
import LandingRenderer from "@/components/LandingRenderer";
import { styleToTheme, DEFAULT_SETTINGS } from "@/lib/landing";
import type { LandingData, LandingTheme, LandingSettings } from "@/types/landing";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PublicSite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("landings")
    .select("content, style, theme, settings")
    .eq("id", id)
    .maybeSingle();

  if (!data || error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Site not found
      </div>
    );
  }

  const landingData: LandingData = {
    content:  data.content,
    theme:    (data.theme as LandingTheme)    ?? styleToTheme(data.style),
    settings: (data.settings as LandingSettings) ?? DEFAULT_SETTINGS,
  };

  return <LandingRenderer data={landingData} />;
}
