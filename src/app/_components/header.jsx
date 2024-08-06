"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import AppContext from "@/app/_context/app-context";

import Link from "@/app/_components/link";
import Logo from "@/app/_components/logo";

export default function Header({ pages }) {
  const pathname = usePathname();
  const { processModalOpen } = useContext(AppContext); 


  return (
    <div
      className={clsx("sticky w-full top-0  h-[60px] bg-white flex flex-row items-center justify-between border-b-[1px] border-black",{
        "z-20": !processModalOpen,
        "z-10": processModalOpen
      })}
      style={{
        viewTransitionName: "header",
      }}
    >
      <Link
        className="w-[60px] h-[60px] flex items-center justify-center"
        href="/"
      >
        <Logo />
      </Link>
      <nav className="flex h-full justify-center">
        <ul className="group flex flex-row h-full">
          {pages.map((page) => (
            <li
              key={page.slug}
              className={clsx("h-full group-hover:font-light", {
                "font-light": pathname !== page.slug,
                "font-medium": pathname === page.slug,
              })}
            >
              <Link
                href={page.slug}
                className="flex h-full text-xl items-center justify-center hover:font-medium md:flex-none md:justify-start w-[75px]"
              >
                {page.title.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
