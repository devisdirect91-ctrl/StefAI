-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: add_stripe_connect
-- Creates the public.users profile table (if it doesn't exist) and adds
-- Stripe Connect fields.  Run this in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Create the users profile table linked to auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id                   UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "stripeAccountId"    TEXT,
  "stripeConnectStatus" TEXT        -- "pending" | "active" | "restricted"
);

-- 2. If the table already existed, add the columns idempotently
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS "stripeAccountId"     TEXT,
  ADD COLUMN IF NOT EXISTS "stripeConnectStatus" TEXT;

-- 3. Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies (drop first to make re-runs idempotent)
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;

-- Authenticated users can read their own row
CREATE POLICY "users_select_own"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Authenticated users can insert their own row
CREATE POLICY "users_insert_own"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Authenticated users can update their own row
CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- NOTE: The service role key (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS,
-- so the API routes that write Stripe data use it without needing extra policies.
