import Link from "next/link";

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconZap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconLayout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);
const IconSparkles = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
  </svg>
);
const IconRocket = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconSmartphone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconSliders = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>
);
const IconServer = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── App preview mockup ─────────────────────────────────────────────── */
function MockDashboard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
        {/* Browser chrome */}
        <div className="bg-zinc-900 px-4 py-3 flex items-center gap-2 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <div className="mx-auto bg-zinc-800 rounded px-4 py-1 text-xs text-zinc-500 font-mono w-48 text-center">
            stefai.app/preview
          </div>
        </div>

        {/* App UI */}
        <div className="bg-zinc-950 flex h-[320px]">
          {/* Sidebar */}
          <div className="w-[140px] border-r border-zinc-800 bg-zinc-900 p-3 flex flex-col gap-1.5 shrink-0">
            <div className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest mb-2 px-1">Templates</div>
            {["Ebook", "Course", "SaaS", "Coaching"].map((t, i) => (
              <div
                key={t}
                className={`rounded-lg px-2 py-1.5 text-xs cursor-pointer ${
                  i === 0
                    ? "bg-indigo-600/20 border border-indigo-500/25 text-indigo-300"
                    : "text-zinc-600"
                }`}
              >
                {t}
              </div>
            ))}
            <div className="mt-auto">
              <div className="rounded-lg px-2 py-1.5 text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                AI ready
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
              <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Generating...
              </div>
              <div className="flex gap-2">
                <div className="bg-indigo-600 rounded px-2 py-0.5 text-[10px] text-white font-medium">Publish</div>
                <div className="bg-zinc-800 rounded px-2 py-0.5 text-[10px] text-zinc-400">Preview</div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2">
              <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/40 p-3">
                <div className="h-2.5 w-32 bg-indigo-400/40 rounded mb-2" />
                <div className="h-1.5 w-48 bg-zinc-600 rounded mb-1" />
                <div className="h-1.5 w-40 bg-zinc-700 rounded mb-3" />
                <div className="w-20 h-5 bg-indigo-600 rounded text-[8px] text-white flex items-center justify-center font-medium">
                  Get Started
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {["A", "B", "C"].map((f) => (
                  <div key={f} className="rounded-lg bg-zinc-800/40 border border-zinc-700/30 p-2">
                    <div className="w-4 h-4 rounded bg-indigo-500/20 mb-1.5" />
                    <div className="h-1.5 w-10 bg-zinc-600 rounded mb-1" />
                    <div className="h-1 w-8 bg-zinc-700 rounded" />
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-zinc-800/40 border border-zinc-700/30 p-2 flex items-center justify-between">
                <div>
                  <div className="h-1.5 w-14 bg-zinc-600 rounded mb-1" />
                  <div className="h-3 w-10 bg-indigo-400/35 rounded" />
                </div>
                <div className="w-14 h-5 bg-indigo-600 rounded text-[8px] text-white flex items-center justify-center">
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] text-zinc-600">Generated in 4.2s</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Template card (marketing page) ─────────────────────────────────── */
const marketingTemplates = [
  { name: "Ebook Launch",      category: "Ebook" },
  { name: "Online Course",     category: "Course" },
  { name: "SaaS Waitlist",     category: "SaaS" },
  { name: "Coaching Program",  category: "Coaching" },
  { name: "Newsletter Growth", category: "Newsletter" },
  { name: "Digital Bundle",    category: "Product" },
];

function TemplateCard({ name, category }: { name: string; category: string }) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden cursor-pointer transition-all">
      {/* Neutral preview */}
      <div className="h-44 relative overflow-hidden bg-zinc-800/40">
        <div className="absolute inset-3 rounded-xl border border-zinc-700/40 bg-zinc-900/80 p-3 flex flex-col gap-2">
          <div className="h-2 w-20 rounded-full bg-indigo-400/40" />
          <div className="h-1.5 w-28 rounded-full bg-zinc-600" />
          <div className="h-1.5 w-24 rounded-full bg-zinc-700" />
          <div className="mt-1 w-14 h-5 rounded-lg bg-indigo-600 flex items-center justify-center text-[9px] font-medium text-white">
            Get Access
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-lg bg-zinc-800 p-1">
                <div className="h-1 w-5 rounded-full bg-zinc-600 mb-0.5" />
                <div className="h-0.5 w-4 rounded-full bg-zinc-700" />
              </div>
            ))}
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="bg-white text-zinc-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100 transition">
            Preview
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition">
            Use Template
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="text-sm font-medium text-zinc-100">{name}</div>
        <div className="text-xs text-indigo-400 mt-0.5">{category}</div>
      </div>
    </div>
  );
}

