"use client"
import { useRef, useEffect, useContext } from 'react'

import AppContext from '@/app/_context/app-context'

import Image from '@/app/_components/image'
import RichText from '@/app/_components/rich-text'

export default function Sidebar({
    id,
    image,
    title,
    client,
    date,
    tags,
    role,
    team,
    brief,
    closing
}) {
    const imageRef = useRef(null);
    const { setTargetPosition } = useContext(AppContext);

    useEffect(() => {
        if (imageRef && imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            setTargetPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        }
    }, [imageRef.current])

    // TODO wait for animation to finish and render image
    // Don't render animation if sidebar is scrolled
    // Or update image position if sidebar is scrolled

    return (
        <div className="lg:sticky lg:overflow-y-scroll lg:w-[393px] lg:top-0 lg:border-r-[1px] lg:border-black">
            <div className="p-5 flex flex-col space-y-2.5 border-b-[1px] border-black">
                <div
                    style={{
                        viewTransitionName: `image-${id}`
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
                </div>
                <div className="flex flex-col space-y-2">
                    <h1 className="font-display text-[32px]">
                        {title}
                    </h1>
                    <h2 className="font-display text-sm tracking-widest">
                        <span>{client.toUpperCase()}</span>
                        <span>{` | `}</span>
                        <span>{date}</span>
                    </h2>
                    {/* <ul>
                    {tags.map((tag) => (
                        <li key={tag} className="font-display fon-semibold text-[12px] text-gray-400 tracking-wider">
                            {tag.toUpperCase()}
                        </li>
                    ))}
                </ul> */}
                    <p className="font-display fon-semibold text-[12px] text-gray-400 tracking-wider">
                        {tags}
                    </p>
                </div>
            </div>
            <div className="p-5 border-b-[1px] border-black">
                <RichText
                    document={brief.json}
                    classNames={{
                        paragraph: 'text-sm font-light',
                        bold: 'font-medium'
                    }}
                />

            </div>
            <div className="p-5 border-b-[1px] border-black">
                <RichText
                    document={role.json}
                    classNames={{
                        paragraph: 'text-sm font-light',
                        bold: 'font-medium'
                    }}
                />
                <RichText
                    document={team.json}
                    classNames={{
                        paragraph: 'text-sm font-light',
                        bold: 'font-medium'
                    }}
                />
            </div>
            <div className="p-5 border-b-[1px] border-black lg:border-0">
                <RichText
                    document={closing.json}
                    classNames={{
                        paragraph: 'text-lg',
                        bold: 'font-medium'
                    }}
                />
            </div>
        </div>
    );
}