"use client"

import { useEffect, useContext, useRef } from 'react';
import clsx from 'clsx'

import Link from '@/app/_components/link'
import Lock from '@/app/_components/lock'

import AppContext from '@/app/_context/app-context'

import useViewTransitionSupport from "@/app/_hooks/use-view-transition-support";

import Image from '@/app/_components/image';

import { dateToYearString } from '@/lib/utils/format';

const setViewTransitionStyles = (styles) => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
};

export default function ProjectThumbnail({
    id,
    image,
    name,
    client,
    date,
    slug,
    tags,
    locked
}) {
    const viewTransitionsSupported = useViewTransitionSupport()
    const imageRef = useRef(null)
    const { setModalOpen, cloneElement, setOriginPosition, isAnimating, setIsAnimating, currentProject, setCurrentProject } = useContext(AppContext);

    const imageComponent = <Image ref={imageRef} imageUrl={image.url} width={image.width} height={image.height} alt={image.description} imageClassName="group-hover:grayscale transition-[filter] duration-500 ease-in-out" />

    useEffect(()=> {
        if (currentProject && currentProject === id) {
            const rect = imageRef.current.getBoundingClientRect();
            setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        }
    }, [currentProject]);

    const handleClone = (elementToClone, ref) => {
        const rect = ref.current.getBoundingClientRect();
        setIsAnimating(true);
        setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        cloneElement(elementToClone);
        setCurrentProject(id);
    };

    const handleLocked = (e) => {
        setModalOpen(true);
    }

    useEffect(() => {
        const viewTransitionStyles = `
            ::view-transition-group(image-${id}) {
                animation-duration: 0.8s;
                animation-timing-function: cubic-bezier(0.34, 1.36, 0.64, 1);
            }
        `;
        //if (viewTransitionsSupported) {
            setViewTransitionStyles(viewTransitionStyles);
        //}
    }, []);

    return (
        <div
            className={clsx("group relative", {
                "cursor-pointer": locked
            })}
            onClick={() => {
                if (locked) {
                    handleLocked()
                }
            }}
        >
            <div
                onClick={() => {
                    if (!locked && !viewTransitionsSupported) {
                        handleClone(imageComponent, imageRef);
                    }
                }}
            >
                <div className="relative">
                    <div
                        // style={viewTransitionsSupported && id === '7rTrmV6oWOzOMShCDAXbMb' ? {
                        //     viewTransitionName: `image-${id}`,
                        // } : {
                        //     visibility: isAnimating && currentProject && currentProject === id ? 'hidden' : 'visible'
                        // }}
                        style={{
                            viewTransitionName: `image-${id}`,
                            visibility: isAnimating && currentProject && currentProject === id ? 'hidden' : 'visible'
                        }}

                    >
                        {imageComponent}
                    </div>
                    {locked && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <Lock />
                        </div>
                    )}
                </div>
                <p className="font-display text-base">
                    {name}
                </p>
                <p className="font-display font-semibold text-[10px] tracking-widest">
                    {client && (
                        <span>{client.toUpperCase()}</span>
                    )}
                    <span>|</span>
                    <span>{dateToYearString(new Date(date))}</span>
                </p>
                <p className="font-display fon-semibold text-[8px] text-gray-400 tracking-wider">
                    {tags}
                </p>
                <Link
                    href={`/projects${slug}`}
                    className={clsx(
                        "absolute top-0 left-0 w-full h-full flex flex-col space-y-1",
                        {
                            'pointer-events-none cursor-pointer': locked
                        }
                    )}
                    aria-disabled={locked}
                    tabIndex={locked ? -1 : undefined}
                />
            </div>
        </div >
    )
}