import { NextRequest, NextResponse } from "next/server";
import { getAdminToken, setAdminCookie } from "@/lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "atedia2024";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }
    const token = getAdminToken();
    await setAdminCookie(token);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
