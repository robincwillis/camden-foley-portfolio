"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

import AccordionIcon from "@/app/_components/accordion-icon";
import ImageSlider from "@/app/_components/image-slider";
import ExpandableImageGrid from "@/app/_components/expandable-image-grid";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const scaleFactors = useMemo(() => {
    const imageHeights = images.map(({ height }) => height);
    const aspectRatios = images.map((image) => image.width / image.height);

    const commonHeight = Math.max(...imageHeights);
    const scaledWidths = aspectRatios.map((ratio) => commonHeight * ratio);
    const totalScaledWidth = scaledWidths.reduce(
      (acc, width) => acc + width,
      0,
    );
    return scaledWidths.map((scaledWidth) => scaledWidth / totalScaledWidth);
  }, [images]);

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    if (next) {
      setActiveImageIndex(0);
    }
  };

  const handleImageSelect = (index) => {
    setActiveImageIndex(index);
    setIsExpanded(true);
  };

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
                style={{ width: `${100 * scaleFactors[index]}%` }}
              >
                <Image
                  src={image.url}
                  height={image.height}
                  width={image.width}
                  alt={image.description || ""}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile */}
      <div className="block lg:hidden overflow-x-hidden">
        {mobileImages && mobileImages.length < 3 && (
          <ImageSlider
            expanded={isExpanded}
            images={mobileImages}
            onSlideChange={setIsExpanded}
          />
        )}
        {mobileImages && mobileImages.length > 3 && (
          <ExpandableImageGrid
            images={mobileImages}
            expanded={isExpanded}
            activeIndex={activeImageIndex}
            onImageSelect={handleImageSelect}
            onSlideChange={setActiveImageIndex}
          />
        )}
      </div>

      <button
        className="w-full flex items-center justify-between"
        onClick={toggle}
      >
        <div className="p-5 pr-0 lg:py-5 lg:px-0">
          <RichText
            document={title.json}
            classNames={{
              paragraph: "text-left	font-light text-sm",
              bold: "font-medium",
            }}
          />
        </div>
        <div className="p-5 lg:mr-[-20px] flex items-center space-x-1">
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
            "lg:flex space-y-2.5 lg:space-y-0 lg:space-x-2.5": wrapDescription,
          })}
        >
          {wrapDescription ? (
            description.json.content.map((node, index) => (
              <div
                key={index}
                className="min-w-full lg:min-w-0"
                style={{
                  width: scaleFactors[index]
                    ? `${100 * scaleFactors[index]}%`
                    : undefined,
                }}
              >
                <RichText
                  document={{ ...description.json, content: [node] }}
                  classNames={{
                    paragraph: "font-light text-sm",
                    bold: "font-medium",
                  }}
                />
              </div>
            ))
          ) : (
            <RichText
              document={description.json}
              classNames={{
                paragraph: "font-light text-sm",
                bold: "font-medium",
              }}
            />
          )}
        </div>
      </motion.div>
      <div></div>
    </div>
  );
}
