"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";

const GRID_GAP = 10; // matches gap-2.5

const SPRING_TRANSITION = { type: "spring", stiffness: 300, damping: 30 };
const SIBLING_FADE = { duration: 0.3, ease: "easeInOut" };

function getCellRect(containerRect, index) {
  const cellSize = (containerRect.width - GRID_GAP) / 2;
  const col = index % 2;
  const row = Math.floor(index / 2);
  return {
    x: containerRect.x + col * (cellSize + GRID_GAP),
    y: containerRect.y + row * (cellSize + GRID_GAP),
    width: cellSize,
    height: cellSize,
  };
}

const ExpandableImageGrid = ({
  images,
  expanded,
  activeIndex,
  onImageSelect,
  onSlideChange,
}) => {
  const containerRef = useRef(null);
  const wasExpandedRef = useRef(expanded);
  const [transition, setTransition] = useState(null);
  const [showSlider, setShowSlider] = useState(expanded);

  useLayoutEffect(() => {
    const wasExpanded = wasExpandedRef.current;
    wasExpandedRef.current = expanded;
    if (wasExpanded === expanded) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cellRect = getCellRect(containerRect, activeIndex);

    // getBoundingClientRect() only reflects the just-committed grid/slider
    // layout after paint, so this can't be derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSlider(false);
    setTransition({
      image: images[activeIndex],
      from: expanded ? cellRect : containerRect,
      to: expanded ? containerRect : cellRect,
      direction: expanded ? "expanding" : "collapsing",
    });
  }, [expanded, activeIndex, images]);

  const handleTransitionComplete = () => {
    setTransition(null);
    setShowSlider(expanded);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: activeIndex,
    afterChange: (currentSlide) => {
      onSlideChange?.(currentSlide);
    },
  };

  return (
    <div className="relative">
      <div className="px-5">
        <div ref={containerRef}>
          {!showSlider ? (
            <div className="grid grid-cols-2 gap-2.5 grid-rows-2">
              {images.map((image, index) => {
                const isActive = index === activeIndex;
                const hidden =
                  (isActive && transition) ||
                  (!isActive && transition?.direction === "expanding");
                const initialHidden = isActive
                  ? Boolean(transition)
                  : transition?.direction === "collapsing";

                return (
                  <motion.button
                    key={image.sys.id}
                    onClick={() => onImageSelect(index)}
                    className="relative w-full h-full"
                    initial={{ opacity: initialHidden ? 0 : 1 }}
                    animate={{ opacity: hidden ? 0 : 1 }}
                    transition={isActive ? { duration: 0 } : SIBLING_FADE}
                  >
                    <Image
                      src={image.url}
                      height={image.height}
                      width={image.width * 2}
                      alt={image.description || ""}
                      priority={isActive}
                    />
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <Slider {...settings} className="-mx-5">
              {images.map((image, index) => (
                <div key={image.sys.id} className="px-5">
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      paddingTop: "100%",
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={image.description || ""}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                      }}
                      width={image.width}
                      height={image.height}
                      priority={index === activeIndex}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      {transition &&
        typeof document !== "undefined" &&
        createPortal(
          <motion.div
            initial={{
              left: transition.from.x,
              top: transition.from.y,
              width: transition.from.width,
              height: transition.from.height,
            }}
            animate={{
              left: transition.to.x,
              top: transition.to.y,
              width: transition.to.width,
              height: transition.to.height,
            }}
            transition={SPRING_TRANSITION}
            onAnimationComplete={handleTransitionComplete}
            style={{ position: "fixed", zIndex: 15, overflow: "hidden" }}
          >
            {transition.direction === "expanding" ? (
              <Image
                src={transition.image.url}
                alt={transition.image.description || ""}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "cover",
                }}
                width={transition.image.width}
                height={transition.image.height}
                priority
              />
            ) : (
              <Image
                src={transition.image.url}
                height={transition.image.height}
                width={transition.image.width * 2}
                alt={transition.image.description || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            )}
          </motion.div>,
          document.body,
        )}
    </div>
  );
};

export default ExpandableImageGrid;
