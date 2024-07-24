
import { getPage } from '@/lib/api/pages'

import Image from '@/app/_components/image'
import RichText from '@/app/_components/rich-text'

const page = await getPage('info')

export const metadata = {
    title: page.title
}

export default async function InfoPage() {
    const lockup = page?.sectionsCollection?.items[0];
    return (
        <div className="p-10 flex flex-col lg:items-center lg:justify-center lg:flex-1 lg:h-full pb-[184px] lg:pb-[80px]">
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
                <div className="lg:col-span-6 flex flex-col space-y-5 lg:space-y-2.5">
                    <h1 className="text-4xl	lg:text-5xl	font-medium">
                        {lockup?.headline}
                    </h1>
                    <div>
                        <p className="text-lg lg:text-2xl font-medium">
                            {lockup?.subHeadline}
                        </p>
                        <RichText
                            document={lockup?.body?.json}
                            classNames={{
                                paragraph: "text-lg lg:text-2xl font-light"
                            }}
                        />
                    </div>
                    <ul className="hidden lg:flex text-4xl leading-[3rem] gap-x-2.5 font-medium  flex-row flex-wrap">
                        {lockup?.tags?.map((tag) => (
                            <li key={tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-start-8 lg:col-span-5 lg:flex lg:justify-end">
                    {lockup.image && (
                        <Image
                            imageUrl={lockup.image.url}
                            ratio={1}
                            width={lockup.image.width}
                            height={lockup.image.height}
                            alt={lockup.image.description}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}