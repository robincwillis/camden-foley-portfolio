"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getSnapshot = () => typeof document.startViewTransition === "function";

const getServerSnapshot = () => undefined;

const usePageTransitionSupport = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default usePageTransitionSupport;
