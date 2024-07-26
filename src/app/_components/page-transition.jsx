"use client"

import { useContext, useState, useRef, useEffect } from "react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { motion, cubicBezier, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";

import AppContext from '@/app/_context/app-context'

import useViewTransitionSupport from "@/app/_hooks/use-view-transition-support";
import usePageSwap from '@/app/_hooks/use-page-swap'
import usePageReveal from '@/app/_hooks/use-page-reveal'

const variants = {
  closed: (position) => {
    const originPosition = position[0]
    return {
      position: "fixed",
      opacity: 1, 
      width: originPosition.width,
      height: originPosition.height,
      zIndex: 100,
    }
  },
  open: (position) => {
    const originPosition = position[0];
    const targetPosition = position[1];

    return {
      position: "fixed",
      x: targetPosition.x - originPosition.x,
      y: targetPosition.y - originPosition.y,
      width: targetPosition.width,
      height: targetPosition.height,
      zIndex: 100,
    }
  }
}

// Prevents instant page opening
const FrozenRouter = (props) => {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  console.log('Running Fozen Router');

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}


export default function Template({ children }) {
  let pathname = usePathname();

  const { 
    clonedElement, 
    originPosition, 
    targetPosition,
    setOriginPosition,
    setTargetPosition, 
    isAnimating,
    setIsAnimating,
  } = useContext(AppContext);

  // usePageSwap();
  // usePageReveal();

  const viewTransitionsSupported = useViewTransitionSupport()
  if (typeof viewTransitionsSupported === 'undefined') {
    return null
  }
  if (viewTransitionsSupported) {
    console.log("viewTransitionsSupported:::")
    return children
  }
  
  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {clonedElement && originPosition && targetPosition && (
          <motion.div
            animate={pathname === "/projects" ? "open" : "closed"}
            variants={variants}
            custom={[originPosition, targetPosition]}
            transition={{
              ease: cubicBezier(.35, .17, .3, .86),
              duration: 1.25,
            }}
            style={{
              position: "fixed",
              left: originPosition.x,
              top: originPosition.y,
              width: originPosition.width,
              height: originPosition.height,
              zIndex: 100,
              opacity: 0.75,
              //visibility: isAnimating ? "visible" : "hidden"
              //zIndex: isAnimating ? 100 : -1
            }}
            className="bg-blue-300"
            onAnimationStart={() => {
              if (!isAnimating) {
                setIsAnimating(true);
              }
            }}
            onAnimationComplete={() => {
              setIsAnimating(false);
              if (pathname !== '/projects') {

                console.log('clear positions');
                // setOriginPosition(null);
                // setTargetPosition(null);
              }
            }}
          >
            {clonedElement}
          </motion.div>
        )}

        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.27, 0.94, 0.48, 1.0] }}
          className="h-[calc(100%-60px)]"
        >
          <FrozenRouter> {children} </FrozenRouter>
        </motion.main>
      </AnimatePresence>
    </>
  )
}