"use client";
import { useSyncExternalStore } from "react";

const subscribe = (callback) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => window.innerWidth;

const getServerSnapshot = () => 0;

const useWidth = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useWidth;
