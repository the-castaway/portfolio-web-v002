"use client"
import { useEffect } from "react"
import { transitionPageIn } from "./utils/transition/transition"
import { usePathname } from "next/navigation"
import Footer from "./components/global/footer";
import styles from "./styles/transition.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") {
            transitionPageIn()
        }
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div id="mask" className={styles.mask}>
                <div id="mask-bottom" className={styles.maskBottom} />
                <div id="mask-top" className={styles.maskTop} />
                <div id="mask-left" className={styles.maskLeft} />
                <div id="mask-right" className={styles.maskRight} />
                <div id="mask-border" className={styles.maskBorder}>
                    <div id="mask-corner-top-left" className={styles.maskCornerTopLeft} />
                    <div id="mask-corner-top-right" className={styles.maskCornerTopRight} />
                    <div id="mask-corner-bottom-right" className={styles.maskCornerBottomRight} />
                    <div id="mask-corner-bottom-left" className={styles.maskCornerBottomLeft} />
                </div>
            </div>
            <div id="mask-content" className={styles.maskContent}>
                {children}
                <Footer />
            </div>
        </>
    )
}