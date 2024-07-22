'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { usePathname } from "next/navigation";

import Logo from '@/app/_components/logo'


const navItems = [
    {
        href: "/",
        label: "WORK"
    },
    {
        href: "/about",
        label: "INFO"
    }
]

export default function Header() {
    const pathname = usePathname();
    return (
        <div className="sticky top-0 z-10 h-[60px] bg-white flex flex-row items-center justify-between border-b-[1px] border-black">
            <div className="w-[60px] h-[60px] flex items-center justify-center">
                <Logo />
            </div>
            <nav className="flex h-full justify-center">
                <ul className="flex flex-row h-full">
                    {navItems.map((navItem) => (
                        <li key={navItem.label} className="h-full">
                            <Link
                                key="home"
                                href={navItem.href}
                                className={clsx(
                                    "flex h-full text-xl items-center justify-center hover:text-blue-600 md:flex-none md:justify-start w-[75px]"
                                    , {
                                        'font-light': pathname !== navItem.href,
                                        'font-medium': pathname === navItem.href,
                                    })}

                            >
                                {navItem.label}
                            </Link>
                        </li>

                    ))}
                </ul>
            </nav>
        </div>
    );
}