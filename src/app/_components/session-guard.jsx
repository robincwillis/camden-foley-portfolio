"use client";

import { useEffect } from "react";

const SESSION_KEY = "cf_session_active";

export function setSessionActive() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, "true");
  }
}

export default function SessionGuard() {
  useEffect(() => {
    const isSessionActive = sessionStorage.getItem(SESSION_KEY);

    if (!isSessionActive) {
      // New session - clear any stale unlock cookies from previous sessions
      fetch("/api/projects/clear", { method: "POST" }).then(() => {
        // Mark session as active after clearing
        setSessionActive();
      });
    }
  }, []);

  return null;
}
