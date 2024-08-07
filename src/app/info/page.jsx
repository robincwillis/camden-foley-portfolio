import { getPage } from "@/lib/api/pages";

import Image from "next/image";

import RichText from "@/app/_components/rich-text";

const page = await getPage("info");

export const metadata = {
  title: page.title,
};

export default async function InfoPage() {
  const lockup = page?.sectionsCollection?.items[0];
  return (
    <div className="p-5 lg:p-10 flex flex-col lg:items-center lg:justify-center lg:flex-1 lg:h-full">
      <div className="flex flex-col space-y-5 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4 lg:pb-[60px]">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-2.5 lg:space-y-5">
          <h1 className="text-4xl	lg:text-5xl	font-medium">{lockup?.headline}</h1>
          <div>
            <p className="text-lg lg:text-2xl font-medium">
              {lockup?.subHeadline}
            </p>
            <RichText
              document={lockup?.body?.json}
              classNames={{
                paragraph: "text-lg lg:text-2xl font-light",
              }}
            />
          </div>
          <ul className="hidden lg:flex text-3xl laptop:text-4xl gap-2 laptop:gap-x-2.5 font-medium flex-row flex-wrap">
            {lockup?.tags?.map((tag) => (
              <li className="laptop:leading-[2.75rem]" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-start-8 lg:col-span-5 space-y-5 flex flex-col lg:flex-row lg:justify-end lg:items-center">
          {lockup.image && (
            <Image
              src={lockup.image.url}
              width={lockup.image.width}
              height={lockup.image.height}
              alt={lockup.image.description}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                height: "fit-content",
              }}
            />
          )}
          <ul className="flex text-[21px] sm:text-2xl gap-x-2 sm:gap-x-2.5 font-medium  flex-row flex-wrap lg:hidden">
            {lockup?.tags?.map((tag) => (
              <li className="leading-[2rem]" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
