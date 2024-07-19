"use client"

import { motion } from 'framer-motion';

const AccordionIcon = ({isToggled}) => {
  const stem = {
    minus: { pathLength : 0, pathOffset: 0.5},
    plus: { pathLength: 1, pathOffset: 0 }
  }

  return (
    <motion.svg
      viewBox="0 0 10 10"
      width="10" 
      height="10"
    >
      <motion.line
        x1="5"
        y1="0"
        x2="5"
        y2="10"
        stroke="currentColor"
        variants={stem}
        animate={isToggled ? 'minus' : 'plus'}
        transition={{ duration: 0.5 }}

        // transition={{
        //     type: "spring", duration: 1.5
        // }}
      />
      <motion.line
        y1="5"
        x1="0"
        y2="5"
        x2="10"
        stroke="currentColor"
      />
    </motion.svg>
  );
};

export default AccordionIcon;