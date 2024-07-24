"use client"

import { useEffect, useState } from 'react';

const useViewTransitionSupport = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof document.startViewTransition === 'function');
  }, []);

  return isSupported;
};

export default useViewTransitionSupport;