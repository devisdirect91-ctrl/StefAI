// Dedicated renderer for the "saas-pro" template.
// Full B2B SaaS landing page: Hero · Social Proof · Features · Demo ·
// Testimonials · Pricing (3 tiers) · FAQ · Final CTA.
// Pure React, no client state — compatible with both server and client usage.

// ── Normalisation helpers ─────────────────────────────────────────────────

function str(obj: Record<string, unknown>, key: string, fallback = ""): string {
  const v = obj[key];
  return typeof v === "string" ? v : fallback;
}

function arr<T>(obj: Record<string, unknown>, key: string): T[] {
  const v = obj[key];
  return Array.isArray(v) ? (v as T[]) : [];
}

function obj(root: Record<string, unknown>, key: string): Record<string, unknown> {
  const v = root[key];
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
}

// ── Small layout primitives ───────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-4">
      <div
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          light ? "text-indigo-300" : "text-indigo-500"
        }`}
      >
        {children}
      </div>
      <div className={`w-8 h-px ${light ? "bg-indigo-400/40" : "bg-indigo-400/30"}`} />
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────

type Props = {
  content: Record<string, unknown>;
  isMobile: boolean;
};

// ── Component ─────────────────────────────────────────────────────────────

export default function SaasRenderer({ content, isMobile }: Props) {
  // ── Normalise every section ──────────────────────────────────────────
  const heroRaw = obj(content, "hero");
  const hero = {
    title: str(heroRaw, "title"),
    subtitle: str(heroRaw, "subtitle"),
    cta: str(heroRaw, "cta", "Start Free Trial"),
    secondaryCta: str(heroRaw, "secondaryCta", "Watch Demo"),
  };

  const socialProofRaw = obj(content, "socialProof");
  const metrics = arr<Record<string, unknown>>(socialProofRaw, "metrics");

  const features = arr<Record<string, unknown>>(content, "features");

  const demoRaw = obj(content, "demo");
  const demo = {
    title: str(demoRaw, "title"),
    description: str(demoRaw, "description"),
    cta: str(demoRaw, "cta", "Book a Live Demo"),
  };

  const testimonials = arr<Record<string, unknown>>(content, "testimonials");
  const pricing = arr<Record<string, unknown>>(content, "pricing");
  const faq = arr<Record<string, unknown>>(content, "faq");

  const finalCtaRaw = obj(content, "finalCta");
  const finalCta = {
    title: str(finalCtaRaw, "title"),
    subtitle: str(finalCtaRaw, "subtitle"),
    cta: str(finalCtaRaw, "cta", "Get Started Free"),
  };

  // ── Grid helpers ─────────────────────────────────────────────────────
  const col3 = isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  const col4 = isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";

  // ── Avatar colours for testimonials ─────────────────────────────────
  const avatarBg = [
    "bg-indigo-600",
    "bg-violet-600",
    "bg-cyan-600",
    "bg-emerald-600",
    "bg-pink-600",
  ];

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(99,102,241,0.28),transparent)]" />

        <div
          className={`relative max-w-4xl mx-auto px-6 text-center ${
            isMobile ? "py-16" : "py-28 md:py-40"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            B2B SaaS Platform
          </div>

          {/* Headline */}
          {hero.title && (
            <h1
              className={`font-black tracking-tight leading-none mb-6 ${
                isMobile ? "text-3xl" : "text-5xl md:text-7xl"
              }`}
            >
              <span className="bg-gradient-to-br from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                {hero.title}
              </span>
            </h1>
          )}

          {/* Subtitle */}
          {hero.subtitle && (
            <p
              className={`text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 ${
                isMobile ? "text-sm" : "text-lg md:text-xl"
              }`}
            >
              {hero.subtitle}
            </p>
          )}

          {/* CTA row */}
          <div
            className={`flex ${
              isMobile ? "flex-col" : "flex-col sm:flex-row"
            } items-center justify-center gap-4`}
          >
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-indigo-900/40 flex items-center gap-2">
              {hero.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-2xl transition-all hover:bg-white/5 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              {hero.secondaryCta}
            </button>
          </div>

          {/* Trust sub-line */}
          <p className="mt-8 text-slate-600 text-xs">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </section>

      {/* ══ 2. SOCIAL PROOF ═══════════════════════════════════════════════ */}
      {metrics.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 px-6 py-14">
          <div className={`max-w-4xl mx-auto grid gap-8 text-center ${col4}`}>
            {metrics.map((metric, i) => (
              <div key={i}>
                <div
                  className={`font-black text-slate-900 leading-none ${
                    isMobile ? "text-3xl" : "text-4xl md:text-5xl"
                  }`}
                >
                  {typeof metric.value === "string" ? metric.value : ""}
                </div>
                <div className="text-slate-500 text-sm mt-2">
                  {typeof metric.label === "string" ? metric.label : ""}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 3. FEATURES GRID ══════════════════════════════════════════════ */}
      {features.length > 0 && (
        <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Features</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              Everything you need to scale
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
              One platform, zero compromises. Built for teams that move fast.
            </p>
          </div>

          <div className={`grid gap-4 ${col3}`}>
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition-all group"
              >
                <div className="text-3xl mb-4">
                  {typeof feature.icon === "string" ? feature.icon : "✦"}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {typeof feature.title === "string" ? feature.title : ""}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {typeof feature.description === "string" ? feature.description : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 4. PRODUCT DEMO ═══════════════════════════════════════════════ */}
      {(demo.title || demo.description) && (
        <section className="bg-slate-950 text-white px-6 py-20 md:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div
              className={`flex ${
                isMobile ? "flex-col" : "flex-col lg:flex-row"
              } items-center gap-12 md:gap-16`}
            >
              {/* Copy */}
              <div className="flex-1 min-w-0">
                <SectionLabel light>Product Demo</SectionLabel>
                {demo.title && (
                  <h2
                    className={`font-bold text-white mt-2 mb-4 ${
                      isMobile ? "text-2xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {demo.title}
                  </h2>
                )}
                {demo.description && (
                  <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                    {demo.description}
                  </p>
                )}
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-indigo-900/40 flex items-center gap-2 w-fit">
                  {demo.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Browser mockup — hidden on mobile */}
              {!isMobile && (
                <div className="flex-1 shrink-0 w-full max-w-md">
                  <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-800/60">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <div className="ml-3 flex-1 bg-slate-700/60 rounded text-[10px] text-slate-500 px-3 py-1">
                        app.yourproduct.com/dashboard
                      </div>
                    </div>
                    {/* Fake dashboard UI */}
                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "↑ 94%", color: "indigo" },
                          { label: "$2.4M", color: "violet" },
                          { label: "99.9%", color: "cyan" },
                        ].map(({ label, color }) => (
                          <div
                            key={label}
                            className={`h-16 bg-${color}-500/10 rounded-xl border border-${color}-500/20 flex items-center justify-center`}
                          >
                            <div className={`text-${color}-400 font-bold text-base`}>{label}</div>
                          </div>
                        ))}
                      </div>
                      {/* Chart area */}
                      <div className="h-28 bg-indigo-500/5 rounded-xl border border-indigo-500/10 p-3">
                        <div className="h-1.5 w-16 bg-indigo-500/30 rounded-full mb-3" />
                        <div className="flex items-end gap-1 h-14">
                          {[40, 60, 45, 78, 55, 90, 68, 95, 62, 85, 72, 100].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                height: `${h}%`,
                                background: `rgba(99,102,241,${0.18 + (h / 100) * 0.55})`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Row items */}
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-8 bg-white/[0.03] rounded-lg border border-white/[0.07] flex items-center px-3 gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                            <div className="h-1.5 flex-1 bg-white/10 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. TESTIMONIALS ════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Testimonials</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              Trusted by industry leaders
            </h2>
          </div>

          <div className={`grid gap-5 ${col3}`}>
            {testimonials.map((t, i) => {
              const name = typeof t.name === "string" ? t.name : "";
              const role = typeof t.role === "string" ? t.role : "";
              const company = typeof t.company === "string" ? t.company : "";
              const text = typeof t.text === "string" ? t.text : "";
              const initials = name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-600 leading-relaxed italic text-sm flex-1">
                    &ldquo;{text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div
                      className={`${
                        avatarBg[i % avatarBg.length]
                      } w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {initials || "U"}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{name}</div>
                      <div className="text-xs text-slate-400">
                        {role}
                        {company ? ` · ${company}` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ 6. PRICING (3 tiers) ══════════════════════════════════════════ */}
      {pricing.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel>Pricing</SectionLabel>
              <h2
                className={`font-bold text-slate-900 mt-2 ${
                  isMobile ? "text-2xl" : "text-3xl md:text-4xl"
                }`}
              >
                Simple, transparent pricing
              </h2>
              <p className="text-slate-500 mt-3 text-sm md:text-base">
                No hidden fees. Start free, scale as you grow.
              </p>
            </div>

            <div className={`grid gap-5 items-start ${col3}`}>
              {pricing.map((plan, i) => {
                const planName = typeof plan.plan === "string" ? plan.plan : "";
                const price = typeof plan.price === "string" ? plan.price : "";
                const period = typeof plan.period === "string" ? plan.period : "";
                const description =
                  typeof plan.description === "string" ? plan.description : "";
                const planFeatures = Array.isArray(plan.features)
                  ? (plan.features as string[])
                  : [];
                const cta = typeof plan.cta === "string" ? plan.cta : "Get Started";
                const highlighted = plan.highlighted === true;

                return (
                  <div
                    key={i}
                    className={`rounded-2xl p-7 flex flex-col relative ${
                      highlighted
                        ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-900/30 scale-[1.03]"
                        : "bg-white border border-slate-200 shadow-sm"
                    }`}
                  >
                    {highlighted && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Most Popular
                      </div>
                    )}

                    <div
                      className={`text-xs font-semibold uppercase tracking-[0.14em] mb-4 ${
                        highlighted ? "text-indigo-200" : "text-indigo-600"
                      }`}
                    >
                      {planName}
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span
                        className={`font-black leading-none ${
                          isMobile ? "text-4xl" : "text-5xl"
                        } ${highlighted ? "text-white" : "text-slate-900"}`}
                      >
                        {price}
                      </span>
                      {period && (
                        <span
                          className={`text-sm ${
                            highlighted ? "text-indigo-200" : "text-slate-400"
                          }`}
                        >
                          {period}
                        </span>
                      )}
                    </div>

                    {description && (
                      <p
                        className={`text-xs leading-relaxed mb-6 ${
                          highlighted ? "text-indigo-200" : "text-slate-500"
                        }`}
                      >
                        {description}
                      </p>
                    )}

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {planFeatures.map((f, fi) => (
                        <li
                          key={fi}
                          className={`flex items-start gap-2.5 text-sm ${
                            highlighted ? "text-indigo-100" : "text-slate-600"
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              highlighted ? "text-indigo-300" : "text-indigo-500"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${
                        highlighted
                          ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
                          : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-200"
                      }`}
                    >
                      {cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 7. FAQ ════════════════════════════════════════════════════════ */}
      {faq.length > 0 && (
        <section className="px-6 py-20 md:py-28 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className={`font-bold text-slate-900 mt-2 ${
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              }`}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => {
              const question =
                typeof item.question === "string" ? item.question : "";
              const answer = typeof item.answer === "string" ? item.answer : "";

              return (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl overflow-hidden"
                >
                  <div className="px-6 py-5 bg-slate-50 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {question}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200">
                    <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ 8. FINAL CTA ══════════════════════════════════════════════════ */}
      {(finalCta.title || finalCta.subtitle) && (
        <section className="bg-slate-950 text-white px-6 py-20 md:py-32 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(99,102,241,0.22),transparent)]" />
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative max-w-2xl mx-auto">
            {finalCta.title && (
              <h2
                className={`font-black tracking-tight text-white mb-4 ${
                  isMobile ? "text-3xl" : "text-4xl md:text-5xl"
                }`}
              >
                {finalCta.title}
              </h2>
            )}
            {finalCta.subtitle && (
              <p className="text-slate-400 mb-10 leading-relaxed text-sm md:text-base max-w-xl mx-auto">
                {finalCta.subtitle}
              </p>
            )}

            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-indigo-900/50 inline-flex items-center gap-2">
              {finalCta.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>

            <p className="text-slate-600 text-xs mt-6">
              No credit card required · Free forever plan available
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
