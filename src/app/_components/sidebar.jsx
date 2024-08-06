"use client";
import { useRef, useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import AppContext from "@/app/_context/app-context";

import useViewTransitionSupport from "@/app/_hooks/use-view-transition-support";

import Image from "@/app/_components/image";
import RichText from "@/app/_components/rich-text";
import AccordionIcon from "@/app/_components/accordion-icon";

import { dateToYearString } from "@/lib/utils/format";

export default function Sidebar({
  id,
  image,
  name,
  client,
  date,
  tags,
  role,
  team,
  brief,
  highlights,
}) {
  const viewTransitionsSupported = useViewTransitionSupport();
  const [expandedSection, setExpandedSection] = useState("brief");

  const imageRef = useRef(null);

  const { isAnimating, setTargetPosition } = useContext(AppContext);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setTargetPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [imageRef.current]);

  return (
    <div className="lg:sticky lg:overflow-y-auto lg:w-[393px] lg:top-0 lg:border-r-[1px] lg:border-black">
      <div className="p-5 flex flex-col space-y-2.5 border-b-[1px] border-black">
        <div
          // style={viewTransitionsSupported ? {
          //     viewTransitionName: `image-${id}`
          // }:{
          //     visibility: isAnimating ? 'hidden' : 'visible'
          // }}
          style={{
            viewTransitionName: `image-${id}`,
            visibility: isAnimating ? "hidden" : "visible",
          }}
        >
          <Image
            ref={imageRef}
            ratio={4 / 3}
            imageUrl={image.url}
            width={image.width}
            height={image.height}
            alt={image.description}
          />

          <div className="flex flex-col space-y-2 mt-2">
            <h1 className="font-display text-[32px]">{name}</h1>
            <h2 className="font-display text-sm tracking-widest mt-0">
              <span>{client.toUpperCase()}</span>
              <span>{` | `}</span>
              <span>{dateToYearString(new Date(date))}</span>
            </h2>
            <p className="font-display font-semibold text-[12px] leading-none text-gray-500 tracking-wider mt-1.5">
              {tags}
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => setExpandedSection("brief")}
        className={`p-5 border-b-[1px] border-black ${expandedSection !== "brief" && "cursor-pointer"}`}
      >
        <motion.div
          animate={{
            height: expandedSection === "brief" ? "fit-content" : 20,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="overflow-y-hidden flex relative"
        >
          <RichText
            document={brief.json}
            classNames={{
              paragraph: "text-left	text-sm font-light",
              bold: "font-medium",
            }}
          />
          <AnimatePresence>
            {expandedSection !== "brief" && (
              <motion.div
                key="brief"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 top-0 h-5 w-2.5 flex items-center justify-center"
              >
                <AccordionIcon isToggled={expandedSection === "brief"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div
        onClick={() => setExpandedSection("team")}
        className={`p-5 border-b-[1px] border-black ${expandedSection !== "team" && "cursor-pointer"}`}
      >
        <motion.div
          animate={{
            height: expandedSection === "role" ? "fit-content" : 20,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="overflow-y-hidden flex relative"
        >
          <RichText
            document={role.json}
            classNames={{
              paragraph: "text-left	text-sm font-light",
              bold: "font-medium",
            }}
          />
          {/* <RichText
              document={team.json}
              classNames={{
                paragraph: "text-sm font-light",
                bold: "font-medium",
              }}
            /> */}

          <AnimatePresence>
            {expandedSection !== "role" && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 top-0 h-5 w-2.5 flex items-center justify-center"
              >
                <AccordionIcon isToggled={expandedSection === "role"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div
        onClick={() => setExpandedSection("highlights")}
        className={`p-5 border-b-[1px] border-black lg:border-0 ${expandedSection !== "highlights" && "cursor-pointer"} `}
      >
        <motion.div
          animate={{
            //opacity: expandedSection === "highlights" ? 1 : 0,
            height: expandedSection === "highlights" ? "fit-content" : 20,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="overflow-y-hidden flex relative"
        >
          <RichText
            document={highlights.json}
            classNames={{
              paragraph: "text-left	text-sm font-light",
              bold: "font-medium",
            }}
          />
          <AnimatePresence>
            {expandedSection !== "highlights" && (
              <motion.div
                key="highlights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 top-0 h-5 w-2.5 flex items-center justify-center"
              >
                <AccordionIcon isToggled={expandedSection === "highlights"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
