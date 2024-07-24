'use client'
import clsx from 'clsx'
import { usePathname } from "next/navigation"

import Link from '@/app/_components/link'
import Logo from '@/app/_components/logo'

export default function Header({
    pages
}) {
    const pathname = usePathname();

    return (
        <div className="sticky top-0 z-10 h-[60px] bg-white flex flex-row items-center justify-between border-b-[1px] border-black">
            <Link 
                className="w-[60px] h-[60px] flex items-center justify-center"
                href="/"
            >
                    <Logo />
  
            </Link>
            <nav className="flex h-full justify-center">
                <ul className="flex flex-row h-full">
                    {pages.map((page) => (
                        <li key={page.slug} className="h-full">
                            <Link
                                href={page.slug}
                                className={clsx(
                                    "flex h-full text-xl items-center justify-center hover:text-blue-600 md:flex-none md:justify-start w-[75px]"
                                    , {
                                        'font-light': pathname !== page.slug,
                                        'font-medium': pathname === page.slug,
                                    })}
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