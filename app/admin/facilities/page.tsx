"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { FacilityMain, FacilityOther } from "@/lib/types";

export default function AdminFacilitiesPage() {
  const [main, setMain] = useState<FacilityMain[]>([]);
  const [other, setOther] = useState<FacilityOther[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"main" | "other">("main");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setMain((d.facilitiesMain || []).sort((a: FacilityMain, b: FacilityMain) => a.order - b.order));
        setOther((d.facilitiesOther || []).sort((a: FacilityOther, b: FacilityOther) => a.order - b.order));
      });
  }, []);

  function updateMain(i: number, field: keyof FacilityMain, value: string | number) {
    const next = [...main];
    next[i] = { ...next[i], [field]: value };
    setMain(next);
  }

  function addMain() {
    setMain([
      ...main,
      {
        id: String(Date.now()),
        title: "",
        description: "",
        order: main.length,
      },
    ]);
  }

  function removeMain(i: number) {
    setMain(main.filter((_, j) => j !== i));
  }

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

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.facilitiesMain = main.map((s, i) => ({ ...s, order: i }));
      full.facilitiesOther = other.map((s, i) => ({ ...s, order: i }));
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
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab("main")}
            className={`px-4 py-2 rounded-lg ${tab === "main" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Fasilitas Kami
          </button>
          <button
            type="button"
            onClick={() => setTab("other")}
            className={`px-4 py-2 rounded-lg ${tab === "other" ? "bg-atedia-sage text-white" : "bg-gray-200"}`}
          >
            Fasilitas Lainnya
          </button>
        </div>

        {tab === "main" && (
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold text-atedia-brown">Fasilitas Kami (utama)</h2>
            {main.map((f, i) => (
              <div key={f.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Judul"
                  value={f.title}
                  onChange={(e) => updateMain(i, "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Deskripsi"
                  value={f.description}
                  onChange={(e) => updateMain(i, "description", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                />
                <AdminImageUpload
                  label="Gambar fasilitas"
                  value={f.image || ""}
                  onChange={(url) => updateMain(i, "image", url)}
                  compact
                />
                <div className="flex justify-end">
                  <button type="button" onClick={() => removeMain(i)} className="text-red-600 text-sm">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addMain} className="btn-secondary">
              + Tambah Fasilitas Kami
            </button>
          </div>
        )}

        {tab === "other" && (
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold text-atedia-brown">Fasilitas Lainnya (grid)</h2>
            {other.map((f, i) => (
              <div key={f.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
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
        )}

        {message && <p className="text-sm text-green-600">{message}</p>}
        <button type="button" onClick={save} disabled={saving} className="btn-primary">
          {saving ? "Menyimpan..." : "Simpan Semua"}
        </button>
      </div>
    </RequireAdmin>
  );
}
