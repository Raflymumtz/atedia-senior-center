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
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/admin" className="text-sm text-atedia-sage hover:underline mb-4 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit About Us</h1>
        <div className="space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (section dekoratif daun)</label>
            <input
              type="text"
              value={data.tagline || ""}
              onChange={(e) => handleChange("tagline", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Meningkatkan Kualitas Hidup dengan Perawatan Profesional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
            <textarea
              value={data.mission || ""}
              onChange={(e) => handleChange("mission", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
            <textarea
              value={data.vision || ""}
              onChange={(e) => handleChange("vision", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <input
              type="text"
              value={data.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
            <input
              type="text"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Operasi</label>
            <input
              type="text"
              value={data.hours || ""}
              onChange={(e) => handleChange("hours", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Senin - Sabtu (08.00 - 17.00)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp (tanpa +)</label>
            <input
              type="text"
              value={data.whatsapp || ""}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="6281234567890"
            />
          </div>
          <div>
            <AdminImageUpload
              label="Gambar Banner (hero About Us)"
              value={data.footerBannerImage || ""}
              onChange={(url) => handleChange("footerBannerImage", url)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Embed Google Maps (iframe peta)</label>
            <input
              type="text"
              value={data.mapEmbedUrl || ""}
              onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://www.google.com/maps?q=...&output=embed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Get Directions (tombol di footer)</label>
            <input
              type="text"
              value={data.directionsUrl || ""}
              onChange={(e) => handleChange("directionsUrl", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Informasi (untuk footer)</label>
            {(data.infoItems || []).map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleInfoItemChange(i, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Program Harian Berkualitas"
                />
                <button type="button" onClick={() => removeInfoItem(i)} className="text-red-600 text-sm">
                  Hapus
                </button>
              </div>
            ))}
            <button type="button" onClick={addInfoItem} className="btn-secondary text-sm">
              + Tambah Item
            </button>
          </div>
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button type="button" onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </RequireAdmin>
  );
}
