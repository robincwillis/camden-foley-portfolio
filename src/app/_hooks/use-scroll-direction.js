import { useState, useEffect } from "react";
import classNames from "classnames"; // for conditional classes

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

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
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [lastScrollY, scrollDirection]);

  return { scrollDirection, scrolledToBottom };
};

export default useScrollDirection;
