import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const ip_hash = createHash("sha256").update(ip).digest("hex");

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    await admin.from("course_views").insert({ course_id: courseId, ip_hash });
  } catch {
    // never throw to the client
  }

  return NextResponse.json({ success: true });
}
