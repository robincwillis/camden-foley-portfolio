"use client"

import { useContext, useRef } from "react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
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

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};


export default function Template({ children }) {
  console.log('template re render')
  let pathname = usePathname();

  console.log(pathname)

  return (
    <>
    {/* <AnimatePresence mode={'wait'} initial={false}> */}
      <motion.main
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {/* <FrozenRouter> {children} </FrozenRouter> */}
        {children} 
      </motion.main>
    {/* </AnimatePresence> */}
    </>
  )
}