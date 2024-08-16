"use client";
import { useEffect } from "react";

const usePageSwap = () => {
  useEffect(() => {
    window.addEventListener("pageswap", async (e) => {});
    return () => {
      //        window.removeEventListener('pageswap', onPopState)
    };
  }, []);
};

export default usePageSwap;
