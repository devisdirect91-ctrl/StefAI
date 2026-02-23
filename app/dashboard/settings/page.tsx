"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type UserProfile = {
  stripeAccountId:    string | null;
  stripeConnectStatus: string | null;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const router = useRouter();

  const [profile,     setProfile]     = useState<UserProfile | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [connecting,  setConnecting]  = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  // ── Load user profile ──────────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("stripeAccountId, stripeConnectStatus")
        .eq("id", session.user.id)
        .maybeSingle();

      setProfile(
        data ?? { stripeAccountId: null, stripeConnectStatus: null },
      );
      setPageLoading(false);
    }

    load();
  }, [router]);

  // ── Connect handler ────────────────────────────────────────────────────────

  async function handleConnect() {
    setConnecting(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const res = await fetch("/api/stripe/connect", {
        method:  "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.status === 401) {
        setError("You must be logged in to connect Stripe.");
        return;
      }

      if (res.status === 500) {
        setError("Server error. Please try again later.");
        return;
      }

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        return;
      }

      // Redirect to Stripe onboarding
      window.location.href = json.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setConnecting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const isActive  = profile?.stripeConnectStatus === "active";
  const isPending = profile?.stripeConnectStatus === "pending";

  // Show nothing while redirecting unauthenticated users
  if (pageLoading) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-10">
        <div className="mb-10">
          <div className="h-7 w-32 bg-zinc-800 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-56 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="h-10 w-40 bg-zinc-800 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Settings</h1>
        <p className="text-zinc-500 mt-1 text-sm">Manage your account preferences.</p>
      </div>

      {/* Payments section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-zinc-100">Payments</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Connect your Stripe account to accept payments on your landing pages.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-5" />

        {isActive ? (
          /* ── Active state ── */
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0">
              <IconCheck />
            </span>
            <span className="text-sm text-zinc-300 font-medium">Stripe connected</span>
          </div>
        ) : (
          /* ── Not active (disconnected or pending) ── */
          <div className="space-y-3">
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {connecting ? "Redirecting to Stripe..." : "Connect Stripe"}
            </button>

            {isPending && !error && (
              <p className="text-xs text-zinc-500">
                Onboarding in progress. Complete the setup in Stripe to activate your account.
              </p>
            )}

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
