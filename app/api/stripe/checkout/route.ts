import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function parsePrice(str: string): { amount: number; currency: string } {
  // Determine currency from symbol/code
  let currency = "eur";
  if (/\$|USD/i.test(str)) currency = "usd";
  else if (/£|GBP/i.test(str)) currency = "gbp";
  else if (/€|EUR/i.test(str)) currency = "eur";

  // Extract numeric value (handles "€97", "97€", "$197.00", etc.)
  const match = str.replace(/[^\d.]/g, "");
  const major = parseFloat(match) || 0;
  const amount = Math.round(major * 100); // convert to cents

  return { amount, currency };
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "courseId required" }, { status: 400 });
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await admin
      .from("landings")
      .select("content")
      .eq("id", courseId)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const content = data.content as Record<string, unknown>;
    const pricing = content?.pricing_section as Record<string, unknown> | undefined;
    const hero    = content?.hero as Record<string, unknown> | undefined;

    const priceStr    = (pricing?.price as string) ?? "€97";
    const productName = (hero?.headline as string) ?? "Course";
    const { amount, currency } = parsePrice(priceStr);

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amount,
            product_data: { name: productName },
          },
        },
      ],
      metadata: {
        courseId,
        userId: userId ?? "",
      },
      success_url: `${origin}/site/${courseId}?checkout=success`,
      cancel_url:  `${origin}/site/${courseId}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("[Stripe Checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
