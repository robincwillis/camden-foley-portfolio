"use client"
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx';
import Image from "next/image";
import { motion } from 'framer-motion';



import AccordionIcon from '@/app/_components/accordion-icon';
import ImageSlider from '@/app/_components/image-slider';
import RichText from '@/app/_components/rich-text'

// const imageOne = "https://images.unsplash.com/photo-1602526216007-4a4a197b44aa?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// const imageTwo = "https://images.unsplash.com/photo-1719937051176-9b98352a6cf4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// const imageThree = "https://images.unsplash.com/photo-1720048170996-40507a45c720?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

// const images = [
//     {
//         id: 0,
//         src: imageOne,
//         width: 2787,
//         height: 4181,
//         alt: ""
//     },
//     {
//         id: 1,
//         src: imageTwo,
//         width: 968,
//         height: 644,
//         alt: ""
//     },
//     {
//         id: 2,
//         src: imageThree,
//         width: 553,
//         height: 779,
//         alt: ""
//     },
//     // {
//     //     id: 4,
//     //     src: imageThree,
//     //     width: 553,
//     //     height: 779,
//     //     alt: ""
//     // },

// ]


export default function ProjectSlide({
    isLast,
    title,
    description,
    images
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
                    <RichText
                        document={title.json}
                        classNames={{
                            paragraph: "font-light",
                            bold: "font-medium"
                        }}
                    />
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
                <div className="px-5 pb-5 lg:px-0">
                    <RichText
                        document={description.json}
                        classNames={{
                            paragraph: "font-light",
                            bold: "font-medium"
                        }}
                    />
                </div>
            </motion.div>
            <div>

            </div>
        </div>
    )
}



