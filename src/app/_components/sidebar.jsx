
import Image from '@/app/_components/image';



export default function Sidebar({
    image,
    title,
    client,
    date,
    tags
}) {
    return (
        <div className="lg:sticky lg:pb-[60px] lg:overflow-y-scroll lg:w-[393px] lg:top-0 lg:border-r-[1px] lg:border-black">
            <div className="p-5 flex flex-col space-y-2.5 border-b-[1px] border-black">
                <Image ratio={5 / 4} imageUrl={image} />
                <div className="flex flex-col space-y-2">
                <h1 className="font-display text-[32px]">
                    {title}
                </h1>
                <h2 className="font-display text-sm tracking-widest">
                    <span>{client.toUpperCase()}</span>
                    <span>{` | `}</span>
                    <span>{date}</span>
                </h2>
                <ul>
                    {tags.map((tag) => (
                        <li className="font-display fon-semibold text-[12px] text-gray-400 tracking-wider">
                            {tag.toUpperCase()}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
            <div className="p-5 border-b-[1px] border-black">
                <p className="text-sm font-light">
                    <span className="font-medium">BRIEF: </span> Walmart, the world’s largest retailer, is preparing for the next lifecycle of refrigeration cases with a focus is on developing modular designs, adaptive configurations, simple installation and maintenance procedures, and enhancing both the customer and associate experience.
                </p>
            </div>
            <div className="p-5 border-b-[1px] border-black">
                <p className="text-sm font-light">
                    <span className="font-medium">ROLE: </span> Design Manager & Lead Industrial Designer
                </p>
                <p className="text-sm font-light">
                <span className="font-medium">TEAM: </span> Brooke Spencer, Darrell Whitelaw, Ethan Spiva, Ryan Stackhouse, Carlee Pruden, Zach Freeze, Russell Smith, Brandon Ballard, Ben Cole, Sean Mathis, Kent Roberts
                </p>
            </div>
            <div className="p-5 border-b-[1px] border-black lg:border-0">
                <p className="text-lg font-medium">
                    product in development.
                </p>
            </div>
        </div>
    );
}