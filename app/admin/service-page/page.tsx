"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminServicePageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/service");
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-[200px] text-atedia-brown">
      Mengalihkan ke Service...
    </div>
  );
}
