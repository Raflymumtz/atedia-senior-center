"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Activity, GalleryImage } from "@/lib/types";

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"activities" | "gallery">("activities");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setActivities((d.activities || []).sort((a: Activity, b: Activity) => a.order - b.order));
        setGallery((d.gallery || []).sort((a: GalleryImage, b: GalleryImage) => a.order - b.order));
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

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.activities = activities.map((s, i) => ({ ...s, order: i }));
      full.gallery = gallery.map((s, i) => ({ ...s, order: i }));
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
        <div className="flex gap-2 mb-6">
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
        </div>

        {tab === "activities" && (
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold text-atedia-brown">Aktivitas (gambar + judul + deskripsi)</h2>
            {activities.map((a, i) => (
              <div key={a.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
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
            <button type="button" onClick={addActivity} className="btn-secondary">
              + Tambah Aktivitas
            </button>
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold text-atedia-brown">Galeri Kami (gambar + caption)</h2>
            {gallery.map((g, i) => (
              <div key={g.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
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
            <button type="button" onClick={addGallery} className="btn-secondary">
              + Tambah Gambar Galeri
            </button>
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
