"use client"
import { usePathname, useRouter } from "next/navigation"
import { transitionPageOut } from "../../utils/transition/transition"
// Styles
import styles from "../../styles/global/navLink.module.css"

interface Props {
    href: string
    label: string
    number: string
}

const NavLink = ({ href, label, number }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = () => {
        if (pathname !== href) {
            transitionPageOut(href, router)
        }
    }

    return (
        <a className={styles.navLink} onClick={handleClick}>
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