'use client'

import React, { createContext, useState } from 'react';

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
        }
        // Add other global states here
    });

    const [clonedElement, setClonedElement] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false);
    const [originPosition, setOriginPosition] = useState(null) //useState({ x: 0, y: 0, width: 0, height: 0 });
    const [targetPosition, setTargetPosition] = useState(null) //useState({ x: 0, y: 0, width: 0, height: 0 });
    const [ currentProject, setCurrentProject ] = useState(null)

    const cloneElement = (element) => {
        if (!clonedElement) {
            setClonedElement(React.cloneElement(element));
        }
    };


    const updateUser = (user) => {
        setState((prevState) => ({ ...prevState, user }));
    };

    const toggleTheme = () => {
        setState((prevState) => ({
            ...prevState,
            theme: prevState.theme === 'light' ? 'dark' : 'light',
        }));
    };

    return (
        <AppContext.Provider value={{
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
            setCurrentProject
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;