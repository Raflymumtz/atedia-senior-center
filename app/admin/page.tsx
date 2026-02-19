"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => setAdmin(d.admin))
      .catch(() => setAdmin(false));
  }, []);

  useEffect(() => {
    if (admin === false) {
      router.replace("/admin/login");
    }
  }, [admin, router]);

  if (admin === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-atedia-brown">Memuat...</p>
      </div>
    );
  }

  if (!admin) return null;

  const sections = [
    { href: "/admin/home", label: "Home", desc: "Teks pembuka & Keistimewaan" },
    { href: "/admin/service", label: "Service", desc: "Hero, daftar layanan, Layanan Profesional Kami" },
    { href: "/admin/facilities", label: "Facilities", desc: "Fasilitas Kami & Lainnya" },
    { href: "/admin/activities", label: "Activities", desc: "Aktivitas & Galeri" },
    { href: "/admin/testimonials", label: "Testimoni", desc: "Testimoni warga" },
    { href: "/admin/about", label: "About Us", desc: "Tentang & kontak" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-atedia-brown mb-6">
        Dashboard Admin
      </h1>
      <p className="text-gray-600 mb-8">
        Pilih bagian yang ingin diedit. Perubahan akan langsung tampil di situs publik.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block p-4 bg-white rounded-lg shadow border border-gray-200 hover:border-atedia-sage hover:shadow-md transition"
          >
            <h2 className="font-semibold text-atedia-brown">{s.label}</h2>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
