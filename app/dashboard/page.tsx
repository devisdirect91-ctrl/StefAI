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

const IconExternalLink = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function DashboardHome() {
  const [sites, setSites] = useState<Site[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase
        .from("landings")
        .select("id, content, style, type, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("landings")
        .select("*", { count: "exact", head: true }),
    ]).then(([{ data }, { count }]) => {
      setSites(data ?? []);
      setTotal(count ?? 0);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1 text-sm">Welcome back — ready to build something?</p>
        </div>
        <Link
          href="/dashboard/templates"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Page
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          {
            label: "Pages Created",
            value: loading ? "—" : String(total),
            sub: "total published",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            ),
          },
          {
            label: "Templates",
            value: String(templates.length),
            sub: "ready to use",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            ),
          },
          {
            label: "Generation Time",
            value: "< 60s",
            sub: "average per page",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            ),
          },
        ].map(({ label, value, sub, icon }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="mb-3">{icon}</div>
            <div className="text-2xl font-bold text-zinc-100">{value}</div>
            <div className="text-xs text-zinc-500 mt-1">{label}</div>
            <div className="text-[11px] text-zinc-600 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Recent pages */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-zinc-100">Recent Pages</h2>
        <Link href="/dashboard/sites" className="text-sm text-indigo-400 hover:text-indigo-300 transition">
          View all
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-44 animate-pulse" />
          ))}
        </div>
      ) : sites.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-14 text-center">
          <p className="text-zinc-500 text-sm mb-5">No pages yet. Pick a template and generate your first one.</p>
          <Link
            href="/dashboard/templates"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Browse Templates
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}

function SiteCard({ site }: { site: Site }) {
  const title = site.content?.hero?.title || "Untitled Page";
  const tpl = templates.find((t) => t.style === site.style);
  const date = site.created_at
    ? new Date(site.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all">
      {/* Mini preview */}
      <div className="h-24 relative overflow-hidden bg-zinc-800/50">
        <div className="absolute inset-3 rounded-xl border border-zinc-700/50 bg-zinc-900/80 p-2.5 flex flex-col gap-1.5">
          <div className="h-1.5 w-16 rounded-full bg-indigo-400/40" />
          <div className="h-1 w-24 bg-zinc-600 rounded-full" />
          <div className="h-1 w-20 bg-zinc-700 rounded-full" />
          <div className="mt-auto w-12 h-4 bg-indigo-600 rounded flex items-center justify-center text-[8px] font-medium text-white">
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
        </div>
      </div>
    </div>
  );
}
