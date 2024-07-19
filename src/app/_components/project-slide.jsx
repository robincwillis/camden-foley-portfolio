"use client"
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx';
import Image from "next/image";
import { motion } from 'framer-motion';


import AccordionIcon from '@/app/_components/accordion-icon';
import ImageSlider from '@/app/_components/image-slider';

const imageOne = "https://images.unsplash.com/photo-1721265576553-e7f8242fc915?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const imageTwo = "https://images.unsplash.com/photo-1719937051176-9b98352a6cf4?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const imageThree = "https://images.unsplash.com/photo-1720048170996-40507a45c720?q=80&w=2813&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const images = [
    {
        id: 0,
        src: imageOne,
        width: 2787,
        height: 4181,
        alt: ""
    },
    {
        id: 1,
        src: imageTwo,
        width: 968,
        height: 644,
        alt: ""
    },
    {
        id: 2,
        src: imageThree,
        width: 553,
        height: 779,
        alt: ""
    },

]


export default function ProjectSlide({
    isLast
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imagesCalculated, setImagesCalculated] = useState(false);

    const imageHeights = useRef([])
    const commonHeight = useRef(0)
    const aspectRatios = useRef([])
    const scaledWidths = useRef([])
    const totalScaledWidth = useRef(0)
    const scaleFactors = useRef([])

    useEffect(() => {
        imageHeights.current = images.map(({ height }) => height)
        aspectRatios.current = images.map(image => image.width / image.height);

        commonHeight.current = Math.max(...imageHeights.current);
        scaledWidths.current = aspectRatios.current.map(ratio => commonHeight.current * ratio);
        totalScaledWidth.current = scaledWidths.current.reduce((acc, width) => acc + width, 0);
        scaleFactors.current = scaledWidths.current.map(scaledWidth => scaledWidth / totalScaledWidth.current)
        setImagesCalculated(true);
    }, [])

    if (!imagesCalculated) {
        return null;
    }

    // console.log('imageHeights', imageHeights);
    // console.log('aspectRatios', aspectRatios);
    // console.log('commonHeight', commonHeight);
    // console.log('scaledWidths', scaledWidths);
    // console.log('totalScaledWidth', totalScaledWidth);
    // console.log('scaleFactors', scaleFactors)

    const toggle = () => setIsExpanded(!isExpanded);



    return (
        <div className={clsx('py-5 pb-0 lg:p-5 lg:pb-0', {
            'border-b-[1px] border-black': !isLast
        })}>
            {/* Image Container */}
            <div className="hidden lg:block">
                <div className="relative flex w-full space-x-2.5">
                    {images.map((image, index) => {
                        return (
                            <div
                                key={image.id}
                                className={`relative`}
                                style={{ width: `${100 * scaleFactors.current[index]}%` }}
                            >
                                <Image
                                    src={image.src}
                                    height={image.height}
                                    width={image.width}
                                    alt={image.alt}
                                />
                            </div>
                        )

                    })}
                </div>
            </div>
            <div className="block lg:hidden overflow-x-hidden">
                <ImageSlider images={images} />
            </div>

            <div
                className="w-full flex items-center justify-between"
            >
                <div className="p-5 lg:py-5 lg:px-0">
                    <p className="font-light">
                        <span className="font-medium">4FT CASE:</span> Modular case for aisle construction.
                    </p>
                </div>
                <button onClick={toggle} className="p-5 lg:mr-[-20px] flex items-center space-x-1">
                    <div className="relative w-[50px] h-[24px]">
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
                            animate={{ opacity: isExpanded ? 0 : 1, top: isExpanded ? -5 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-0 right-0 w-[50px] h-[24px]"
                        >
                            Show
                        </motion.div>
                    </div>
                    <AccordionIcon isToggled={isExpanded} />
                </button>

            </div>
            <motion.div
                initial={true}
                animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="overflow-y-hidden"
            >
                <p className="px-5 lg:px-0 font-light pb-5">Currently, there are more than 500 SKUs of cases, driven by the diverse range of footprint sizes, temperature ranges, manufacturing vendors, and varying insulation and shelving configurations. The primary goal is to reduce these SKUs by developing a universal solution through modularity and adaptable configurations. The case system is designed around a single 4ft fixture featuring removable end caps for horizontal aisle scaling, a modular top evaporator cassette and insulated body for various temperature requirements, as well as customizable options for doors, shelving, and accessories.</p>
            </motion.div>
            <div>

            </div>
        </div>
    )
}



