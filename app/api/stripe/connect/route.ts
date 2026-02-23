import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Supabase client that uses the service role key — bypasses RLS for writes. */
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/** Verify the Bearer token and return the authenticated user, or null. */
async function getAuthenticatedUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

// ── POST /api/stripe/connect ─────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // 1. Require authentication
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = adminClient();

    // 2. Look up existing Stripe account for this user
    const { data: profile } = await admin
      .from("users")
      .select("stripeAccountId")
      .eq("id", user.id)
      .maybeSingle();

    let accountId: string | null = profile?.stripeAccountId ?? null;

    // 3. If no account yet, create an Express account and persist it
    if (!accountId) {
      const account = await stripe.accounts.create({ type: "express" });
      accountId = account.id;

      const { error: upsertError } = await admin
        .from("users")
        .upsert({
          id: user.id,
          stripeAccountId: accountId,
          stripeConnectStatus: "pending",
        });

      if (upsertError) {
        console.error("Failed to persist Stripe account:", upsertError);
        return Response.json({ error: "Database error" }, { status: 500 });
      }
    }

    // 4. Create an Account Link for onboarding
    const appUrl = process.env.APP_URL!;
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/dashboard/settings`,
      return_url: `${appUrl}/dashboard/settings`,
      type: "account_onboarding",
    });

    return Response.json({ url: accountLink.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("Stripe connect error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
