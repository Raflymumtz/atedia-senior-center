"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Optional: show smaller preview (e.g. in list items) */
  compact?: boolean;
};

export default function AdminImageUpload({
  value,
  onChange,
  label = "Gambar",
  compact = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal upload");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex flex-wrap items-start gap-3">
        {value && (
          <div
            className={`relative bg-gray-100 rounded-lg overflow-hidden ${
              compact ? "w-16 h-16" : "w-24 h-24"
            }`}
          >
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="96px"
              unoptimized={value.startsWith("/uploads/")}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl"
            >
              Hapus
            </button>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary text-sm py-2 px-3"
          >
            {uploading ? "Mengunggah..." : value ? "Ganti gambar" : "Upload gambar"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
