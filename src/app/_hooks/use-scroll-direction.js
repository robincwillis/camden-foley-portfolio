import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const useScrollDirection = (targetSelector) => {
  const pathname = usePathname();
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

      const direction = scrollY > lastScrollY ? "down" : "up";
      // Safari reports fractional scrollY/scrollHeight, so at true max scroll
      // the sum can land a fraction of a pixel short of scrollHeight.
      const atBottom = scrollY + clientHeight >= scrollHeight - 1;
      const atTop = scrollY <= 0;

      setScrollDirection(direction);
      setScrolledToBottom(atBottom);
      setScrolledToTop(atTop);
      lastScrollY = scrollY;
    };

    updateScrollDirection();
    target.addEventListener("scroll", updateScrollDirection);

    return () => {
      target.removeEventListener("scroll", updateScrollDirection);
    };
  }, [targetSelector, pathname]);

  return { scrollDirection, scrolledToBottom, scrolledToTop };
};

export default useScrollDirection;
