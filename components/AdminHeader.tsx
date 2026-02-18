"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="bg-atedia-brown text-white py-4 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/admin" className="font-semibold">
          Atedia Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            Lihat Situs
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-white/80 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
