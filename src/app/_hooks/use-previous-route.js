"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const usePreviousRoute = () => {
  const pathname = usePathname();

  const routeRef = useRef(null);
  const projectRef = useRef(null);

  useEffect(() => {
    if (pathname && pathname.includes("/projects")) {
      projectRef.current = pathname;
    } else {
      routeRef.current = pathname;
    }
  }, [pathname]);

  return {
    previousRoute: routeRef.current,
    previousProject: projectRef.current,
  };
};

export default usePreviousRoute;
