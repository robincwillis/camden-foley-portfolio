"use client";

import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children, site }) => {
  const [state, setState] = useState({
    user: null,
    site: site,
    box: {
      x: 50,
      y: 50,
      w: 100,
      h: 100,
    },
    modalOpen: false,
    // Add other global states here
  });

  const [clonedElement, setClonedElement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [originPosition, setOriginPosition] = useState(null); //useState({ x: 0, y: 0, width: 0, height: 0 });
  const [targetPosition, setTargetPosition] = useState(null); //useState({ x: 0, y: 0, width: 0, height: 0 });
  const [currentProject, setCurrentProject] = useState(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);

  const cloneElement = (element) => {
    if (!clonedElement) {
      setClonedElement(React.cloneElement(element));
    }
  };

  const clearClonedElement = () => {
    setClonedElement(null);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        site,
        clonedElement,
        cloneElement,
        originPosition,
        setOriginPosition,
        targetPosition,
        setTargetPosition,
        isAnimating,
        setIsAnimating,
        currentProject,
        setCurrentProject,
        modalOpen,
        setModalOpen,
        clearClonedElement,
        processModalOpen,
        setProcessModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
