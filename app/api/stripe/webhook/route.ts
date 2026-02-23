import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── POST /api/stripe/webhook ─────────────────────────────────────────────────

export async function POST(req: Request) {
  // 1. Read raw body — must not be parsed before signature verification
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  // 2. Verify webhook signature
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    console.error("Stripe webhook signature error:", message);
    return Response.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // 3. Handle events
  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;

    // Derive status from Stripe's own flags — never trust frontend input
    const status: string =
      account.charges_enabled && account.details_submitted ? "active" : "pending";

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { error } = await admin
      .from("users")
      .update({ stripeConnectStatus: status })
      .eq("stripeAccountId", account.id);

    if (error) {
      // Log but still return 200 so Stripe doesn't retry indefinitely
      console.error("Failed to update stripeConnectStatus:", error);
    }
  }

  // Return 200 for all events (processed or not) to prevent Stripe retries
  return Response.json({ received: true });
}
