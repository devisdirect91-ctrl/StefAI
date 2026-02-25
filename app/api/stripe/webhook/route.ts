import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Force Node.js runtime — Stripe crypto requires Node, not Edge
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// NOTE: In App Router, req.text() already reads the raw bytes without any JSON parsing.
// The Pages Router `export const config = { api: { bodyParser: false } }` does NOT apply here.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── Only POST is exported → Next.js automatically returns 405 for all other methods ──────────────

export async function POST(req: NextRequest) {
  console.log("[Stripe Webhook] ▶ Incoming POST");

  // 1. Read raw body — must NOT go through any JSON parser before verification
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.warn("[Stripe Webhook] ✗ Missing stripe-signature header");
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  // 2. Verify webhook signature with STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log(`[Stripe Webhook] ✓ Verified — type=${event.type}  id=${event.id}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    console.error("[Stripe Webhook] ✗ Signature error:", message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  // 3. Dispatch on event type
  switch (event.type) {

    // ── Connect: account fully onboarded ──────────────────────────────────────────────────────────
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      console.log(
        `[Stripe Webhook] account.updated — id=${account.id}` +
        `  charges_enabled=${account.charges_enabled}` +
        `  details_submitted=${account.details_submitted}`,
      );

      if (account.charges_enabled && account.details_submitted) {
        const admin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const { error } = await admin
          .from("users")
          .update({ stripeConnectStatus: "active" })
          .eq("stripeAccountId", account.id);

        if (error) {
          // Log but still return 200 — never let a DB error cause Stripe to retry forever
          console.error(
            `[Stripe Webhook] ✗ Supabase update failed for account ${account.id}:`,
            error,
          );
        } else {
          console.log(
            `[Stripe Webhook] ✓ stripeConnectStatus → "active" for account ${account.id}`,
          );
        }
      } else {
        console.log(
          `[Stripe Webhook] ↷ account.updated — conditions not met (charges_enabled=${account.charges_enabled}, details_submitted=${account.details_submitted}), skipping update`,
        );
      }
      break;
    }

    // ── Checkout: payment completed ────────────────────────────────────────────────────────────────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        `[Stripe Webhook] checkout.session.completed —` +
        `  session_id=${session.id}` +
        `  customer=${session.customer}` +
        `  amount_total=${session.amount_total}` +
        `  currency=${session.currency}` +
        `  payment_status=${session.payment_status}` +
        `  email=${session.customer_details?.email ?? "n/a"}`,
      );

      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );

      // Save to a `payments` table for payment tracking — create the table if it doesn't exist yet.
      const { error } = await admin.from("payments").insert({
        stripe_session_id:  session.id,
        customer_id:        session.customer,
        amount_total:       session.amount_total,
        currency:           session.currency,
        payment_status:     session.payment_status,
        customer_email:     session.customer_details?.email ?? null,
        metadata:           session.metadata,
        created_at:         new Date().toISOString(),
      });

      if (error) {
        console.error(
          `[Stripe Webhook] ✗ Failed to save session ${session.id} to Supabase:`,
          error,
        );
      } else {
        console.log(`[Stripe Webhook] ✓ Session ${session.id} saved to payments table`);
      }

      if (session.metadata?.courseId) {
        const { error: saleError } = await admin.from("course_sales").insert({
          course_id:         session.metadata.courseId,
          user_id:           session.metadata.userId || null,
          stripe_session_id: session.id,
          amount:            session.amount_total ?? 0,
          currency:          session.currency ?? "eur",
        });
        if (saleError) {
          console.error(`[Stripe Webhook] ✗ Failed to save course_sale for session ${session.id}:`, saleError);
        } else {
          console.log(`[Stripe Webhook] ✓ course_sales row inserted for course ${session.metadata.courseId}`);
        }
      }
      break;
    }

    // ── All other events — acknowledge without processing ─────────────────────────────────────────
    default:
      console.log(`[Stripe Webhook] ↷ Unhandled event type: ${event.type} — returning 200`);
  }

  // Always return 200 — any non-2xx causes Stripe to retry
  return NextResponse.json({ received: true }, { status: 200 });
}
