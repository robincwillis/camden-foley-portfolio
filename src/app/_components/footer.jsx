"use client";
import clsx from "clsx";

import useScrollDirection from "@/app/_hooks/use-scroll-direction";
import { usePathname } from "next/navigation";

export default function Footer({ site, path }) {
  const links = site.footerLinksCollection.items;
  const { scrollDirection, scrolledToBottom, scrolledToTop } =
    useScrollDirection();
  const pathname = usePathname();

  console.log(pathname);

  if (pathname && pathname.includes("projects/")) {
    return null;
  }

  return (
    <div
      className={clsx(
        "bg-white lg:flex lg:flex-row items-center justify-between border-t-[1px] border-black lg:h-[60px] w-full transition-transform duration-500 ease-in-out",
        pathname === "/" && {
          "lg:fixed lg:bottom-0": pathname === "/",
          "transform lg:translate-y-full":
            (scrollDirection === "down" && !scrolledToBottom) || scrolledToTop,
          "transform lg:translate-y-0":
            (scrollDirection === "up" && !scrolledToTop) || scrolledToBottom,
        },
      )}
    >
      {/* Links */}
      <div className="p-5 lg:py-0 lg:px-5 border-b-[1px] border-black lg:border-0">
        <ul className="flex flex-row flex-wrap lg:flex-nowrap h-full gap-x-5 gap-y-2.5">
          {links.map((link, index) => (
            <li
              key={index}
              className={
                index === 0 ? "grow w-full lg:grow-0 lg:width-fit" : ""
              }
            >
              <a
                href={link.to || link?.asset?.url}
                target="_blank"
                className="text-lg underline underline-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Copyright */}
      <div className="p-5 lg:py-0 lg:px-5">
        <p className="text-xs">{site.copyright}</p>
      </div>
    </div>
  );
}
