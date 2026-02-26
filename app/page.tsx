import Link from "next/link";
import Image from "next/image";

/* ── Icons ──────────────────────────────────────────────────────────── */
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconZap = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Course page mockup ─────────────────────────────────────────────── */
function CoursePagePreview() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/60">
        {/* Browser bar */}
        <div className="bg-zinc-900 px-4 py-3 flex items-center gap-2 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <div className="mx-auto bg-zinc-800 rounded px-4 py-1 text-xs text-zinc-500 font-mono w-44 text-center truncate">
            landifai.app/ma-formation
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">Live</span>
          </div>
        </div>

        {/* Page content preview */}
        <div className="bg-zinc-950 px-5 py-6 space-y-5">

          {/* Hero section mockup */}
          <div className="text-center space-y-2.5">
            <div className="h-1.5 w-20 bg-indigo-400/40 rounded-full mx-auto" />
            <div className="space-y-1.5">
              <div className="h-4 w-52 bg-zinc-100/80 rounded-full mx-auto" />
              <div className="h-4 w-40 bg-zinc-200/60 rounded-full mx-auto" />
            </div>
            <div className="h-2 w-44 bg-zinc-600 rounded-full mx-auto" />
            <div className="h-2 w-36 bg-zinc-700 rounded-full mx-auto" />
            <div className="mx-auto w-32 h-9 bg-indigo-600 rounded-xl mt-4 flex items-center justify-center gap-1.5">
              <div className="h-1.5 w-18 bg-white/50 rounded-full" />
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-2">
            {["8 modules", "4.9/5", "Accès à vie"].map((label, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-center">
                <div className="h-2.5 w-12 bg-indigo-400/30 rounded-full mx-auto mb-1.5" />
                <div className="h-1.5 w-10 bg-zinc-700 rounded-full mx-auto" />
              </div>
            ))}
          </div>

          {/* Module list */}
          <div className="space-y-1.5">
            <div className="h-1.5 w-16 bg-zinc-600 rounded-full mb-2" />
            {[52, 40, 36].map((w, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-indigo-500/15 border border-indigo-500/20 shrink-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <div className={`h-2 w-${w} bg-zinc-600 rounded-full`} />
              </div>
            ))}
          </div>

          {/* Pricing card */}
          <div className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-4 text-center space-y-2.5">
            <div className="h-6 w-16 bg-zinc-200/60 rounded-full mx-auto" />
            <div className="h-2 w-28 bg-zinc-700 rounded-full mx-auto" />
            <div className="mx-auto w-36 h-9 bg-indigo-600 rounded-xl" />
          </div>

        </div>
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
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="LandifAI" width={28} height={28} className="shrink-0" />
            <span className="font-bold text-zinc-100 text-lg tracking-tight">LandifAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm text-zinc-500">
            <a href="#how-it-works" className="hover:text-zinc-200 transition">How it works</a>
            <a href="#pricing" className="hover:text-zinc-200 transition">Pricing</a>
            <a href="#faq" className="hover:text-zinc-200 transition">FAQ</a>
          </div>

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
        <div className="relative max-w-5xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Built for course creators
            </div>

            <h1 className="text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-zinc-50 mb-5">
              Your course deserves<br />
              <span className="text-indigo-400">a great sales page</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-md">
              Describe your course in a few sentences. LandifAI creates a complete, professional page ready to share — in under 2 minutes.
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

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                <IconZap />
                Create my page — Free
              </Link>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-xs text-zinc-500">
              {["No credit card required", "No design skills needed", "Live in minutes"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-emerald-400"><IconCheck /></span>{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div className="hidden lg:block">
            <CoursePagePreview />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-8">
            Trusted by 2,000+ creators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: "2,000+", l: "Creators" },
              { v: "12,000+", l: "Pages Created" },
              { v: "4.9/5",   l: "Average rating" },
              { v: "< 2 min", l: "To go live" },
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
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-3">How it works</div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">3 steps and you&rsquo;re live</h2>
            <p className="mt-3 text-zinc-400 max-w-md mx-auto">
              No setup. No designer. No stress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Tell us about your course",
                desc: "Answer a few simple questions — your topic, your audience, your price. Takes about 60 seconds.",
              },
              {
                step: "2",
                title: "AI builds your page",
                desc: "LandifAI writes all the copy and assembles a complete, professional page. No blank page syndrome.",
              },
              {
                step: "3",
                title: "Share it and start selling",
                desc: "Hit publish and get your link instantly. Share it anywhere — social media, emails, everywhere.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 relative">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/15 text-indigo-400 flex items-center justify-center mb-5 text-base font-bold">
                  {step}
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              Try it now — it&rsquo;s free <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY STEFAI */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">
              Everything you need, nothing you don&rsquo;t
            </h2>
            <p className="mt-3 text-zinc-400 max-w-lg mx-auto">
              We built LandifAI for people who have great knowledge to share — not for developers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Ready in minutes",
                desc: "From zero to a live page in under 2 minutes. Seriously — we timed it.",
              },
              {
                title: "Looks professional",
                desc: "Clean, modern design that builds trust with your visitors before they even read a word.",
              },
              {
                title: "Works on every phone",
                desc: "Most of your students will find you on mobile. Your page looks great everywhere.",
              },
              {
                title: "Edit whenever you want",
                desc: "Change your price, update a module, tweak your copy — anytime, in seconds.",
              },
              {
                title: "Hosting included",
                desc: "Your page is online the moment you hit publish. No extra accounts, no extra fees.",
              },
              {
                title: "Share anywhere",
                desc: "One link you can drop in your bio, your emails, or your stories. Simple as that.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mb-4" />
                <h3 className="font-semibold text-zinc-100 text-sm mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">Start free, upgrade when ready</h2>
            <p className="mt-3 text-zinc-400 max-w-md mx-auto">
              No subscription required to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
              <div className="text-xs font-medium text-zinc-500 mb-2 uppercase tracking-widest">Starter</div>
              <div className="text-4xl font-bold text-zinc-50 mt-3 mb-0.5">$0</div>
              <div className="text-sm text-zinc-500 mb-7">Free forever</div>
              <div className="space-y-3 mb-8">
                {[
                  "3 published pages",
                  "10 AI generations / month",
                  "LandifAI subdomain",
                  "Mobile-friendly pages",
                  "Instant publish",
                ].map(f => (
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
                Most popular
              </div>
              <div className="text-xs font-medium text-indigo-400 mb-2 uppercase tracking-widest">Pro</div>
              <div className="text-4xl font-bold text-zinc-50 mt-3 mb-0.5">
                $19<span className="text-xl text-zinc-500">/mo</span>
              </div>
              <div className="text-sm text-zinc-500 mb-7">Billed monthly</div>
              <div className="space-y-3 mb-8">
                {[
                  "Unlimited pages",
                  "Unlimited AI generations",
                  "Custom domain",
                  "Remove LandifAI branding",
                  "Priority support",
                  "Advanced analytics",
                ].map(f => (
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
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-50">
              Questions
            </h2>
          </div>
          <div className="space-y-2">
            <FaqItem
              q="Do I need design or tech skills?"
              a="Not at all. If you can write a few sentences about your course, you have everything you need. LandifAI handles the design, the copy, and the layout."
            />
            <FaqItem
              q="How long does it take to create a page?"
              a="Most creators go live in under 2 minutes. You answer a few questions, the AI generates your page, you hit publish."
            />
            <FaqItem
              q="Can I change things after it's published?"
              a="Yes, anytime. Update your price, add a module, change the headline — edits go live instantly."
            />
            <FaqItem
              q="Where will my page be hosted?"
              a="LandifAI hosts everything for you. Free plan gets a landifai.app link. Pro plan lets you connect your own domain."
            />
            <FaqItem
              q="Can I use my own domain name?"
              a="Yes, on the Pro plan. We'll guide you through the setup — it usually takes less than 5 minutes."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold tracking-tight text-zinc-50 mb-5">
            Ready to sell your course?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-9 max-w-md mx-auto">
            Create your page today. It takes 2 minutes and it&rsquo;s completely free to start.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-colors"
          >
            <IconZap />
            Create my page — Free
          </Link>
          <p className="mt-5 text-sm text-zinc-600">No credit card · No design skills needed · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <span className="flex items-center gap-2">
              <Image src="/logo.png" alt="LandifAI" width={22} height={22} className="opacity-80" />
              <span className="font-bold text-zinc-100">LandifAI</span>
            </span>
            <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
              {["Pricing", "Privacy", "Terms"].map(l => (
                <a key={l} href="#" className="hover:text-zinc-300 transition">{l}</a>
              ))}
            </div>
            <div className="text-xs text-zinc-600">
              &copy; 2026 LandifAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
