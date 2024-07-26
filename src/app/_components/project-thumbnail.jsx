"use client"

import { useContext, useRef } from 'react';
import clsx from 'clsx'

import Link from '@/app/_components/link'
import Lock from '@/app/_components/lock'

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
    tags,
    locked
}) {

    const imageRef = useRef(null)
    const { setModalOpen, cloneElement, setOriginPosition, setIsAnimating, setCurrentProject } = useContext(AppContext);

    const imageComponent = <Image id={id} ref={imageRef} imageUrl={image.url} width={image.width} height={image.height} alt={image.description} />

    const handleClone = (elementToClone, ref) => {
        const rect = ref.current.getBoundingClientRect();
        setIsAnimating(true);
        setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        cloneElement(elementToClone);
    };

    const handleLocked = (e) => {
        setModalOpen(true);
    }

    return (
        <div
            className={clsx({
                "cursor-pointer": locked
            })}
            onClick={() => {
                if (locked) {
                    handleLocked()
                }
            }}
        >
            <Link
                href={`/projects${slug}`}
                className={clsx(
                    "flex flex-col space-y-1",
                    {
                        'pointer-events-none cursor-pointer': locked
                    }
                )}
                aria-disabled={locked}
                tabIndex={locked ? -1 : undefined}
            >
                <div
                    onClick={() => {
                        if (!locked) {
                            handleClone(imageComponent, imageRef);
                        }
                    }}
                >
                    <div className="relative">

                        <div
                            style={{
                                viewTransitionName: `image-${id}`
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
                    {/* <ul>
                    {tags.map((tag) => (
                        <li key={tag} className=>
                            {tag.toUpperCase()}
                        </li>
                    ))}
                </ul> */}
                </div>
            </Link>
        </div>
    )
}