"use client";

import React, { useState, useContext } from "react";
import { motion, cubicBezier, AnimatePresence } from "framer-motion";
import Image from "next/image";

import Slider from "react-slick";

import ArrowRight from "@/app/_components/arrow-right";
import ArrowLeft from "@/app/_components/arrow-left";
import Close from "@/app/_components/close";

import clsx from "clsx";

function NextArrow(props) {
  const { onClick, currentSlide } = props;

  return (
    <div
      className={clsx(
        `group border-l transition-all h-full w-[55px] cursor-pointer flex items-center justify-center`,
        {
          "bg-black fill-white border-white": currentSlide === 0,
          "bg-white fill-black border-black": currentSlide !== 0,
        },
      )}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        transform: "translate(100%, 0)",
      }}
      onClick={onClick}
    >
      <ArrowRight className="transition-transform	scale-75 group-hover:scale-100" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick, currentSlide, setModalOpen } = props;
  console.log(props);
  return (
    <div
      className={clsx(
        `group border-r transition-all h-full w-[55px] cursor-pointer flex items-center justify-center`,
        {
          "bg-black fill-white border-white": currentSlide === 0,
          "bg-white fill-black border-black": currentSlide !== 0,
        },
      )}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: "translate(-100%, 0)",
      }}
      onClick={() => {
        if (currentSlide === 0) {
          setModalOpen(false);
        } else {
          onClick();
        }
      }}
    >
      {currentSlide === 0 ? (
        <Close className="transition-transform	scale-75 group-hover:scale-100" />
      ) : (
        <ArrowLeft className="transition-transform	scale-75 group-hover:scale-100" />
      )}
    </div>
  );
}

const ProcessModal = ({ modalOpen, setModalOpen, processSlides }) => {
  const settings = {
    className: "center",
    dots: false,
    infinite: true, // false
    adaptiveHeight: true,
    speed: 500,
    fade: true,
    //centerPadding: 100,
    slidesToShow: 1, // Show one full slide and the next one peeking
    // centerMode: true,
    // centerPadding: "10%",
    //slidesToScroll: 1,
    //centerMode: true, // Center the slides
    swipeToSlide: true, // Allow swipe to slide
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow setModalOpen={setModalOpen} />,
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  console.log(processSlides);

  return (
    <AnimatePresence initial={true}>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: cubicBezier(0.35, 0.17, 0.3, 0.86),
            duration: 0.8,
          }}
          className="flex items-center justify-center z-30 fixed top-0 left-0 right-0 bottom-0 w-[full] h-[full] bg-black/75"
        >
          <div
            className="z-30 fixed top-0 left-0 right-0 bottom-0 w-[full] h-[full]"
            onClick={handleClose}
          />
          <motion.div
            className="bg-white relative z-40"
            initial={{ y: 200 }}
            animate={{ y: 1 }}
            exit={{ y: 200 }}
            transition={{
              ease: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.8,
            }}
          >
            <div className="w-[75vw]">
              <Slider {...settings}>
                {processSlides.map((image) => (
                  <Image
                    key={image.sys.id}
                    src={image.url}
                    alt={image.description}
                    width={image.width}
                    height={image.height}
                    className=""
                  />
                ))}
              </Slider>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessModal;
