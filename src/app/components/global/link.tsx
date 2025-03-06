"use client"
import { usePathname, useRouter } from "next/navigation"
import { transitionPageOut } from "@/app/utils/transition/transition"

interface Props {
    href: string
    children: React.ReactNode
}

const Link = ({ href, children }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation
        if (pathname !== href) {
            transitionPageOut(href, router);
        }
    };

    return (
        <a onClick={handleClick} href={href}>
            {children}
        </a>
    )
}

export default Link