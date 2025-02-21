"use client"
import { usePathname, useRouter } from "next/navigation"
import { transitionPageOut } from "../../utils/transition/transition"
//Styles
import styles from "../../styles/global/link.module.css";

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
        <a className={styles.link} onClick={handleClick}>
            {children}
        </a>
    )
}

export default Link