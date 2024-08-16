"use client";
import { useEffect } from "react";

const usePageReveal = () => {
  useEffect(() => {
    window.addEventListener("pagereveal", async (e) => {});
  }, []);
};

export default usePageReveal;
