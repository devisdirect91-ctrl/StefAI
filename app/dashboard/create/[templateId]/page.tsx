"use client";

import { useParams } from "next/navigation";
import { templates } from "@/lib/templates";
import { useState } from "react";
import Link from "next/link";
import LandingRenderer from "@/components/LandingRenderer";
import GeneratingOverlay from "@/components/GeneratingOverlay";
import ChatEditor from "@/components/ChatEditor";
import StylePanel from "@/components/StylePanel";
import CourseWizard from "@/components/CourseWizard";
import CourseLandingTemplate from "@/components/CourseLandingTemplate";
import type { CourseAIContent } from "@/components/CourseLandingTemplate";
import type { CourseData } from "@/components/course-template/types";
import type { CourseContent } from "@/types/landing";
import { styleToTheme, DEFAULT_SETTINGS } from "@/lib/landing";
import type { LandingData, LandingContent, LandingTheme } from "@/types/landing";

type SidebarTab = "content" | "style";

// ── Map AI content → legacy CourseContent for publishing ─────────────────────
// (CourseRenderer used by the published site consumes CourseContent)

function mapAIContentToCourseContent(ai: CourseAIContent): CourseContent {
  return {
    hero: {
      title:        ai.hero.headline,
      subtitle:     ai.hero.subheadline,
      cta:          ai.pricing_section.cta,
      secondaryCta: "Voir le programme",
    },
    stats: [
      { value: String(ai.modules.length), label: "Modules" },
      { value: "12h+",       label: "De contenu" },
      { value: "Accès à vie", label: "Sans expiration" },
      { value: "4.9 / 5",   label: "Note moyenne" },
    ],
    outcomes: ai.transformation_section.benefits,
    modules: ai.modules.map((m) => ({
      title:       m.title,
      description: m.description,
      lessons:     [m.outcome].filter(Boolean),
    })),
    instructor: {
      name:        "Formateur Expert",
      bio:         ai.transformation_section.title,
      credentials: [],
    },
    testimonials: ai.testimonials.map((t) => ({
      name: t.name,
      role: t.result,
      text: t.quote,
    })),
    pricing: {
      price:     ai.pricing_section.price,
      period:    "paiement unique",
      features:  ai.pricing_section.features,
      cta:       ai.pricing_section.cta,
      guarantee: ai.pricing_section.justification,
    },
    faq: ai.faq,
  };
}

// ── Preview chrome wrappers ──────────────────────────────────────────────────

function DesktopChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/40">
      <div className="bg-zinc-900 h-9 flex items-center px-4 gap-3 border-b border-zinc-800">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 bg-zinc-800 rounded h-5 flex items-center px-3 max-w-xs">
          <span className="text-[11px] text-zinc-500 truncate">stefai.app/site/...</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function MobileChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        <div className="w-[390px] bg-zinc-800 rounded-[48px] border-[6px] border-zinc-700 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="bg-black flex items-center justify-center h-10">
            <div className="w-28 h-[22px] bg-black rounded-full border border-zinc-700" />
          </div>
          <div className="h-[760px] overflow-y-auto overscroll-contain">
            {children}
          </div>
          <div className="bg-black h-8 flex items-center justify-center">
            <div className="w-28 h-[4px] bg-zinc-600 rounded-full" />
          </div>
        </div>
        <div className="absolute -right-[9px] top-20 w-[5px] h-12 bg-zinc-700 rounded-r-sm" />
        <div className="absolute -left-[9px] top-16 w-[5px] h-8 bg-zinc-700 rounded-l-sm" />
        <div className="absolute -left-[9px] top-28 w-[5px] h-12 bg-zinc-700 rounded-l-sm" />
        <div className="absolute -left-[9px] top-44 w-[5px] h-12 bg-zinc-700 rounded-l-sm" />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const { templateId } = useParams<{ templateId: string }>();
  const template = templates.find((t) => t.id === templateId);

  // Generic template state
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [landingData, setLandingData]  = useState<LandingData | null>(null);

  // Course-pro state — AI-generated preview
  const [coursePreview, setCoursePreview] = useState<CourseAIContent | null>(null);
  const [courseTitle, setCourseTitle]     = useState<string>("");
  const [publishLoading, setPublishLoading] = useState(false);

  // Shared UI state
  const [loading, setLoading]               = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [publishedId, setPublishedId]       = useState<string | null>(null);
  const [previewMode, setPreviewMode]       = useState<"desktop" | "mobile">("desktop");
  const [sidebarTab, setSidebarTab]         = useState<SidebarTab>("content");

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Template not found.</p>
          <Link href="/dashboard/templates" className="text-indigo-400 hover:text-indigo-300 text-sm transition">
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const isCourseTemplate = template.id === "course-pro";

  // ── Handlers ──────────────────────────────────────────────────────────────

  /** Generic form → AI → preview (SaaS / eBook) */
  const handleGenerate = async () => {
    if (!productName.trim() || !description.trim()) return;
    setLoading(true);
    setOverlayVisible(true);

    const res  = await fetch("/api/generate", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ templateId: template.id, productName, description }),
    });

    const data = await res.json();
    setLandingData({
      content:  data.content,
      theme:    styleToTheme(data.template?.style),
      settings: { ...DEFAULT_SETTINGS, productName },
    });
    setLoading(false);
  };

  /** Course wizard → AI interpretation → preview */
  const handleGenerateFromWizard = async (answers: CourseData) => {
    setCourseTitle(answers.title);
    setLoading(true);
    setOverlayVisible(true);

    const res = await fetch("/api/generate-course", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ templateId: template.id, ...answers }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert((err as { error?: string }).error ?? "Generation failed. Please try again.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setCoursePreview(data.content as CourseAIContent);
    setLoading(false);
  };

  /** Publish course — map AI content → CourseContent then save */
  const handlePublishCourse = async () => {
    if (!coursePreview) return;
    setPublishLoading(true);

    const publishPayload: LandingData = {
      // Cast needed because LandingContent only covers SaasContent at the type level,
      // but CourseContent is handled at runtime by CourseRenderer.
      content:  mapAIContentToCourseContent(coursePreview) as unknown as LandingContent,
      theme:    styleToTheme("course-pro"),
      settings: { ...DEFAULT_SETTINGS, productName: courseTitle },
    };

    const pubRes  = await fetch("/api/publish", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(publishPayload),
    });
    const pubData = await pubRes.json();

    if (!pubRes.ok || !pubData.id) {
      alert(pubData.error ?? "Publish failed. Please try again.");
      setPublishLoading(false);
      return;
    }

    setPublishedId(pubData.id);
    setPublishLoading(false);
  };

  /** Publish generic landing page */
  const handlePublish = async () => {
    const res  = await fetch("/api/publish", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(landingData),
    });
    const data = await res.json();
    if (!res.ok || !data.id) {
      alert(data.error ?? "Publish failed. Please try again.");
      return;
    }
    setPublishedId(data.id);
  };

  const handleContentChange = (c: unknown) =>
    setLandingData((prev) =>
      prev ? { ...prev, content: c as LandingData["content"] } : prev,
    );

  const handleThemeChange = (theme: LandingTheme) =>
    setLandingData((prev) => (prev ? { ...prev, theme } : prev));

  const canGenerate = productName.trim() && description.trim();

  // ── Derived visibility ─────────────────────────────────────────────────────
  const showWizard         = isCourseTemplate && !coursePreview;
  const showCoursePreview  = isCourseTemplate && !!coursePreview;
  const showForm           = !isCourseTemplate && !landingData;
  const showLandingPreview = !isCourseTemplate && !!landingData;

  // ── Preview toolbar (shared) ───────────────────────────────────────────────
  const PreviewModeToggle = () => (
    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
      {(["desktop", "mobile"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => setPreviewMode(mode)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
            previewMode === mode
              ? "bg-zinc-800 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {mode === "desktop" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
          )}
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );

  // ── Published banner (shared) ──────────────────────────────────────────────
  const PublishedBanner = () =>
    publishedId ? (
      <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Your page is live
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`/site/${publishedId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            View Site
          </a>
          <Link href="/dashboard/sites" className="text-sm text-zinc-500 hover:text-zinc-200 transition">
            My Sites
          </Link>
        </div>
      </div>
    ) : null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      {overlayVisible && (
        <GeneratingOverlay done={!loading} onFinished={() => setOverlayVisible(false)} />
      )}

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-600 mb-8">
          <Link href="/dashboard/templates" className="hover:text-zinc-400 transition">
            Templates
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400">{template.name}</span>
        </div>

        {/* Template header */}
        <div className="flex items-center gap-4 mb-9">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/15 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-zinc-100">{template.name}</h1>
              <span className="text-xs font-medium border border-indigo-500/25 bg-indigo-500/10 text-indigo-400 rounded-full px-2.5 py-0.5">
                {template.tag}
              </span>
            </div>
            <p className="text-sm text-zinc-500 mt-0.5">{template.description}</p>
          </div>
        </div>

        {/* ── COURSE: wizard ─────────────────────────────────────────────── */}
        {showWizard && (
          <CourseWizard onComplete={handleGenerateFromWizard} loading={loading} />
        )}

        {/* ── COURSE: AI-structured preview ──────────────────────────────── */}
        {showCoursePreview && coursePreview && (
          <div>
            <PublishedBanner />

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <PreviewModeToggle />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCoursePreview(null); setPublishedId(null); }}
                  className="text-sm text-zinc-500 hover:text-zinc-200 transition"
                >
                  Modifier les réponses
                </button>
                <button
                  onClick={handlePublishCourse}
                  disabled={publishLoading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  {publishLoading ? (
                    <>
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Publishing…
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {publishedId ? "Re-publish" : "Publish"}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview — full width, no sidebar */}
            {previewMode === "desktop" && (
              <DesktopChrome>
                <CourseLandingTemplate data={coursePreview} />
              </DesktopChrome>
            )}
            {previewMode === "mobile" && (
              <MobileChrome>
                <CourseLandingTemplate data={coursePreview} />
              </MobileChrome>
            )}
          </div>
        )}

        {/* ── GENERIC: form ──────────────────────────────────────────────── */}
        {showForm && (
          <div className="max-w-2xl">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-6">
              Describe your product
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Product Name
                </label>
                <input
                  placeholder="e.g. Productivity Masterclass 2025"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your product, target audience, key benefits, expected results..."
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!canGenerate || loading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate My Page
              </button>
            </div>
          </div>
        )}

        {/* ── GENERIC: preview + editor ──────────────────────────────────── */}
        {showLandingPreview && landingData && (
          <div>
            <PublishedBanner />

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <PreviewModeToggle />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setLandingData(null); setPublishedId(null); }}
                  className="text-sm text-zinc-500 hover:text-zinc-200 transition"
                >
                  Edit form
                </button>
                <button
                  onClick={handlePublish}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  {publishedId ? "Re-publish" : "Publish"}
                </button>
              </div>
            </div>

            {/* Preview + Sidebar */}
            <div className="flex gap-5 items-start">

              {/* Live preview */}
              <div className="flex-1 min-w-0">
                {previewMode === "desktop" && (
                  <DesktopChrome>
                    <LandingRenderer data={landingData} />
                  </DesktopChrome>
                )}
                {previewMode === "mobile" && (
                  <MobileChrome>
                    <LandingRenderer data={landingData} isMobile />
                  </MobileChrome>
                )}
              </div>

              {/* Right sidebar */}
              <div className="w-80 shrink-0 sticky top-6">
                <div className="flex border-b border-zinc-800 bg-zinc-900 rounded-t-2xl">
                  {([
                    { id: "content", label: "Content" },
                    { id: "style",   label: "Style" },
                  ] as { id: SidebarTab; label: string }[]).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSidebarTab(tab.id)}
                      className={`flex-1 py-3 text-xs font-medium transition-all border-b-2 -mb-px ${
                        sidebarTab === tab.id
                          ? "text-zinc-100 border-indigo-500"
                          : "text-zinc-500 border-transparent hover:text-zinc-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div>
                  {sidebarTab === "content" && (
                    <ChatEditor
                      content={landingData.content}
                      onContentChange={handleContentChange}
                    />
                  )}
                  {sidebarTab === "style" && (
                    <StylePanel
                      theme={landingData.theme}
                      onChange={handleThemeChange}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
