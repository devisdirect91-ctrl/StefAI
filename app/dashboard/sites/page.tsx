"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { templates } from "@/lib/templates";

type Site = {
  id: string;
  content: any;
  style: string;
  type: string;
  created_at: string;
};

export default function MySitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase
      .from("landings")
      .select("id, content, style, type, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSites(data ?? []);
        setLoading(false);
      });
  }, []);

  async function handleDelete() {
    if (!confirmId) return;
    setDeleting(true);
    await supabase.from("landings").delete().eq("id", confirmId);
    setSites((prev) => prev.filter((s) => s.id !== confirmId));
    setDeleting(false);
    setConfirmId(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">My Sites</h1>
          <p className="text-zinc-500 mt-1 text-sm">
            {loading ? "Loading..." : `${sites.length} page${sites.length !== 1 ? "s" : ""} created`}
          </p>
        </div>
        <Link
          href="/dashboard/templates"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Page
        </Link>
      </div>

      {/* Confirmation dialog */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-2xl">
            <h2 className="text-zinc-100 font-semibold text-base mb-1">Delete this page?</h2>
            <p className="text-zinc-500 text-sm mb-6">This action is irreversible. The page will be permanently deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                disabled={deleting}
                className="flex-1 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-medium py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-medium py-2 rounded-xl transition-colors"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-52 animate-pulse" />
          ))}
        </div>
      ) : sites.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-16 text-center">
          <p className="text-zinc-500 text-sm mb-5">No pages yet. Create your first one!</p>
          <Link
            href="/dashboard/templates"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Browse Templates
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} onDelete={() => setConfirmId(site.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function SiteCard({ site, onDelete }: { site: Site; onDelete: () => void }) {
  const title = site.content?.hero?.title || "Untitled Page";
  const tpl = templates.find((t) => t.style === site.style);
  const date = site.created_at
    ? new Date(site.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all">
      {/* Mini preview */}
      <div className="h-28 relative overflow-hidden bg-zinc-800/50">
        <div className="absolute inset-3 rounded-xl border border-zinc-700/50 bg-zinc-900/80 p-2.5 flex flex-col gap-1.5">
          <div className="h-1.5 w-20 rounded-full bg-indigo-400/40" />
          <div className="h-1 w-28 bg-zinc-600 rounded-full" />
          <div className="h-1 w-24 bg-zinc-700 rounded-full" />
          <div className="mt-auto w-14 h-4 bg-indigo-600 rounded flex items-center justify-center text-[8px] font-medium text-white">
            Get Access
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-medium text-zinc-100 leading-snug line-clamp-2 flex-1">{title}</h3>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap">
            {tpl?.tag ?? site.type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-zinc-600">{date}</span>
          <div className="flex items-center gap-3">
            <a
              href={`/site/${site.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition flex items-center gap-1"
            >
              View
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button
              onClick={onDelete}
              className="text-zinc-600 hover:text-red-400 transition-colors"
              title="Delete"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
