"use client"

import { useEffect, useState } from 'react';

const usePageTransitionSupport = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof document.startViewTransition === 'function');
  }, []);

  return isSupported;
};

export default usePageTransitionSupport;