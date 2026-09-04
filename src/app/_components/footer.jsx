"use client";
import { useContext } from "react";
import clsx from "clsx";

import AppContext from "@/app/_context/app-context";
import useScrollDirection from "@/app/_hooks/use-scroll-direction";
import { usePathname } from "next/navigation";

export default function Footer({ site, path }) {
  const links = site.footerLinksCollection.items;
  const pathname = usePathname();
  const { processModalOpen } = useContext(AppContext);

  const isProjectPage = pathname && pathname.includes("/projects");
  const shouldFloat = pathname === "/" || isProjectPage;

  const { scrollDirection, scrolledToBottom, scrolledToTop } =
    useScrollDirection(isProjectPage ? "#project-content-scroll" : undefined);

  const isVisible =
    scrolledToBottom || (scrollDirection === "up" && !scrolledToTop);

  return (
    <div
      style={{ viewTransitionName: "footer" }}
      className={clsx(
        "bg-white lg:flex lg:flex-row items-center justify-between border-t-[1px] border-black lg:h-[60px] w-full transition-transform duration-500 ease-in-out",
        {
          "z-20": !processModalOpen,
          "z-0": processModalOpen,
        },
        shouldFloat && {
          "lg:fixed lg:bottom-0": true,
          "transform lg:translate-y-full": !isVisible,
          "transform lg:translate-y-0": isVisible,
        },
      )}
    >
      {/* Links */}
      <div className="p-5 lg:py-0 lg:px-5 border-b-[1px] border-black lg:border-0">
        <ul className="flex flex-row flex-wrap lg:flex-nowrap h-full gap-x-3 gap-y-2.5 lg:gap-x-5">
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
                className="inline-flex items-center justify-center px-3 pt-[5px] pb-[9px] rounded-full border border-black text-lg leading-[14px] transition-colors duration-200 hover:bg-black hover:text-white"
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
