"use client"

import { motion } from 'framer-motion';

const SubmitIcon = ({state}) => {
  const stem1 = {
    arrow: { 
      d: "M 8,4 L 16,12"
    },
    xmark: {
      d: "M 5,5 L 20,20"
    },
    check: { 
      d: "M 0,12 L 8,20"
     }
  }

  const stem2 = {
    arrow: {
      d: "M 8,20 L 16,12"
    },
    xmark: { 
      d: "M 20,5 L 5,20"
    },
    check: { 
      d : "M 8,20 L 24,4"
     }
  }

  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="24" 
      height="24"
      strokeWidth="1.5"
      // color="white"
    >
      <motion.path
        stroke-linecap="square"
        stroke="currentColor"
        variants={stem1}
        animate={state()}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        stroke-linecap="square"
        stroke="currentColor"
        variants={stem2}
        animate={state()}
        transition={{ duration: 0.2 }}  
      />
    </motion.svg>
  );
};

export default SubmitIcon;