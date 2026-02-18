"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Service } from "@/lib/types";

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => setItems((d.services || []).sort((a: Service, b: Service) => a.order - b.order)));
  }, []);

  function update(i: number, field: keyof Service, value: string | number) {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  }

  function add() {
    setItems([
      ...items,
      { id: String(Date.now()), title: "", description: "", order: items.length },
    ]);
  }

  function remove(i: number) {
    setItems(items.filter((_, j) => j !== i));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.services = items.map((s, i) => ({ ...s, order: i }));
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
        <h1 className="text-2xl font-bold text-atedia-brown mb-6">Edit Layanan Kami</h1>
        <div className="space-y-4">
          {items.map((s, i) => (
            <div key={s.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
              <input
                type="text"
                placeholder="Judul (Longstay, Senior Club, dll)"
                value={s.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Deskripsi"
                value={s.description}
                onChange={(e) => update(i, "description", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
              <AdminImageUpload
                label="Gambar layanan"
                value={s.image || ""}
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
            + Tambah Layanan
          </button>
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button type="button" onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Menyimpan..." : "Simpan Semua"}
          </button>
        </div>
      </div>
    </RequireAdmin>
  );
}
