import { NextRequest, NextResponse } from "next/server";
import { loadData, saveData } from "@/lib/data";
import { isAdmin, getAdminToken, setAdminCookie, removeAdminCookie } from "@/lib/auth";
import type { SiteData } from "@/lib/types";

export async function GET() {
  const data = loadData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const data = body as SiteData;
    saveData(data);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
