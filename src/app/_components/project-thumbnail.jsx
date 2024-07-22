import { useContext, useRef } from 'react';
import Link from 'next/link';


import AppContext from '@/app/_context/app-context'
import Image from '@/app/_components/image';



export default function ProjectThumbnail({
    id,
    image,
    title,
    client,
    date,
    tags
}) {

    const imageRef = useRef(null)
    const { cloneElement, setOriginPosition, setIsAnimating, setCurrentProject } = useContext(AppContext);

    const imageComponent = <Image ref={imageRef} imageUrl={image} />
    
    const handleClone = (elementToClone, ref) => {
        const rect = ref.current.getBoundingClientRect();
        setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        cloneElement(elementToClone);
        setIsAnimating(true);
        setCurrentProject(id);
        
        // console.log(ref);
        // console.log(rect);
    };

    return (
        <Link
            href="/projects"
            className="flex flex-col space-y-1"
        >
            <div
                onClick={() => {
                    console.log('got Click');
                    handleClone(imageComponent, imageRef);
                }}
            >

                {imageComponent}
                
                <p className="font-display text-base">
                    {title}
                </p>
                <p className="font-display font-semibold text-[10px] tracking-widest">
                    <span>{client.toUpperCase()}</span>
                    <span>|</span>
                    <span>{date}</span>
                </p>
                <ul>
                    {tags.map((tag) => (
                        <li key={tag} className="font-display fon-semibold text-[8px] text-gray-400 tracking-wider">
                            {tag.toUpperCase()}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    )
}