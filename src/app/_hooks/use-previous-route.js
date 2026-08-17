"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

const usePreviousRoute = () => {
  const pathname = usePathname();

  const [tracked, setTracked] = useState({
    pathname: null,
    previousRoute: null,
    previousProject: null,
  });

  if (pathname !== tracked.pathname) {
    const outgoing = tracked.pathname;
    const outgoingIsProject = outgoing && outgoing.includes("/projects");

    setTracked({
      pathname,
      previousRoute: outgoingIsProject ? tracked.previousRoute : outgoing,
      previousProject: outgoingIsProject ? outgoing : tracked.previousProject,
    });
  }

  return {
    previousRoute: tracked.previousRoute,
    previousProject: tracked.previousProject,
  };
};

export default usePreviousRoute;
