"use client"
import { useEffect } from "react";
import { transitionPageIn, transitionHomeIn } from "@/app/utils/transition/transition";
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "@/app/styles/global/transition.module.css";
// Components
import Nav from "./components/global/nav";
import Footer from "@/app/components/global/footer";


export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
            if (pathname !== "/") {
                transitionPageIn()
            }
            else if (pathname === "/") {
                transitionHomeIn()
            }
        })
        window.scrollTo(0, 0);
        return () => {
            ScrollTrigger.refresh();
            ctx.revert();
        }
    }, [pathname])

    return (
        <>
            <div id="mask" className={styles.mask}>
                <div id="mask-border" className={styles.maskBorder}>
                    <div id="mask-corner-top-left" className={styles.maskCornerTopLeft} />
                    <div id="mask-corner-top-right" className={styles.maskCornerTopRight} />
                    <div id="mask-corner-bottom-right" className={styles.maskCornerBottomRight} />
                    <div id="mask-corner-bottom-left" className={styles.maskCornerBottomLeft} />
                </div>
            </div>
            <div id="mask-content" className={styles.maskContent}>
                <Nav />
                {children}
                <Footer />
            </div>
        </>
    )
}