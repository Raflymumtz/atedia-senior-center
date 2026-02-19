"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Testimoni, FacilitiesPageContent } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimoni[]>([]);
  const [heroImage, setHeroImage] = useState("");
  const [sections, setSections] = useState<FacilitiesPageContent>({});
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"hero" | "testimonials" | "video">("hero");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setItems((d.testimonials || []).sort((a: Testimoni, b: Testimoni) => a.order - b.order));
        setSections(d.testimonialsPage || {});
        setHeroImage(d.testimonialsHeroImage || "");
        setVideoUrl(d.testimonialsVideoUrl || "");
        setVideoTitle(d.testimonialsVideoTitle || "");
        setVideoDescription(d.testimonialsVideoDescription || "");
      });
  }, []);

  function update(i: number, field: keyof Testimoni, value: string | number) {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  }

  function add() {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        name: "",
        quote: "",
        role: "",
        order: items.length,
      },
    ]);
  }

  function remove(i: number) {
    setItems(items.filter((_, j) => j !== i));
  }

  function updateSection(field: keyof FacilitiesPageContent, value: string | string[]) {
    setSections({ ...sections, [field]: value });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.testimonials = items.map((s, i) => ({ ...s, order: i }));
      full.testimonialsPage = sections;
      full.testimonialsHeroImage = heroImage;
      full.testimonialsVideoUrl = videoUrl;
      full.testimonialsVideoTitle = videoTitle;
      full.testimonialsVideoDescription = videoDescription;
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

  return (
    <RequireAdmin>
      <div className="max-w-4xl mx-auto p-6">
        <Link href="/admin" className="text-sm text-atedia-sage hover:underline mb-4 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Testimoni</h1>
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            type="button"
            onClick={() => setTab("hero")}
            className={`px-4 py-2 rounded-lg ${tab === "hero" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Hero Section
          </button>
          <button
            type="button"
            onClick={() => setTab("testimonials")}
            className={`px-4 py-2 rounded-lg ${tab === "testimonials" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Testimoni
          </button>
          <button
            type="button"
            onClick={() => setTab("video")}
            className={`px-4 py-2 rounded-lg ${tab === "video" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Section Video
          </button>
        </div>

        {tab === "hero" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Hero Section</h2>
              <div className="space-y-4">
                <AdminImageUpload
                  label="Gambar Background Hero"
                  value={heroImage}
                  onChange={setHeroImage}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Hero (gunakan Enter untuk baris baru)</label>
                  <textarea
                    value={sections.heroTitle || ""}
                    onChange={(e) => updateSection("heroTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Kata Mereka&#10;Tentang Atedia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle Hero</label>
                  <input
                    type="text"
                    value={sections.heroSubtitle || ""}
                    onChange={(e) => updateSection("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Hero</label>
                  <textarea
                    value={sections.heroDescription || ""}
                    onChange={(e) => updateSection("heroDescription", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Dengarkan pengalaman dan apresiasi dari keluarga dan warga Atedia. Setiap cerita adalah bukti komitmen kami untuk memberikan perawatan terbaik dan menciptakan lingkungan yang penuh kasih sayang."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "testimonials" && (
        <div className="space-y-4">
          {items.map((t, i) => (
            <div key={t.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nama"
                value={t.name}
                onChange={(e) => update(i, "name", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Role (Keluarga Penghuni, Penghuni Atedia, dll)"
                value={t.role || ""}
                onChange={(e) => update(i, "role", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Kutipan testimoni"
                value={t.quote}
                onChange={(e) => update(i, "quote", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
              <AdminImageUpload
                label="Foto testimoni"
                value={t.image || ""}
                onChange={(url) => update(i, "image", url)}
                compact
              />
              <div className="flex justify-end">
                <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm">
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={add} className="btn-secondary">
            + Tambah Testimoni
          </button>
        </div>
        )}

        {tab === "video" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Section Video - Kisah Nyata Bersama Atedia</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Video YouTube</label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Masukkan URL lengkap video YouTube (contoh: https://www.youtube.com/watch?v=9qpuXothb-8)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Section</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Kisah Nyata Bersama Atedia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                    placeholder="Saksikan pengalaman langsung dari penghuni dan keluarga yang telah merasakan kenyamanan, perhatian, dan kualitas hidup yang lebih baik di Atedia Senior Center. Testimoni ini menggambarkan bagaimana Atedia menjadi rumah kedua yang hangat, aman, dan penuh kebersamaan."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {message && <p className="text-sm text-green-600">{message}</p>}
        <button type="button" onClick={save} disabled={saving} className="btn-primary">
          {saving ? "Menyimpan..." : "Simpan Semua"}
        </button>
      </div>
    </RequireAdmin>
  );
}
