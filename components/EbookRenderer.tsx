// Dedicated layout for the "modern-ebook-pro" template.
// Receives pre-normalized data from LandingRenderer.

const AVATAR_BG = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-pink-500",
];
const AVATAR_INIT = ["M", "T", "S", "J", "L"];

// ── 3-D Book Mockup ────────────────────────────────────────────────────────

function EbookMockup({ title }: { title: string }) {
  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Ambient glow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-12 bg-black/20 blur-2xl rounded-full" />

      <div
        className="relative"
        style={{ transform: "perspective(900px) rotateY(-12deg) rotateX(3deg)" }}
      >
        {/* Pages stack — back layers */}
        <div
          className="absolute inset-y-3 right-0 w-3 bg-gray-200 rounded-r-sm"
          style={{ transform: "translateX(5px)" }}
        />
        <div
          className="absolute inset-y-1.5 right-0 w-3 bg-gray-300 rounded-r-sm"
          style={{ transform: "translateX(3px)" }}
        />

        {/* Cover */}
        <div
          className="relative rounded-r-xl overflow-hidden shadow-2xl w-48 sm:w-56"
          style={{ aspectRatio: "3/4" }}
        >
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Book spine */}
          <div className="absolute left-0 inset-y-0 w-5 bg-black/50" />
          <div className="absolute left-5 inset-y-0 w-px bg-white/5" />

          {/* Cover content */}
          <div className="relative h-full p-5 flex flex-col">
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              Premium Ebook
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
              <div className="text-4xl">📖</div>
              {title && (
                <h3 className="text-white text-center font-bold text-xs leading-snug px-2">
                  {title}
                </h3>
              )}
            </div>

            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
              <span className="text-[10px] text-gray-500">PDF · EPUB</span>
              <span className="text-[10px] text-gray-500">2025</span>
            </div>
          </div>

          {/* Gloss overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ── Section title + underline ──────────────────────────────────────────────

function SectionTitle({
  children,
  light = false,
  isMobile,
}: {
  children: string;
  light?: boolean;
  isMobile: boolean;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className={`font-bold mb-4 ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} ${light ? "text-white" : "text-gray-900"}`}
      >
        {children}
      </h2>
      <div className={`w-10 h-1 ${light ? "bg-white" : "bg-black"} rounded-full mx-auto`} />
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────

type Props = {
  hero: { title: string; subtitle: string; cta: string };
  benefits: string[];
  testimonials: string[];
  pricing: { price: string; guarantee: string } | null;
  problems: string[];
  chapters: string[];
  isMobile: boolean;
};

// ── Component ──────────────────────────────────────────────────────────────

export default function EbookRenderer({
  hero,
  benefits,
  testimonials,
  pricing,
  problems,
  chapters,
  isMobile,
}: Props) {
  const col3 = isMobile
    ? "grid-cols-1"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-28 max-w-6xl mx-auto">
        <div
          className={`flex ${isMobile ? "flex-col" : "flex-col md:flex-row"} items-center gap-12 md:gap-16`}
        >
          {/* Left — copy */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-7 text-sm font-medium text-gray-600">
              <span>📚</span>
              <span>Ebook &amp; Guide Premium</span>
            </div>

            {/* Headline */}
            {hero.title && (
              <h1
                className={`font-black leading-tight tracking-tight mb-6 ${isMobile ? "text-3xl" : "text-4xl md:text-6xl"}`}
              >
                {hero.title}
              </h1>
            )}

            {/* Subtitle */}
            {hero.subtitle && (
              <p
                className={`text-gray-500 mb-10 leading-relaxed ${isMobile ? "text-sm" : "text-base md:text-xl"}`}
              >
                {hero.subtitle}
              </p>
            )}

            {/* CTA */}
            <button
              className={`bg-black text-white hover:bg-gray-800 active:scale-[0.98] font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 shadow-md ${isMobile ? "w-full" : "px-8"}`}
            >
              {hero.cta}
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>

            {/* Social proof line */}
            <div className="flex items-center gap-2 mt-5">
              <span className="text-amber-400 text-sm tracking-widest">★★★★★</span>
              <span className="text-gray-400 text-xs">
                Des milliers de lecteurs satisfaits
              </span>
            </div>
          </div>

          {/* Right — book mockup */}
          <div className={`shrink-0 ${isMobile ? "w-full flex justify-center" : ""}`}>
            <EbookMockup title={hero.title} />
          </div>
        </div>
      </section>

      {/* ══ 2. PROBLEM ═══════════════════════════════════════════════════ */}
      {problems.length > 0 && (
        <section className="bg-gray-950 text-white px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <SectionTitle light isMobile={isMobile}>
              Tu te reconnais dans ça ?
            </SectionTitle>

            <div className="space-y-5">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-400 text-[10px] font-bold">✕</span>
                  </div>
                  <p
                    className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-base"}`}
                  >
                    {problem}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                ✅ Cet ebook a été conçu pour résoudre exactement ces problèmes.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ══ 3. BENEFITS ══════════════════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <SectionTitle isMobile={isMobile}>Ce que tu vas découvrir</SectionTitle>

          <div className={`grid gap-4 ${col3}`}>
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 flex items-start gap-4 p-5 rounded-2xl"
              >
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p
                  className={`leading-relaxed text-gray-700 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 4. CHAPTERS ══════════════════════════════════════════════════ */}
      {chapters.length > 0 && (
        <section className="bg-gray-50 px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <SectionTitle isMobile={isMobile}>Au programme</SectionTitle>

            <div className="space-y-2">
              {chapters.map((chapter, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-4 px-5 bg-white border border-gray-200 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                    {i + 1}
                  </div>
                  <span
                    className={`font-medium text-gray-800 flex-1 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                  >
                    {chapter}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-300 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. TESTIMONIALS ══════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <SectionTitle isMobile={isMobile}>Ce qu&apos;en disent les lecteurs</SectionTitle>

          <div className={`grid gap-4 ${col3}`}>
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 flex flex-col gap-4 p-6 rounded-2xl"
              >
                <span className="text-amber-400 text-sm tracking-widest">★★★★★</span>
                <p
                  className={`italic leading-relaxed flex-1 text-gray-600 ${isMobile ? "text-sm" : "text-sm md:text-base"}`}
                >
                  &ldquo;{testimonial}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className={`${AVATAR_BG[i % AVATAR_BG.length]} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {AVATAR_INIT[i % AVATAR_INIT.length]}
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    Lecteur vérifié
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 6. PRICING ═══════════════════════════════════════════════════ */}
      {pricing && (
        <section className="bg-gray-950 text-white px-6 py-16 md:py-24">
          <div className="max-w-sm mx-auto text-center">
            <SectionTitle light isMobile={isMobile}>
              Obtiens ton ebook maintenant
            </SectionTitle>

            {/* Pricing card — white on dark bg */}
            <div className="bg-white text-gray-900 p-8 md:p-10 rounded-3xl">
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-gray-200">
                Téléchargement immédiat · PDF
              </div>

              {pricing.price && (
                <div
                  className={`font-black leading-none mb-2 ${isMobile ? "text-5xl" : "text-6xl md:text-7xl"}`}
                >
                  {pricing.price}
                </div>
              )}

              <p className="text-xs text-gray-400 mb-8">
                Paiement unique · Accès à vie
              </p>

              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-200 hover:scale-105 mb-6">
                {hero.cta}
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              {pricing.guarantee && (
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  {pricing.guarantee}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
