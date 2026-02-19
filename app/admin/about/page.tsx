"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { AboutContent } from "@/lib/types";

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => setData(d.about));
  }, []);

  function handleChange(field: keyof AboutContent, value: string | string[]) {
    if (!data) return;
    setData({ ...data, [field]: value });
  }

  function handleInfoItemChange(i: number, value: string) {
    if (!data?.infoItems) return;
    const items = [...data.infoItems];
    items[i] = value;
    setData({ ...data, infoItems: items });
  }

  function addInfoItem() {
    if (!data) return;
    setData({
      ...data,
      infoItems: [...(data.infoItems || []), ""],
    });
  }

  function removeInfoItem(i: number) {
    if (!data?.infoItems) return;
    setData({
      ...data,
      infoItems: data.infoItems.filter((_, j) => j !== i),
    });
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.about = data;
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(full),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setMessage("Berhasil disimpan.");
    } catch {
      setMessage("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  if (!data) {
    return (
      <RequireAdmin>
        <div className="flex justify-center p-12">Memuat...</div>
      </RequireAdmin>
    );
  }

  return (
    <RequireAdmin>
      <div className="max-w-4xl mx-auto p-6">
        <Link href="/admin" className="text-sm text-atedia-sage hover:underline mb-4 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit About Us</h1>
        
        <div className="space-y-6">
          {/* Hero/Banner Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-atedia-brown mb-4 pb-2 border-b border-gray-200">
              Hero Section (Header dengan Background Gelap)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="Tentang Atedia Senior Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={data.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  rows={4}
                  placeholder="Di Atedia, kami percaya masa tua adalah anugerah..."
                />
              </div>
              <div>
                <AdminImageUpload
                  label="Gambar Banner Background (untuk hero section)"
                  value={data.footerBannerImage || ""}
                  onChange={(url) => handleChange("footerBannerImage", url)}
                />
                <p className="text-xs text-gray-500 mt-1">Gambar ini akan digunakan sebagai background gelap di header section</p>
              </div>
            </div>
          </div>

          {/* Informasi Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-atedia-brown mb-4 pb-2 border-b border-gray-200">
              Section Informasi (Kolom Kiri dengan Checkmark Hijau)
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daftar Informasi (akan ditampilkan dengan checkmark hijau)
              </label>
              <div className="space-y-2 mb-3">
                {(data.infoItems || []).map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-atedia-sage flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInfoItemChange(i, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                      placeholder="Program harian & aktivitas sosial"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeInfoItem(i)} 
                      className="text-red-600 hover:text-red-700 text-sm px-2 py-1"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addInfoItem} className="btn-secondary text-sm">
                + Tambah Item Informasi
              </button>
            </div>
          </div>

          {/* Kontak Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-atedia-brown mb-4 pb-2 border-b border-gray-200">
              Section Kontak (Kolom Kanan dengan Ikon)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-atedia-sage">📍</span> Alamat
                </label>
                <input
                  type="text"
                  value={data.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="Alamat lengkap Atedia Senior Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-atedia-sage">📞</span> Telepon
                </label>
                <input
                  type="text"
                  value={data.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-atedia-sage">✉️</span> Email
                </label>
                <input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="info@atediaseniorcenter.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-atedia-sage">🕐</span> Jam Operasi
                </label>
                <input
                  type="text"
                  value={data.hours || ""}
                  onChange={(e) => handleChange("hours", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="Senin-Sabtu (08.00-17.00)"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp (untuk tombol WhatsApp)
              </label>
              <input
                type="text"
                value={data.whatsapp || ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                placeholder="6281234567890 (tanpa +)"
              />
              <p className="text-xs text-gray-500 mt-1">Format: 6281234567890 (tanpa tanda +)</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Get Directions (untuk tombol Get Directions)
              </label>
              <input
                type="text"
                value={data.directionsUrl || ""}
                onChange={(e) => handleChange("directionsUrl", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-atedia-brown mb-4 pb-2 border-b border-gray-200">
              Peta Google Maps
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Embed Google Maps (iframe)
              </label>
              <input
                type="text"
                value={data.mapEmbedUrl || ""}
                onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                placeholder="https://www.google.com/maps?q=...&output=embed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Dapatkan URL embed dari Google Maps: Buka lokasi di Google Maps → Bagikan → Sematkan peta → Salin URL iframe
              </p>
            </div>
          </div>

          {/* Additional Settings (Opsional) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-atedia-brown mb-4 pb-2 border-b border-gray-200">
              Pengaturan Tambahan (Opsional)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline (untuk section dekoratif)
                </label>
                <input
                  type="text"
                  value={data.tagline || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="Meningkatkan Kualitas Hidup dengan Perawatan Profesional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
                <textarea
                  value={data.mission || ""}
                  onChange={(e) => handleChange("mission", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                <textarea
                  value={data.vision || ""}
                  onChange={(e) => handleChange("vision", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar background footer (opsional)
                </label>
                <AdminImageUpload
                  value={data.footerBackgroundImage || ""}
                  onChange={(url) => handleChange("footerBackgroundImage", url)}
                  compact
                />
                <p className="text-xs text-gray-500 mt-1">
                  Kosongkan untuk warna solid. Jika diisi, gambar dipakai dengan overlay gelap agar teks terbaca.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna background footer (hex, opsional)
                </label>
                <input
                  type="text"
                  value={data.footerBackgroundColor || ""}
                  onChange={(e) => handleChange("footerBackgroundColor", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-atedia-sage focus:border-atedia-sage"
                  placeholder="#5c4a3d (kosongkan = default cokelat)"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white p-6 rounded-xl shadow">
            {message && (
              <p className={`text-sm mb-4 ${message.includes("Berhasil") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <button 
              type="button" 
              onClick={save} 
              disabled={saving} 
              className="btn-primary w-full md:w-auto"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
}
