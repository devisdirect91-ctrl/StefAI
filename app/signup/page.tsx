"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage("Account created! Check your email to confirm.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="font-bold text-zinc-100 text-xl tracking-tight hover:text-zinc-300 transition">
            StefAI
          </Link>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl shadow-black/30">
          <div className="mb-7 text-center">
            <h1 className="text-xl font-bold text-zinc-100">Create your account</h1>
            <p className="text-sm text-zinc-500 mt-1">Start building pages for free — no card needed</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
              />
            </div>

            {message && (
              <div className={`rounded-xl px-4 py-3 text-sm ${
                isError
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium text-sm transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating account...
                </span>
              ) : "Create Free Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-zinc-600">
          By signing up you agree to our{" "}
          <a href="#" className="underline hover:text-zinc-400 transition">Terms</a> and{" "}
          <a href="#" className="underline hover:text-zinc-400 transition">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
