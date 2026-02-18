"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAdmin from "@/components/RequireAdmin";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Testimoni } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimoni[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => setItems((d.testimonials || []).sort((a: Testimoni, b: Testimoni) => a.order - b.order)));
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

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const full = await fetch("/api/data").then((r) => r.json());
      full.testimonials = items.map((s, i) => ({ ...s, order: i }));
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
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button type="button" onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Menyimpan..." : "Simpan Semua"}
          </button>
        </div>
      </div>
    </RequireAdmin>
  );
}
