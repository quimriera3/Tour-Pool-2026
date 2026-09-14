"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SUPPORTED = new Set(["en", "es", "ca", "fr", "it", "nl"]);

export default function DocumentLocale() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    document.documentElement.lang = SUPPORTED.has(first) ? first : "en";
  }, [pathname]);
  return null;
}
