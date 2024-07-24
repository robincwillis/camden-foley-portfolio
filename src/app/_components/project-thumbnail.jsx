"use client"

import { useContext, useRef } from 'react';

import Link from '@/app/_components/link'


import AppContext from '@/app/_context/app-context'
import Image from '@/app/_components/image';

import { dateToYearString } from '@/lib/utils/format';

export default function ProjectThumbnail({
    id,
    image,
    name,
    client,
    date,
    slug,
    tags
}) {

    const imageRef = useRef(null)
    const { cloneElement, setOriginPosition, setIsAnimating, setCurrentProject } = useContext(AppContext);

    const imageComponent = <Image id={id} ref={imageRef} imageUrl={image.url} width={image.width} height={image.height} alt={image.description} />
    
    const handleClone = (elementToClone, ref) => {
        const rect = ref.current.getBoundingClientRect();
        setIsAnimating(true);
        setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        cloneElement(elementToClone);
    };

    return (
        <Link
            href={`/projects${slug}`}
            className="flex flex-col space-y-1"
        >
            <div
                onClick={() => {
                    handleClone(imageComponent, imageRef);
                }}
            >
                <div
                    style={{
                        viewTransitionName: `image-${id}`
                    }}
                >
                    {imageComponent}
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
                {/* <ul>
                    {tags.map((tag) => (
                        <li key={tag} className=>
                            {tag.toUpperCase()}
                        </li>
                    ))}
                </ul> */}
            </div>
        </Link>
    )
}