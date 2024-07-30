"use client";
import { useRef, useEffect, useState, useContext } from "react";

import AppContext from "@/app/_context/app-context";

import useViewTransitionSupport from "@/app/_hooks/use-view-transition-support";

import Image from "@/app/_components/image";
import RichText from "@/app/_components/rich-text";

export default function Sidebar({
  id,
  image,
  name,
  client,
  date,
  tags,
  role,
  team,
  brief,
  closing,
}) {
  const viewTransitionsSupported = useViewTransitionSupport();

  const imageRef = useRef(null);

  const { isAnimating, setTargetPosition } = useContext(AppContext);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setTargetPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [imageRef.current]);

  return (
    <div className="lg:sticky lg:overflow-y-scroll lg:w-[393px] lg:top-0 lg:border-r-[1px] lg:border-black">
      <div className="p-5 flex flex-col space-y-2.5 border-b-[1px] border-black">
        <div
          // style={viewTransitionsSupported ? {
          //     viewTransitionName: `image-${id}`
          // }:{
          //     visibility: isAnimating ? 'hidden' : 'visible'
          // }}
          style={{
            viewTransitionName: `image-${id}`,
            visibility: isAnimating ? "hidden" : "visible",
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
          <h1 className="font-display text-[32px]">{name}</h1>
          <h2 className="font-display text-sm tracking-widest">
            <span>{client.toUpperCase()}</span>
            <span>{` | `}</span>
            <span>{date}</span>
          </h2>
          <p className="font-display fon-semibold text-[12px] text-gray-500 tracking-wider">
            {tags}
          </p>
        </div>
      </div>
      <div className="p-5 border-b-[1px] border-black">
        <RichText
          document={brief.json}
          classNames={{
            paragraph: "text-sm font-light",
            bold: "font-medium",
          }}
        />
      </div>
      <div className="p-5 border-b-[1px] border-black">
        <RichText
          document={role.json}
          classNames={{
            paragraph: "text-sm font-light",
            bold: "font-medium",
          }}
        />
        <RichText
          document={team.json}
          classNames={{
            paragraph: "text-sm font-light",
            bold: "font-medium",
          }}
        />
      </div>
      <div className="p-5 border-b-[1px] border-black lg:border-0">
        <RichText
          document={closing.json}
          classNames={{
            paragraph: "text-lg",
            bold: "font-medium",
          }}
        />
      </div>
    </div>
  );
}
