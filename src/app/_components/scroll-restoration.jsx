"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MOBILE_BREAKPOINT = 1024;

export default function ScrollRestoration() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Restore scroll position synchronously before paint so the
  // view transition captures the page at the correct scroll offset.
  // Exception: on mobile, navigating TO a project page scrolls to top
  // so the project content starts at the beginning.
  useLayoutEffect(() => {
    const isProjectPage = pathname.startsWith("/projects/");
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const isNewNavigation = prevPathname.current !== pathname;

    if (isProjectPage && isMobile && isNewNavigation) {
      window.scrollTo(0, 0);
    } else {
      const saved = sessionStorage.getItem(`scrollY:${pathname}`);
      if (saved !== null) {
        window.scrollTo(0, parseInt(saved, 10));
      }
    }

    prevPathname.current = pathname;
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
