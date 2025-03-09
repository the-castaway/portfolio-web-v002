"use client"
import { usePathname, useRouter } from "next/navigation"
import { transitionPageOut } from "@/app/utils/transition/transition"
// Styles
import styles from "@/app/styles/global/navLink.module.css"

interface Props {
    href: string,
    label: string,
    number: string,
    active?: boolean,
}

const NavLink = ({ href, label, number, active }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation
        if (pathname !== href) {
            transitionPageOut(href, router)
        }
    }

    // Not active state
    if (!active) {
        return (
            <div className={styles.navLink}>
                <div className={styles.navLinkText}>
                    <p className={`${styles.navLinkTextNumber} detail`}>
                        <span className={`textColorOffBlack`}>
                            [ SOON ]
                        </span>
                    </p>
                    <p className={`${styles.navLinkTextLabel} labelLarge textColorOffBlack`}>
                        {label}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <a className={styles.navLink} onClick={handleClick} href={href}>
            <div className={styles.navLinkText}>
                <p className={`${styles.navLinkTextNumber} detail`}>
                    <span className={`textColorGrey`}>
                        {number}
                    </span>
                </p>
                <p className={`${styles.navLinkTextLabel} labelLarge`}>
                    {label}
                </p>
            </div>
            <div className={styles.navLinkButton}>
                <div className={styles.navLinkButtonCornerTopLeft} />
                <div className={styles.navLinkButtonCornerTopRight} />
                <div className={styles.navLinkButtonCornerBottomRight} />
                <div className={styles.navLinkButtonCornerBottomLeft} />
                <div className={styles.navLinkButtonIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.0415 1.13062H18.9403V19.0282" className={styles.navLinkButtonIconSVG} />
                        <path d="M1.0415 19.0282L18.9403 1.13062" className={styles.navLinkButtonIconSVG} />
                    </svg>
                </div>
            </div>
        </a>
    )
}

export default NavLink