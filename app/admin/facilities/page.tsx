"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { FacilityOther, FacilitiesPageContent } from "@/lib/types";

export default function AdminFacilitiesPage() {
  const [other, setOther] = useState<FacilityOther[]>([]);
  const [sections, setSections] = useState<FacilitiesPageContent>({});
  const [heroImage, setHeroImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"other" | "hero" | "seniorLiving" | "facilitiesSection" | "carousel">("hero");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setOther((d.facilitiesOther || []).sort((a: FacilityOther, b: FacilityOther) => a.order - b.order));
        setSections(d.facilitiesPage || {});
        setHeroImage(d.facilitiesHeroImage || "");
      });
  }, []);

  function updateOther(i: number, field: keyof FacilityOther, value: string) {
    const next = [...other];
    next[i] = { ...next[i], [field]: value };
    setOther(next);
  }

  function addOther() {
    setOther([
      ...other,
      { id: String(Date.now()), title: "", order: other.length },
    ]);
  }

  function removeOther(i: number) {
    setOther(other.filter((_, j) => j !== i));
  }

  function updateSection(field: keyof FacilitiesPageContent, value: string | string[]) {
    setSections({ ...sections, [field]: value });
  }

  function setCarouselImage(i: number, url: string) {
    const arr = [...(sections.facilitiesCarouselImages || [])];
    arr[i] = url;
    updateSection("facilitiesCarouselImages", arr);
  }

  function addCarouselImage() {
    updateSection("facilitiesCarouselImages", [...(sections.facilitiesCarouselImages || []), ""]);
  }

  function removeCarouselImage(i: number) {
    updateSection(
      "facilitiesCarouselImages",
      (sections.facilitiesCarouselImages || []).filter((_, j) => j !== i)
    );
  }

  function setActivityCarouselImage(i: number, url: string) {
    const arr = [...(sections.activityCarouselImages || [])];
    arr[i] = url;
    updateSection("activityCarouselImages", arr);
  }

  function addActivityCarouselImage() {
    updateSection("activityCarouselImages", [...(sections.activityCarouselImages || []), ""]);
  }

  function removeActivityCarouselImage(i: number) {
    updateSection(
      "activityCarouselImages",
      (sections.activityCarouselImages || []).filter((_, j) => j !== i)
    );
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.facilitiesOther = other.map((s, i) => ({ ...s, order: i }));
      full.facilitiesPage = sections;
      full.facilitiesHeroImage = heroImage;
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
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Facilities</h1>
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
            onClick={() => setTab("facilitiesSection")}
            className={`px-4 py-2 rounded-lg ${tab === "facilitiesSection" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Fasilitas Kami
          </button>
          <button
            type="button"
            onClick={() => setTab("seniorLiving")}
            className={`px-4 py-2 rounded-lg ${tab === "seniorLiving" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Senior Living
          </button>
          <button
            type="button"
            onClick={() => setTab("other")}
            className={`px-4 py-2 rounded-lg ${tab === "other" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Fasilitas Lainnya
          </button>
          <button
            type="button"
            onClick={() => setTab("carousel")}
            className={`px-4 py-2 rounded-lg ${tab === "carousel" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Carousel Aktivitas
          </button>
        </div>

        {tab === "other" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Fasilitas Lainnya</h2>
              <div className="space-y-4">
                {other.map((f, i) => (
                  <div key={f.id} className="p-4 border rounded-lg flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Judul (Living & Dining Room, Taman, dll)"
                      value={f.title}
                      onChange={(e) => updateOther(i, "title", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <AdminImageUpload
                      label="Gambar"
                      value={f.image || ""}
                      onChange={(url) => updateOther(i, "image", url)}
                      compact
                    />
                    <div className="flex justify-end">
                      <button type="button" onClick={() => removeOther(i)} className="text-red-600 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addOther} className="btn-secondary">
                  + Tambah Fasilitas Lainnya
                </button>
              </div>
            </div>
          </div>
        )}

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
                    placeholder="Kenyamanan yang&#10;Menghadirkan&#10;Rasa Tenang"
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
                    placeholder="Memberikan dukungan hunian penuh waktu dengan pendampingan menyeluruh setiap hari menghadirkan kenyamanan, keamanan, dan perhatian yang konsisten."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "seniorLiving" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Senior Living</h2>
              <div className="space-y-4">
                <AdminImageUpload
                  label="Gambar Section (tampil di kiri)"
                  value={sections.seniorLivingImage || ""}
                  onChange={(url) => updateSection("seniorLivingImage", url)}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={sections.seniorLivingSubtitle || ""}
                    onChange={(e) => updateSection("seniorLivingSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Kehangatan untuk Hari Tua yang Bahagia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={sections.seniorLivingDescription || ""}
                    onChange={(e) => updateSection("seniorLivingDescription", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Kami menghadirkan program perawatan fleksibel, dari hunian penuh hingga kegiatan sosial yang mendukung kesejahteraan dan kebahagiaan warga."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label Tipe Kamar</label>
                    <input
                      type="text"
                      value={sections.roomTypeLabel || ""}
                      onChange={(e) => updateSection("roomTypeLabel", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Tipe Kamar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Tipe Kamar</label>
                    <input
                      type="text"
                      value={sections.roomTypeValue || ""}
                      onChange={(e) => updateSection("roomTypeValue", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Personal | Sharing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label Layanan</label>
                    <input
                      type="text"
                      value={sections.serviceLabel || ""}
                      onChange={(e) => updateSection("serviceLabel", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Layanan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Layanan</label>
                    <input
                      type="text"
                      value={sections.serviceValue || ""}
                      onChange={(e) => updateSection("serviceValue", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="24 Jam | Fleksibel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "facilitiesSection" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Fasilitas Kami</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gambar Carousel (tampil di kiri, bisa lebih dari 1, auto-slide)
                  </label>
                  {(sections.facilitiesCarouselImages || []).map((url, i) => (
                    <div key={i} className="flex items-start gap-2 mb-3">
                      <div className="flex-1">
                        <AdminImageUpload
                          value={url}
                          onChange={(u) => setCarouselImage(i, u)}
                          compact
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCarouselImage(i)}
                        className="text-red-600 text-sm mt-2"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addCarouselImage} className="btn-secondary text-sm">
                    + Tambah gambar carousel
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    value={sections.facilitiesTitle || ""}
                    onChange={(e) => updateSection("facilitiesTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Fasilitas Kami"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 1</label>
                  <textarea
                    value={sections.facilitiesParagraph1 || ""}
                    onChange={(e) => updateSection("facilitiesParagraph1", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Setiap sudut dirancang untuk menghadirkan rasa aman dan kenyamanan seperti di rumah sendiri. Dengan lingkungan yang tertata rapi dan fasilitas yang memadai, dan dapat menjalani hari-hari dengan lebih tenang dan percaya diri."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paragraf 2</label>
                  <textarea
                    value={sections.facilitiesParagraph2 || ""}
                    onChange={(e) => updateSection("facilitiesParagraph2", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Didukung oleh pendamping yang penuh perhatian dan suasana yang hangat, setiap aktivitas dijalani dengan penuh makna. Kami berkomitmen memberikan perawatan terbaik."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "carousel" && (
          <div className="space-y-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-atedia-brown mb-4">Carousel Aktivitas</h2>
              <p className="text-sm text-gray-600 mb-4">
                Carousel ini akan auto-change setiap 3 detik. Gambar akan ditampilkan di section "Carousel Aktivitas" di bagian bawah halaman.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gambar Carousel (bisa lebih dari 1, auto-slide 3 detik)
                  </label>
                  {(sections.activityCarouselImages || []).map((url, i) => (
                    <div key={i} className="flex items-start gap-2 mb-3">
                      <div className="flex-1">
                        <AdminImageUpload
                          value={url}
                          onChange={(u) => setActivityCarouselImage(i, u)}
                          compact
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeActivityCarouselImage(i)}
                        className="text-red-600 text-sm mt-2"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addActivityCarouselImage} className="btn-secondary text-sm">
                    + Tambah gambar carousel
                  </button>
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
