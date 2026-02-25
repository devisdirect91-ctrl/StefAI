"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Site = {
  id: string;
  content: any;
  created_at: string;
};

type CourseStats = {
  views: number;
  sales: number;
  revenue: number;
  conversionRate: number;
};

function formatRevenue(cents: number): string {
  return "€" + (cents / 100).toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function CourseStatsPage() {
  const [courses, setCourses] = useState<Site[]>([]);
  const [stats, setStats] = useState<Record<string, CourseStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("landings")
      .select("id, content, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        const courseSites = (data ?? []).filter(
          (s: Site) => typeof s.content?.hero?.headline === "string"
        );
        setCourses(courseSites);

        if (courseSites.length === 0) {
          setLoading(false);
          return;
        }

        Promise.all(
          courseSites.map((s: Site) =>
            fetch(`/api/dashboard/course-stats?courseId=${s.id}`)
              .then((r) => r.json())
              .then((st) => ({ id: s.id, st }))
          )
        ).then((results) => {
          const map: Record<string, CourseStats> = {};
          results.forEach(({ id, st }) => { map[id] = st; });
          setStats(map);
          setLoading(false);
        });
      });
  }, []);

  const totals = courses.reduce(
    (acc, s) => {
      const st = stats[s.id];
      if (!st) return acc;
      return { views: acc.views + st.views, sales: acc.sales + st.sales, revenue: acc.revenue + st.revenue };
    },
    { views: 0, sales: 0, revenue: 0 }
  );

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Analytics</h1>
        <p className="text-zinc-500 mt-1 text-sm">Views, sales and revenue across your course pages.</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-16 animate-pulse" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-14 text-center">
          <p className="text-zinc-500 text-sm">No course pages yet.</p>
        </div>
      ) : (
        <>
          {/* Aggregate cards */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Views",   value: totals.views.toLocaleString() },
              { label: "Total Sales",   value: totals.sales.toLocaleString() },
              { label: "Total Revenue", value: formatRevenue(totals.revenue) },
              {
                label: "Avg Conversion",
                value: courses.length > 0 && totals.views > 0
                  ? ((totals.sales / totals.views) * 100).toFixed(1) + "%"
                  : "—",
              },
            ].map(({ label, value }) => (
              <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="text-2xl font-bold text-zinc-100">{value}</div>
                <div className="text-xs text-zinc-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Per-course table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_80px_80px_100px_80px] gap-4 px-5 py-3 border-b border-zinc-800">
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Course</div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider text-right">Views</div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider text-right">Sales</div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider text-right">Revenue</div>
              <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider text-right">Conv.</div>
            </div>

            {courses.map((site, i) => {
              const st = stats[site.id];
              const title = site.content?.hero?.headline ?? "Untitled Course";
              const date = new Date(site.created_at).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              });

              return (
                <div
                  key={site.id}
                  className={`grid grid-cols-[1fr_80px_80px_100px_80px] gap-4 items-center px-5 py-4 ${i !== 0 ? "border-t border-zinc-800" : ""} hover:bg-zinc-800/40 transition-colors`}
                >
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-100 font-medium truncate">{title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-zinc-600">{date}</span>
                      <a
                        href={`/site/${site.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 transition"
                      >
                        View page ↗
                      </a>
                    </div>
                  </div>

                  {!st ? (
                    <>
                      {[1,2,3,4].map(n => (
                        <div key={n} className="h-4 bg-zinc-800 rounded animate-pulse ml-auto w-10" />
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-zinc-100 text-right">{st.views.toLocaleString()}</div>
                      <div className="text-sm text-zinc-100 text-right">{st.sales.toLocaleString()}</div>
                      <div className="text-sm text-zinc-100 text-right">{formatRevenue(st.revenue)}</div>
                      <div className="text-sm text-right">
                        <span className={st.conversionRate > 0 ? "text-indigo-400" : "text-zinc-500"}>
                          {st.conversionRate.toFixed(1)}%
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
