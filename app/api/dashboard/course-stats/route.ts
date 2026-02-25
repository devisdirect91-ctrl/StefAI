import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const [viewsResult, salesResult] = await Promise.all([
    admin
      .from("course_views")
      .select("id", { count: "exact", head: true })
      .eq("course_id", courseId),
    admin
      .from("course_sales")
      .select("amount")
      .eq("course_id", courseId),
  ]);

  const views   = viewsResult.count ?? 0;
  const sales   = salesResult.data?.length ?? 0;
  const revenue = salesResult.data?.reduce((sum, row) => sum + (row.amount ?? 0), 0) ?? 0;
  const conversionRate = views > 0 ? Math.round((sales / views) * 10000) / 100 : 0;

  return NextResponse.json({ views, sales, revenue, conversionRate });
}
