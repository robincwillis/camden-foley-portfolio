import clsx from 'clsx';

import Image from "next/image";

const imageOne = "https://images.unsplash.com/photo-1721265576553-e7f8242fc915?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const imageTwo = "https://images.unsplash.com/photo-1719937051176-9b98352a6cf4?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const imageThree = "https://images.unsplash.com/photo-1720048170996-40507a45c720?q=80&w=2813&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const images = [
    {
        id: 0,
        src: imageOne,
        width: 2787,
        height: 4181,
    },
    {
        id: 1,
        src: imageTwo,
        width: 968,
        height: 644,
    },
    {
        id: 2,
        src: imageThree,
        width: 553,
        height: 779,
    },

]

export default function ProjectSlide({
    isLast
}) {

    return (
        <div className={clsx('p-5', {
            'border-b-[1px] border-black': !isLast
        })}>
            {/* Image Container */}
            <div className="bg-red-300 relative flex w-full space-x-2.5">
                {images.map((image) => {
                    const aspectRatio = image.width / image.height
                    console.log(aspectRatio)
                    // aspect-[${image.width}/${image.height}]
                    return (
                        <div
                            key={image.id}
                            className={`relative bg-blue-300 aspect-[4/3]`}
                            //style={{ paddingBottom: `${100 / aspectRatio}%` }}
                        >
                            <Image
                                src={image.src}
                                height={image.height}
                                width={image.width}
                                alt="10"
                                //className="absolute inset-0 w-full h-full object-cover"

                            />
                        </div>
                    )

                })}
            </div>
            <p>Hello Slide</p>
        </div>
    )
}



// h-[523px]