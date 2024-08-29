"use client";

import Image from "@/app/_components/image";

import useWidth from "@/app/_hooks/use-width";

export default function CollectionThumbnail({ image, name, description }) {
  const width = useWidth();
  return (
    <div className="col-span-2 md:col-span-3">
      <Image
        imageUrl={image.url}
        width={image.width}
        height={image.height}
        alt={image.description}
        ratio={width > 767 ? 0.415 : 0.635}
      />
      <h2 className="font-display text-2xl mt-1">{name}</h2>
      <p className="font-display text-lg">{description}</p>
    </div>
  );
}
