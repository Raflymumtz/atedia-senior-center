import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";

const UPLOAD_DIR = "public/uploads";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function sanitizeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase() || ".jpg";
  const base = path.basename(name, path.extname(name))
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .slice(0, 80);
  return `${Date.now()}-${base}${ext}`;
}

export async function POST(request: NextRequest) {
  const ok = await isAdmin();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Tidak ada file atau format salah" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Hanya gambar (JPEG, PNG, GIF, WebP) yang diizinkan" },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(dir, { recursive: true });

    const filename = sanitizeFilename(file.name);
    const filepath = path.join(dir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar" },
      { status: 500 }
    );
  }
}
