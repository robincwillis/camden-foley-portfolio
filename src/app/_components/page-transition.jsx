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


export default function Template({ children }) {
  console.log('template re render')
  let pathname = usePathname();

  console.log(pathname)

  return (
    <>
    <AnimatePresence mode={'wait'} initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.27, 0.94, 0.48, 1.0] }}
        className="h-[calc(100%-60px)]"
      >
        <FrozenRouter> {children} </FrozenRouter>
      </motion.main>
    </AnimatePresence>
    </>
  )
}