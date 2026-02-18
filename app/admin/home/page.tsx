"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { HomeContent, HomeFeature } from "@/lib/types";

export default function AdminHomePage() {
  const [data, setData] = useState<HomeContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => setData(d.home));
  }, []);

  function handleChange(
    field: keyof HomeContent,
    value: string | string[] | HomeFeature[]
  ) {
    if (!data) return;
    setData({ ...data, [field]: value });
  }

  function handleFeatureChange(
    i: number,
    field: keyof HomeFeature,
    value: string | number
  ) {
    if (!data?.features) return;
    const f = [...data.features];
    f[i] = { ...f[i], [field]: value };
    setData({ ...data, features: f });
  }

  function addFeature() {
    if (!data) return;
    setData({
      ...data,
      features: [
        ...data.features,
        {
          id: String(Date.now()),
          title: "",
          description: "",
          order: data.features.length,
        },
      ],
    });
  }

  function removeFeature(i: number) {
    if (!data?.features) return;
    setData({ ...data, features: data.features.filter((_, j) => j !== i) });
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.home = data;
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
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Home</h1>
        <div className="space-y-6 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-atedia-sage">Teks Pembuka</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input
              type="text"
              value={data.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Welcome to"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <input
              type="text"
              value={data.heroSubtitle}
              onChange={(e) => handleChange("heroSubtitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Atedia Senior Center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 1 (teks pembuka)</label>
            <textarea
              value={data.introParagraph1 || ""}
              onChange={(e) => handleChange("introParagraph1", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 2</label>
            <textarea
              value={data.introParagraph2 || ""}
              onChange={(e) => handleChange("introParagraph2", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (kutipan)</label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder='"Berdaya, Berkarya & Bahagia"'
            />
          </div>
          <div>
            <AdminImageUpload
              label="Gambar Hero (cover home)"
              value={data.heroImage || ""}
              onChange={(url) => handleChange("heroImage", url)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={data.sectionTitle}
              onChange={(e) => handleChange("sectionTitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <AdminImageUpload
              label="Background section title (Meningkatkan Kualitas Hidup)"
              value={data.sectionTitleBackgroundImage || ""}
              onChange={(url) => handleChange("sectionTitleBackgroundImage", url)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle (Keistimewaan)</label>
            <input
              type="text"
              value={data.sectionSubtitle}
              onChange={(e) => handleChange("sectionSubtitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <h2 className="font-semibold text-atedia-sage pt-6">Mengapa Harus Atedia</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul section</label>
            <input
              type="text"
              value={data.mengapaHarusTitle || ""}
              onChange={(e) => handleChange("mengapaHarusTitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Mengapa Harus Atedia?"
            />
          </div>
          <div>
            <AdminImageUpload
              label="Gambar section (Mengapa Harus Atedia)"
              value={data.mengapaHarusImage || ""}
              onChange={(url) => handleChange("mengapaHarusImage", url)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daftar poin (bullet)</label>
            {(data.mengapaHarusBullets || []).map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <textarea
                  value={item}
                  onChange={(e) => {
                    const arr = [...(data.mengapaHarusBullets || [])];
                    arr[i] = e.target.value;
                    handleChange("mengapaHarusBullets", arr);
                  }}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Tempat tinggal yang menghadirkan ketenangan..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const arr = (data.mengapaHarusBullets || []).filter((_, j) => j !== i);
                    handleChange("mengapaHarusBullets", arr);
                  }}
                  className="text-red-600 text-sm shrink-0"
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleChange("mengapaHarusBullets", [...(data.mengapaHarusBullets || []), ""])}
              className="btn-secondary text-sm"
            >
              + Tambah poin
            </button>
          </div>

          <h2 className="font-semibold text-atedia-sage pt-4">Keistimewaan yang Kami Hadirkan</h2>
          {(data.features || []).map((f, i) => (
            <div key={f.id} className="border rounded-lg p-4 space-y-2">
              <input
                type="text"
                placeholder="Judul (Aman, Asri, Akrab)"
                value={f.title}
                onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Deskripsi"
                value={f.description}
                onChange={(e) => handleFeatureChange(i, "description", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
              <AdminImageUpload
                label="Gambar keistimewaan"
                value={f.image || ""}
                onChange={(url) => handleFeatureChange(i, "image", url)}
                compact
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="text-red-600 text-sm"
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" onClick={addFeature} className="btn-secondary">
            + Tambah Keistimewaan
          </button>

          {message && <p className="text-sm text-green-600">{message}</p>}
          <button type="button" onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </RequireAdmin>
  );
}
