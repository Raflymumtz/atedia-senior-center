"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => setOk(d.admin))
      .catch(() => setOk(false));
  }, []);

  useEffect(() => {
    if (ok === false) {
      router.replace("/admin/login");
    }
  }, [ok, router]);

  if (ok === null) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-atedia-brown">Memuat...</p>
      </div>
    );
  }
  if (!ok) return null;
  return <>{children}</>;
}
