import { useState, useEffect } from "react";
import classNames from "classnames"; // for conditional classes

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      //  && Math.abs(scrollY - lastScrollY) > 1
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [lastScrollY, scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
