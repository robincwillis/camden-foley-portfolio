const legal = "SITE CONTENT © CAMDEN FOLEY 2015–2024. ALL RIGHTS RESERVED."

const links = [
    {
        href: "camdenfoleydesign@gmail.com",
        label: "camdenfoleydesign@gmail.com"
    },
    {
        href: "resume",
        label: "resume"
    },
    {
        href: "linkedin",
        label: "linkedin"
    },
    {
        href: "recomendations",
        label: "recomendations"
    }
]

export default function Footer() {
    return (
        <div className="fixed bottom-0 bg-white lg:flex lg:flex-row items-center justify-between border-t-[1px] border-black lg:h-[60px] w-full">
            {/* Links */}
            <div className="p-5 lg:py-0 lg:px-5 border-b-[1px] border-black lg:border-0">
                <ul className="flex flex-row flex-wrap lg:flex-nowrap h-full gap-x-5 gap-y-2.5">
                    {links.map((link, index) => (
                        <li className={index === 0 ? 'grow w-full lg:grow-0 lg:width-fit': ''}>
                            <a href="#" className="text-lg underline underline-offset-2">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Copywright */}
            <div className="p-5 lg:py-0 lg:px-5">
                <p className="text-xs">{legal}</p>
            </div>
        </div>
    )
}