/* ── FAQ item ────────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none">
        <span className="text-sm font-medium text-zinc-100 pr-4">{q}</span>
        <span className="shrink-0 w-5 h-5 rounded-full border border-zinc-700 text-zinc-400 flex items-center justify-center text-base leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
        {a}
      </div>
    </details>
  );
}

/* ── Main page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 backdrop-blur-xl bg-zinc-950/90">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-zinc-100 text-lg tracking-tight">
            StefAI
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-sm text-zinc-500">
            <a href="#how-it-works" className="hover:text-zinc-200 transition">How it works</a>
            <a href="#templates" className="hover:text-zinc-200 transition">Templates</a>
            <a href="#pricing" className="hover:text-zinc-200 transition">Pricing</a>
            <a href="#faq" className="hover:text-zinc-200 transition">FAQ</a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-200 transition hidden sm:block">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-14 bg-grid">
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              AI-Powered · No design skills needed
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-zinc-50 mb-5">
              Build landing pages<br />
              <span className="text-indigo-400">in seconds with AI</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
              Generate professional landing pages for your ebook, course, or SaaS product instantly.
              Publish with one click — no designer required.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-yellow-400">
                {Array(5).fill(0).map((_, i) => <IconStar key={i} />)}
              </div>
              <span className="text-sm text-zinc-400">
                <strong className="text-zinc-200">4.9/5</strong> from 800+ creators
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                <IconZap />
                Generate My Page — Free
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 px-6 py-3 rounded-xl font-semibold transition-all text-sm"
              >
                <IconLayout />
                View Templates
              </a>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-xs text-zinc-500">
              {["No credit card required", "Free forever plan", "Publish in seconds"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-emerald-400"><IconCheck /></span>{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div className="hidden lg:block">
            <MockDashboard />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-8">
            Trusted by 2,000+ digital creators worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: "2,000+", l: "Active Users" },
              { v: "12,000+", l: "Pages Created" },
              { v: "4.9", l: "Avg Rating" },
              { v: "< 60s", l: "Generation Time" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="text-2xl font-bold text-indigo-400">{v}</div>
                <div className="text-xs text-zinc-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-3">Simple Process</div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">Launch in 3 steps</h2>
            <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
              From zero to a live, converting page — faster than making a coffee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: <IconLayout />,
                title: "Choose a Template",
                desc: "Pick from professionally designed templates built for digital products.",
              },
              {
                step: "02",
                icon: <IconSparkles />,
                title: "Describe Your Product",
                desc: "Tell the AI about your offer in plain English. It writes all the copy for you.",
              },
              {
                step: "03",
                icon: <IconRocket />,
                title: "Publish Instantly",
                desc: "Hit publish and your page is live on a custom URL, ready to convert.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/15 text-indigo-400 flex items-center justify-center mb-5">
                  {icon}
                </div>
                <div className="text-xs font-mono text-zinc-600 mb-2 tracking-widest">{step}</div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-24 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-3">Templates</div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">Pick your perfect template</h2>
            <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
              Every template is conversion-optimized and fully customizable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {marketingTemplates.map((t) => <TemplateCard key={t.name} {...t} />)}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Browse all templates <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* AI POWER */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-4">Powered by AI</div>
              <h2 className="text-4xl font-bold tracking-tight text-zinc-50 mb-5">
                Copy that actually converts
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Our AI understands sales psychology. It crafts headlines, bullets, and CTAs
                engineered to convert your specific audience.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Conversion-optimized copy", desc: "Trained on thousands of high-converting pages from top creators." },
                  { title: "Proven structure",          desc: "Hero → social proof → offer → CTA. The framework, automated." },
                  { title: "Niche-aware tone",          desc: "Ebook, course, SaaS, coaching — the AI adapts style and structure." },
                  { title: "Instant generation",        desc: "Your complete page ready in under 60 seconds, every time." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mt-0.5">
                      <IconCheck />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-100">{title}</div>
                      <div className="text-sm text-zinc-500 mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 mt-9 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
              >
                <IconZap />
                Try it Free
              </Link>
            </div>

            {/* Prompt → output visual */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-2 font-medium">Your prompt</div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  &ldquo;I&rsquo;m selling a Notion productivity system for freelancers who struggle with time management.
                  Price: $27. Target: designers &amp; developers.&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-px h-6 bg-zinc-700" />
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-indigo-500/15">
                <div className="text-[10px] text-emerald-400 uppercase tracking-widest mb-2 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  AI output — ready to publish
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-4/5 bg-indigo-400/30 rounded-full" />
                  <div className="h-2 w-full bg-zinc-600 rounded-full" />
                  <div className="h-2 w-5/6 bg-zinc-700 rounded-full" />
                  <div className="h-2 w-3/4 bg-zinc-700 rounded-full" />
                  <div className="mt-3 w-24 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="h-1.5 w-14 bg-white/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">
              Everything you need to sell online
            </h2>
            <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
              From design to hosting — StefAI handles it all so you can focus on your product.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <IconZap />,        title: "One-Click Publish",      desc: "Go live instantly with a shareable URL. No setup required." },
              { icon: <IconLayout />,     title: "Modern Templates",       desc: "Templates designed for digital products and online creators." },
              { icon: <IconSmartphone />, title: "Fully Responsive",       desc: "Every page looks perfect on mobile, tablet, and desktop." },
              { icon: <IconSearch />,     title: "SEO-Ready",              desc: "Meta tags, Open Graph — all optimized out of the box." },
              { icon: <IconSliders />,    title: "Fully Customizable",     desc: "Edit colors, fonts, and copy with a simple visual editor." },
              { icon: <IconServer />,     title: "Fast Hosting Included",  desc: "Pages load under 1 second on our global CDN. No extra cost." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/15 text-indigo-400 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-zinc-100 text-sm mb-1.5">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">Simple, honest pricing</h2>
            <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
              Start free. Upgrade when you&rsquo;re ready to grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
              <div className="text-xs font-medium text-zinc-500 mb-2 uppercase tracking-widest">Starter</div>
              <div className="text-4xl font-bold text-zinc-50 mt-3 mb-0.5">$0</div>
              <div className="text-sm text-zinc-500 mb-7">Free forever</div>
              <div className="space-y-3 mb-8">
                {["3 published pages", "10 AI generations/mo", "5 templates", "StefAI subdomain", "Basic analytics"].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="text-emerald-400 shrink-0"><IconCheck /></span>{f}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-zinc-900 border border-indigo-500/30 rounded-2xl p-7 relative">
              <div className="absolute top-4 right-4 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <div className="text-xs font-medium text-indigo-400 mb-2 uppercase tracking-widest">Pro</div>
              <div className="text-4xl font-bold text-zinc-50 mt-3 mb-0.5">
                $19<span className="text-xl text-zinc-500">/mo</span>
              </div>
              <div className="text-sm text-zinc-500 mb-7">Billed monthly</div>
              <div className="space-y-3 mb-8">
                {["Unlimited pages", "Unlimited AI generations", "All templates", "Custom domain", "Advanced analytics", "Priority support", "Remove branding"].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-zinc-200">
                    <span className="text-indigo-400 shrink-0"><IconCheck /></span>{f}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Start Pro — 7 Days Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-2">
            <FaqItem
              q="Do I need design or coding skills?"
              a="Not at all. StefAI is designed for non-technical creators. You describe your product in plain English and the AI builds the entire page — headline, copy, structure — for you."
            />
            <FaqItem
              q="Can I edit the generated page?"
              a="Yes. Every element is editable through our visual editor. Change colors, fonts, copy — full control, no code."
            />
            <FaqItem
              q="Is hosting included?"
              a="Yes. Every page you publish is hosted on our global CDN at no extra cost. Starter users get a stefai.app subdomain. Pro users can connect their own custom domain."
            />
            <FaqItem
              q="Can I use my own domain?"
              a="Yes — on the Pro plan you can connect any domain you own. We provide simple DNS instructions and it typically takes just a few minutes."
            />
            <FaqItem
              q="How many pages can I create?"
              a="Free plan: up to 3 published pages. Pro: unlimited. You can also use unlimited AI generation credits to test different copy variations."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-4">Get started</div>
          <h2 className="text-5xl font-bold tracking-tight text-zinc-50 mb-5">
            Your page is 60 seconds away
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-9 max-w-lg mx-auto">
            Join 2,000+ creators who use StefAI to launch faster and grow their digital business.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-colors"
          >
            <IconZap />
            Start Free — No Card Needed
          </Link>
          <p className="mt-5 text-sm text-zinc-600">Free plan · No credit card · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <span className="font-bold text-zinc-100">StefAI</span>
            <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
              {["Templates", "Pricing", "Blog", "Privacy", "Terms"].map(l => (
                <a key={l} href="#" className="hover:text-zinc-300 transition">{l}</a>
              ))}
            </div>
            <div className="text-xs text-zinc-600">
              &copy; 2026 StefAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
