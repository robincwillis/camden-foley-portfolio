"use client"

import { useContext, useState, useRef, useEffect } from "react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { motion, cubicBezier, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";

import AppContext from '@/app/_context/app-context'

// const variants = {
//   hidden: { opacity: 0, x: 0, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
// }

const variants = {
  closed: (position) => {
    const originPosition = position[0]
    return {
      position: "fixed",
      opacity: 1, 
      // x: originPosition.x,
      // y: originPosition.y,
      // x: 400,
      // y: 400,
      width: originPosition.width,
      height: originPosition.height,
      // width: 200,
      // height: 200,
      zIndex: 100,
    }
  },
  open: (position) => {
    const originPosition = position[0];
    const targetPosition = position[1];
    console.log('origin->target', originPosition, targetPosition)

    return {
      position: "fixed",
      opacity: 1,
      x: targetPosition.x - originPosition.x,
      y: targetPosition.y - originPosition.y,
      // x: 100,
      // y: 100,
      // width: 100,
      // height: 100,
      width: targetPosition.width,
      height: targetPosition.height,
      zIndex: 100,

    }
  }
}

// Prevents instant page opening
function FrozenRouter(props) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}


export default function Template({ children }) {
  // console.log('template re render')
  let pathname = usePathname();
  const [ test, setTest ] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const { 
    clonedElement, 
    originPosition, 
    targetPosition,
    setOriginPosition,
    setTargetPosition, 
    isAnimating,
    setIsAnimating,
  } = useContext(AppContext);

  // console.log(pathname)
  // console.log(box)

  // Are we animating ? 
  // are we animating between projects and individual project?
  // Show this moving box


  // Animation ended

  // If landed on work, unset my originPosition
  useEffect(() => {
    if (animationEnded && pathname !== '/projects' ){
      // setOriginPosition(null);
      // setTargetPosition(null);
      console.log('clear positions')
    }
  },[animationEnded, pathname])

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {isAnimating && clonedElement && originPosition && targetPosition && (
          <motion.div
            //layout
            animate={pathname === "/projects" ? "open" : "closed"}
            variants={variants}
            custom={[originPosition, targetPosition]}
            transition={{
              ease: cubicBezier(.35, .17, .3, .86),
              duration: 0.8,
            }}
            style={{
              position: "fixed",
              left: originPosition.x,
              top: originPosition.y,
              width: originPosition.width,
              height: originPosition.height,
              // visibility: isAnimating ? "visible" : "hidden"
            }}
            // style={test ? {
            //   position: "fixed",
            //   opacity: 1, 
            //   left: originPosition.x,
            //   top: originPosition.y,
            //   width: originPosition.width,
            //   height: originPosition.height,
            //   // x:  originPosition.x,
            //   // y:  originPosition.y,
            //   // width:  originPosition.width,
            //   // height:  originPosition.height,
            //   zIndex: 100,
            // } : null}
            className="bg-blue-300"
            onAnimationStart={() => {
            }}
            onAnimationComplete={() => {
              setTest(false);
              // setAnimating(false)
              // setAnimationEnded(true)
              // setAnimationStarted(false)
              // && pathname !== '/'
              // setIsAnimating(false);
              if (pathname !== '/projects') {
                //setTest(true);
                console.log('clear positions');
                setOriginPosition(null);
                setTargetPosition(null);
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
          onAnimationStart={() => {
            setAnimating(true)
            setAnimationEnded(false)
            setAnimationStarted(true)
          }}
          onAnimationComplete={() => {
            setAnimating(false)
            setAnimationEnded(true)
            setAnimationStarted(false)
          }}
        >
          <FrozenRouter> {children} </FrozenRouter>
        </motion.main>
      </AnimatePresence>
    </>
  )
}