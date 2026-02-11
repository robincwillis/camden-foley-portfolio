import Image from "next/image";

export default function CollectionThumbnail({ image, description }) {
  return (
    <div className="col-span-2 sm:col-span-3 md:row-span-1 md:h-full">
      {/* Mobile: natural height image */}
      <div className="md:hidden">
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.description || ""}
          className="w-full h-auto"
        />
        {description && (
          <p className="text-lg font-medium mt-2">{description}</p>
        )}
      </div>
      {/* Desktop: fill height image */}
      <div className="hidden md:block relative w-full h-full min-h-[200px]">
        <Image
          src={image.url}
          fill
          alt={image.description || ""}
          className="object-cover"
        />
      </div>
    </div>
  );
}
