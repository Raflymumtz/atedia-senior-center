"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Service, ServicePageContent } from "@/lib/types";

const defaultServicePage: ServicePageContent = {
  heroTitle: "Pendampingan Sepenuh Hati",
  heroCaption:
    "Kami mendampingi setiap langkah dengan perhatian yang tulus, menciptakan hari-hari yang lebih nyaman, aktif, dan penuh ketenangan.",
  heroSlides: [],
  sectionTitle: "Layanan Profesional Kami",
  sectionCaption1:
    "Kami menyediakan berbagai layanan profesional yang dirancang khusus untuk memenuhi kebutuhan warga Atedia.",
  sectionCaption2:
    "Dari perawatan kesehatan hingga aktivitas rekreasi, kami memastikan setiap warga mendapatkan dukungan yang dibutuhkan.",
  carouselSlides: [],
};

type Tab = "hero" | "layanan" | "profesional";

export default function AdminServicePage() {
  const [servicePage, setServicePage] = useState<ServicePageContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<Tab>("hero");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setServicePage(
          d.servicePage ? { ...defaultServicePage, ...d.servicePage } : defaultServicePage
        );
        setServices((d.services || []).sort((a: Service, b: Service) => a.order - b.order));
      });
  }, []);

  function handlePageChange<K extends keyof ServicePageContent>(
    field: K,
    value: ServicePageContent[K]
  ) {
    if (!servicePage) return;
    setServicePage({ ...servicePage, [field]: value });
  }

  function setHeroSlide(i: number, url: string) {
    if (!servicePage) return;
    const arr = [...(servicePage.heroSlides || [])];
    arr[i] = url;
    handlePageChange("heroSlides", arr);
  }
  function addHeroSlide() {
    if (!servicePage) return;
    handlePageChange("heroSlides", [...(servicePage.heroSlides || []), ""]);
  }
  function removeHeroSlide(i: number) {
    if (!servicePage) return;
    handlePageChange(
      "heroSlides",
      (servicePage.heroSlides || []).filter((_, j) => j !== i)
    );
  }

  function setCarouselSlide(i: number, url: string) {
    if (!servicePage) return;
    const arr = [...(servicePage.carouselSlides || [])];
    arr[i] = url;
    handlePageChange("carouselSlides", arr);
  }
  function addCarouselSlide() {
    if (!servicePage) return;
    handlePageChange("carouselSlides", [...(servicePage.carouselSlides || []), ""]);
  }
  function removeCarouselSlide(i: number) {
    if (!servicePage) return;
    handlePageChange(
      "carouselSlides",
      (servicePage.carouselSlides || []).filter((_, j) => j !== i)
    );
  }

  function updateService(i: number, field: keyof Service, value: string | number) {
    const next = [...services];
    next[i] = { ...next[i], [field]: value };
    setServices(next);
  }
  function addService() {
    setServices([
      ...services,
      { id: String(Date.now()), title: "", description: "", order: services.length },
    ]);
  }
  function removeService(i: number) {
    setServices(services.filter((_, j) => j !== i));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      if (servicePage) full.servicePage = servicePage;
      full.services = services.map((s, i) => ({ ...s, order: i }));
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

  if (servicePage === null) {
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
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Service</h1>
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab("hero")}
            className={`px-4 py-2 rounded-lg ${tab === "hero" ? "bg-atedia-sage text-white" : "bg-gray-200 text-atedia-brown"}`}
          >
            Hero
          </button>
          <button
            type="button"
            onClick={() => setTab("layanan")}
            className={`px-4 py-2 rounded-lg ${tab === "layanan" ? "bg-atedia-sage text-white" : "bg-gray-200 text-atedia-brown"}`}
          >
            Layanan
          </button>
          <button
            type="button"
            onClick={() => setTab("profesional")}
            className={`px-4 py-2 rounded-lg ${tab === "profesional" ? "bg-atedia-sage text-white" : "bg-gray-200 text-atedia-brown"}`}
          >
            Layanan Profesional Kami
          </button>
        </div>

        {tab === "hero" && (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="font-semibold text-atedia-sage">Hero (judul, caption, background)</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul hero</label>
              <input
                type="text"
                value={servicePage.heroTitle || ""}
                onChange={(e) => handlePageChange("heroTitle", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Pendampingan Sepenuh Hati"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption hero</label>
              <textarea
                value={servicePage.heroCaption || ""}
                onChange={(e) => handlePageChange("heroCaption", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar background hero (bisa lebih dari 1, auto-slide 3 detik)
              </label>
              {(servicePage.heroSlides || []).map((url, i) => (
                <div key={i} className="flex items-start gap-2 mb-3">
                  <div className="flex-1">
                    <AdminImageUpload value={url} onChange={(u) => setHeroSlide(i, u)} compact />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHeroSlide(i)}
                    className="text-red-600 text-sm mt-2"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button type="button" onClick={addHeroSlide} className="btn-secondary text-sm">
                + Tambah gambar hero
              </button>
            </div>
          </div>
        )}

        {tab === "layanan" && (
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold text-atedia-brown">
              Layanan (Longstay, Senior Club, dll)
            </h2>
            {services.map((s, i) => (
              <div key={s.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Judul (Longstay, Senior Club, dll)"
                  value={s.title}
                  onChange={(e) => updateService(i, "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Deskripsi"
                  value={s.description}
                  onChange={(e) => updateService(i, "description", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                />
                <AdminImageUpload
                  label="Gambar layanan"
                  value={s.image || ""}
                  onChange={(url) => updateService(i, "image", url)}
                  compact
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeService(i)}
                    className="text-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addService} className="btn-secondary">
              + Tambah Layanan
            </button>
          </div>
        )}

        {tab === "profesional" && (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="font-semibold text-atedia-sage">
              Section Layanan Profesional Kami (judul, caption, carousel)
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul section</label>
              <input
                type="text"
                value={servicePage.sectionTitle || ""}
                onChange={(e) => handlePageChange("sectionTitle", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Layanan Profesional Kami"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption paragraf 1
              </label>
              <textarea
                value={servicePage.sectionCaption1 || ""}
                onChange={(e) => handlePageChange("sectionCaption1", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption paragraf 2
              </label>
              <textarea
                value={servicePage.sectionCaption2 || ""}
                onChange={(e) => handlePageChange("sectionCaption2", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar carousel (bisa lebih dari 1, auto-slide 3 detik)
              </label>
              {(servicePage.carouselSlides || []).map((url, i) => (
                <div key={i} className="flex items-start gap-2 mb-3">
                  <div className="flex-1">
                    <AdminImageUpload
                      value={url}
                      onChange={(u) => setCarouselSlide(i, u)}
                      compact
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCarouselSlide(i)}
                    className="text-red-600 text-sm mt-2"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button type="button" onClick={addCarouselSlide} className="btn-secondary text-sm">
                + Tambah gambar carousel
              </button>
            </div>
          </div>
        )}

        {message && <p className="text-sm text-green-600 mb-2">{message}</p>}
        <button type="button" onClick={save} disabled={saving} className="btn-primary">
          {saving ? "Menyimpan..." : "Simpan Semua"}
        </button>
      </div>
    </RequireAdmin>
  );
}
