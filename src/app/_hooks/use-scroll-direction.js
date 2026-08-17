import { useState, useEffect } from "react";

const useScrollDirection = (targetSelector) => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const target = targetSelector
      ? document.querySelector(targetSelector)
      : window;

    if (!target) {
      return;
    }

    let lastScrollY = targetSelector ? target.scrollTop : window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = targetSelector ? target.scrollTop : window.scrollY;
      const scrollHeight = targetSelector
        ? target.scrollHeight
        : document.documentElement.scrollHeight;
      const clientHeight = targetSelector
        ? target.clientHeight
        : window.innerHeight;

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      setScrolledToBottom(scrollY + clientHeight >= scrollHeight);
      setScrolledToTop(scrollY <= 0);
      lastScrollY = scrollY;
    };

    updateScrollDirection();
    target.addEventListener("scroll", updateScrollDirection);

    return () => {
      target.removeEventListener("scroll", updateScrollDirection);
    };
  }, [targetSelector]);

  return { scrollDirection, scrolledToBottom, scrolledToTop };
};

export default useScrollDirection;
