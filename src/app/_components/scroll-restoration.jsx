"use client";
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  // Restore scroll position synchronously before paint so the
  // view transition captures the page at the correct scroll offset
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(`scrollY:${pathname}`);
    if (saved !== null) {
      window.scrollTo(0, parseInt(saved, 10));
    }
  }, [pathname]);

  // Continuously save scroll position so it's always up to date
  // when a navigation occurs
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scrollY:${pathname}`, String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
