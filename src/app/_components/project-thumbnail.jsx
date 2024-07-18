import Image from '@/app/_components/image';
import Link from 'next/link';

export default function ProjectThumbnail({
    image,
    title,
    client,
    date,
    tags
}) {

    return (
        <Link 
            href="/projects"
            className="flex flex-col space-y-1"
        >
            <Image imageUrl={image} />
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
                <li className="font-display fon-semibold text-[8px] text-gray-400 tracking-wider">
                    {tag.toUpperCase()}
                </li>
            ))}
            </ul>

        </Link>
    )
}