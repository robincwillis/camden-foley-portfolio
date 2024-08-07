import { useState, useEffect } from "react";
import classNames from "classnames"; // for conditional classes

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      if (scrollY + window.innerHeight >= documentHeight) {
        setScrolledToBottom(true);
      } else {
        setScrolledToBottom(false);
      }
      if (scrollY === 0) {
        setScrolledToTop(true);
      } else {
        setScrolledToTop(false);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [lastScrollY, scrollDirection]);

  return { scrollDirection, scrolledToBottom, scrolledToTop };
};

export default useScrollDirection;
