"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Activity, GalleryImage, FacilitiesPageContent } from "@/lib/types";

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [heroImage, setHeroImage] = useState("");
  const [sections, setSections] = useState<FacilitiesPageContent>({});
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaParagraph1, setCtaParagraph1] = useState("");
  const [ctaParagraph2, setCtaParagraph2] = useState("");
  const [ctaImage, setCtaImage] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaButtonLink, setCtaButtonLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"hero" | "activities" | "gallery" | "cta">("hero");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setActivities((d.activities || []).sort((a: Activity, b: Activity) => a.order - b.order));
        setGallery((d.gallery || []).sort((a: GalleryImage, b: GalleryImage) => a.order - b.order));
        setSections(d.activitiesPage || {});
        setHeroImage(d.activitiesHeroImage || "");
        setCtaTitle(d.activitiesCTATitle || "");
        setCtaParagraph1(d.activitiesCTAParagraph1 || "");
        setCtaParagraph2(d.activitiesCTAParagraph2 || "");
        setCtaImage(d.activitiesCTAImage || "");
        setCtaButtonText(d.activitiesCTAButtonText || "");
        setCtaButtonLink(d.activitiesCTAButtonLink || "");
      });
  }, []);

  function updateActivity(i: number, field: keyof Activity, value: string | number) {
    const next = [...activities];
    next[i] = { ...next[i], [field]: value };
    setActivities(next);
  }

  function addActivity() {
    setActivities([
      ...activities,
      {
        id: String(Date.now()),
        title: "",
        description: "",
        order: activities.length,
      },
    ]);
  }

  function removeActivity(i: number) {
    setActivities(activities.filter((_, j) => j !== i));
  }

  function updateGallery(i: number, field: keyof GalleryImage, value: string | number) {
    const next = [...gallery];
    next[i] = { ...next[i], [field]: value };
    setGallery(next);
  }

  function addGallery() {
    setGallery([
      ...gallery,
      { id: String(Date.now()), order: gallery.length },
    ]);
  }

  function removeGallery(i: number) {
    setGallery(gallery.filter((_, j) => j !== i));
  }

  function updateSection(field: keyof FacilitiesPageContent, value: string | string[]) {
    setSections({ ...sections, [field]: value });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.activities = activities.map((s, i) => ({ ...s, order: i }));
      full.gallery = gallery.map((s, i) => ({ ...s, order: i }));
      full.activitiesPage = sections;
      full.activitiesHeroImage = heroImage;
      full.activitiesCTATitle = ctaTitle;
      full.activitiesCTAParagraph1 = ctaParagraph1;
      full.activitiesCTAParagraph2 = ctaParagraph2;
      full.activitiesCTAImage = ctaImage;
      full.activitiesCTAButtonText = ctaButtonText;
      full.activitiesCTAButtonLink = ctaButtonLink;
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
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Activities</h1>
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
            onClick={() => setTab("activities")}
            className={`px-4 py-2 rounded-lg ${tab === "activities" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Aktivitas
          </button>
          <button
            type="button"
            onClick={() => setTab("gallery")}
            className={`px-4 py-2 rounded-lg ${tab === "gallery" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Galeri Kami
          </button>
          <button
            type="button"
            onClick={() => setTab("cta")}
            className={`px-4 py-2 rounded-lg ${tab === "cta" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Section CTA
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
                    placeholder="Hidup Bermakna&#10;Setiap Hari"
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
                    placeholder="Di Atedia, setiap hari adalah kesempatan untuk tetap aktif, sehat, dan terhubung. Berbagai aktivitas dirancang untuk mendukung kesehatan fisik, menjaga ketajaman pikiran, serta mempererat kebersamaan."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "activities" && (
          <div className="mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-atedia-brown mb-4">Aktivitas</h2>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={a.id} className="flex flex-col gap-2 pb-4 border-b last:border-b-0 last:pb-0">
                    <input
                      type="text"
                      placeholder="Judul"
                      value={a.title}
                      onChange={(e) => updateActivity(i, "title", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Deskripsi"
                      value={a.description}
                      onChange={(e) => updateActivity(i, "description", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={2}
                    />
                    <AdminImageUpload
                      label="Gambar aktivitas"
                      value={a.image || ""}
                      onChange={(url) => updateActivity(i, "image", url)}
                      compact
                    />
                    <div className="flex justify-end">
                      <button type="button" onClick={() => removeActivity(i)} className="text-red-600 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addActivity} className="btn-secondary mt-4">
                + Tambah Aktivitas
              </button>
            </div>
          </div>
        )}

        {tab === "gallery" && (
          <div className="mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-atedia-brown mb-4">Galeri Kami</h2>
              <div className="space-y-4">
                {gallery.map((g, i) => (
                  <div key={g.id} className="flex flex-col gap-2 pb-4 border-b last:border-b-0 last:pb-0">
                    <AdminImageUpload
                      label="Gambar galeri"
                      value={g.image || ""}
                      onChange={(url) => updateGallery(i, "image", url)}
                      compact
                    />
                    <input
                      type="text"
                      placeholder="Caption (opsional)"
                      value={g.caption || ""}
                      onChange={(e) => updateGallery(i, "caption", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <div className="flex justify-end">
                      <button type="button" onClick={() => removeGallery(i)} className="text-red-600 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addGallery} className="btn-secondary mt-4">
                + Tambah Gambar Galeri
              </button>
            </div>
          </div>
        )}

        {tab === "cta" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Section CTA - Ciptakan Pengalaman Tak Terlupakan</h2>
              <div className="space-y-4">
                <AdminImageUpload
                  label="Gambar Section (tampil di kiri)"
                  value={ctaImage}
                  onChange={setCtaImage}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    value={ctaTitle}
                    onChange={(e) => setCtaTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ciptakan Pengalaman Tak Terlupakan di Atedia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 1</label>
                  <textarea
                    value={ctaParagraph1}
                    onChange={(e) => setCtaParagraph1(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                    placeholder="Nikmati suasana yang hangat, nyaman, dan penuh makna di setiap momen yang Anda habiskan. Di Atedia, setiap detail dirancang untuk menghadirkan pengalaman istimewa. Dengan layanan profesional, fasilitas yang mendukung gaya hidup aktif dan sehat, serta komunitas yang saling peduli, kami memastikan setiap hari terasa lebih bermakna dan membahagiakan."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 2</label>
                  <textarea
                    value={ctaParagraph2}
                    onChange={(e) => setCtaParagraph2(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                    placeholder="Setiap tawa yang tercipta, setiap cerita yang dibagikan, dan setiap kebersamaan yang terjalin menjadi bagian dari perjalanan hidup yang indah. Kami memahami bahwa setiap individu memiliki kisah dan kenangan berharga, karena itu Atedia hadir untuk merawat, menghargai, dan menemani setiap langkah dengan penuh cinta dan perhatian."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teks Tombol</label>
                  <input
                    type="text"
                    value={ctaButtonText}
                    onChange={(e) => setCtaButtonText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Book Senior Living"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Tombol</label>
                  <input
                    type="text"
                    value={ctaButtonLink}
                    onChange={(e) => setCtaButtonLink(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="# atau URL lengkap"
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
