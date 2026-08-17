"use client";

import { motion } from "framer-motion";

const AccordionIcon = ({ isToggled }) => {
  return (
    <motion.svg
      viewBox="0 0 15 8"
      width="12"
      height="6.4"
      animate={{ rotate: isToggled ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      <path
        d="M0.325 6.659L7.325 0.659L14.325 6.659"
        stroke="currentColor"
        fill="none"
      />
    </motion.svg>
  );
};

export default AccordionIcon;
