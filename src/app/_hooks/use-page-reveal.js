"use client";
import { useEffect } from "react";

const usePageReveal = () => {
  useEffect(() => {
    console.log("add page reveal listener");

    window.addEventListener("pagereveal", async (e) => {
      console.log("page swap happened");
    });
  }, []);
};

export default usePageReveal;
