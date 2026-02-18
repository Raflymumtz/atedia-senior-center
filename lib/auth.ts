import { cookies } from "next/headers";

const ADMIN_COOKIE = "atedia_admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "atedia2024";

export function getAdminToken(): string {
  return Buffer.from(ADMIN_PASSWORD + "_" + Date.now()).toString("base64");
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    return decoded.startsWith(ADMIN_PASSWORD + "_");
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(ADMIN_COOKIE)?.value;
  return !!token && verifyAdminToken(token);
}

export async function setAdminCookie(token: string) {
  const c = await cookies();
  c.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function removeAdminCookie() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
}
