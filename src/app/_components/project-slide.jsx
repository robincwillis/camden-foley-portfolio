"use client";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

import AccordionIcon from "@/app/_components/accordion-icon";
import ImageSlider from "@/app/_components/image-slider";
import RichText from "@/app/_components/rich-text";

export default function ProjectSlide({
  isLast,
  title,
  description,
  wrapDescription,
  images,
  mobileImages,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imagesCalculated, setImagesCalculated] = useState(false);

  const imageHeights = useRef([]);
  const commonHeight = useRef(0);
  const aspectRatios = useRef([]);
  const scaledWidths = useRef([]);
  const totalScaledWidth = useRef(0);
  const scaleFactors = useRef([]);

  useEffect(() => {
    imageHeights.current = images.map(({ height }) => height);
    aspectRatios.current = images.map((image) => image.width / image.height);

    commonHeight.current = Math.max(...imageHeights.current);
    scaledWidths.current = aspectRatios.current.map(
      (ratio) => commonHeight.current * ratio,
    );
    totalScaledWidth.current = scaledWidths.current.reduce(
      (acc, width) => acc + width,
      0,
    );
    scaleFactors.current = scaledWidths.current.map(
      (scaledWidth) => scaledWidth / totalScaledWidth.current,
    );
    setImagesCalculated(true);
  }, []);

  if (!imagesCalculated) {
    return null;
  }

  const toggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="py-5 pb-0 lg:p-5 lg:pb-0 border-b-[1px] border-black">
      {/* Image Container */}
      <div className="hidden lg:block">
        <div className="relative flex w-full space-x-2.5">
          {images.map((image, index) => {
            return (
              <div
                key={image.sys.id}
                className={`relative`}
                style={{ width: `${100 * scaleFactors.current[index]}%` }}
              >
                <Image
                  src={image.url}
                  height={image.height}
                  width={image.width}
                  alt={image.description}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile */}
      <div className="block lg:hidden overflow-x-hidden">
        {mobileImages && mobileImages.length < 3 && (
          <ImageSlider expanded={isExpanded} images={mobileImages} />
        )}
        {mobileImages && mobileImages.length > 3 && (
          <div className="px-5 grid grid-cols-2 gap-2.5 grid-rows-2">
            {mobileImages.map((image) => (
              <Image
                key={image.sys.id}
                src={image.url}
                height={image.height}
                width={image.width * 2}
                alt={image.description}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="w-full flex items-center justify-between"
        onClick={toggle}
      >
        <div className="p-5 lg:py-5 lg:px-0">
          <RichText
            document={title.json}
            classNames={{
              paragraph: "text-left	font-light",
              bold: "font-medium",
            }}
          />
        </div>
        <div className="p-5 lg:mr-[-20px] flex items-center space-x-1">
          <div className="hidden lg:block relative w-[50px] h-[24px]">
            <motion.div
              initial={true}
              animate={{ opacity: isExpanded ? 1 : 0, top: isExpanded ? 0 : 5 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 right-0 w-[50px] h-[24px]"
            >
              Hide
            </motion.div>
            <motion.div
              initial={true}
              animate={{
                opacity: isExpanded ? 0 : 1,
                top: isExpanded ? -5 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 right-0 w-[50px] h-[24px]"
            >
              Show
            </motion.div>
          </div>
          <AccordionIcon isToggled={isExpanded} />
        </div>
      </button>
      <motion.div
        initial={true}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.5, type: "spring" }}
        className="overflow-y-hidden"
      >
        <div
          className={clsx("px-5 pb-5 lg:px-0", {
            "lg:flex lg:space-x-5": wrapDescription,
          })}
        >
          <RichText
            document={description.json}
            classNames={{
              paragraph: "font-light",
              bold: "font-medium",
            }}
          />
        </div>
      </motion.div>
      <div></div>
    </div>
  );
}
