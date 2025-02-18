"use client"
import { usePathname, useRouter } from "next/navigation"
import { transitionPageOut } from "../../utils/transition/transition"
// Styles
import styles from "../../styles/global/navLogo.module.css"

const NavLogo = () => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = () => {
        if (pathname !== '/') {
            transitionPageOut('/', router)
        }
    }
    return (
        <a className={styles.navLogo} onClick={handleClick}>
            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.56452 25.4999L9.38842 17.6872C11.9763 15.1019 11.9763 10.8968 9.38842 8.31223L1.56452 0.499878L2.00272e-05 2.06214L7.82392 9.87483C9.54837 11.5979 9.54837 14.4019 7.82392 16.1249L2.00272e-05 23.9376L1.56452 25.4999Z" className={styles.navLogoSVG} />
                <path d="M26.4355 25.4999L28 23.9376L20.1768 16.125C18.4513 14.4019 18.4513 11.5979 20.1768 9.87487L28 2.06287L26.4355 0.50061L18.6123 8.31261C16.024 10.8968 16.024 15.1023 18.6123 17.6876L26.4355 25.5003V25.4999Z" className={styles.navLogoSVG} />
            </svg>
        </a >
    )
}

export default NavLogo