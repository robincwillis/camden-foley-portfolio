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
        <div className="fixed bottom-0 bg-white flex flex-row items-center justify-between border-t-[1px] border-black h-[60px] w-full px-5">
            {/* Links */}
            <div>
                <ul className="flex flex-row h-full space-x-5">
                    {links.map((link) => (
                        <li>
                            <a href="#" className="text-lg underline underline-offset-2">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Copywright */}
            <div>
                <p className="text-xs">{legal}</p>
            </div>
        </div>
    )
}
