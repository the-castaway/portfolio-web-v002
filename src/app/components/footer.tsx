"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import styles from "../styles/footer.module.css"

interface Props {
    href: string
    label: string
    number: string
}

const Footer = () => {
    // State 
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(false);
    // Refs
    const footerDefault = useRef<HTMLDivElement>(null);
    const footerBottom = useRef<HTMLDivElement>(null);
    const footerTL = useRef<gsap.core.Timeline | null>(null);

    // Initialize GSAP timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            footerTL.current = gsap.timeline({ paused: true });
            footerTL.current
                .to(
                    footerDefault.current,
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                    },
                    0
                )
                .to(
                    footerBottom.current,
                    {
                        opacity: 1,
                        yPercent: -100,
                        duration: 0.3,
                        delay: 0.3,
                    },
                    0
                );
        })

        return () => {
            console.log('revert')
            ctx.revert();
        };
    }, []);

    // Update scroll percentage
    useEffect(() => {

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setScrollPercent(Math.min(Math.max(scrolled, 0), 100)); // Clamp to 0-100

            if (scrolled === 100 && !isAtBottom) {
                footerTL.current?.play();
                setIsAtBottom(true);
            }
            else if (scrolled < 100 && isAtBottom) {
                footerTL.current?.reverse();
                setIsAtBottom(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAtBottom]);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <footer className={styles.footer}>
            <div ref={footerDefault} className={styles.footerDefault}>
                <div className={styles.footerDefaultInstructions}>
                    <p className={`${styles.footerDefaultText} detail`}>
                        <span className={`textColorDarkGrey`}>
                            Scroll
                        </span>
                    </p>
                    <p className={`${styles.footerDefaultInstructionsPercentage} ${styles.footerDefaultText} detail`}>
                        <span className={`textColorDarkGrey`}>
                            [
                        </span>
                        <span className={`${styles.footerDefaultInstructionsPercentageText} textColorDarkGrey`}>
                            {Math.round(scrollPercent)}%
                        </span>
                        <span className={`textColorDarkGrey`}>
                            ]
                        </span>
                    </p>
                </div>
                <div className={styles.footerDefaultCopyright}>
                    <p className={`${styles.footerDefaultText} detail`}>
                        <span className={`textColorDarkGrey`}>©2025 V.002</span>
                    </p>
                </div>
            </div>
            <div ref={footerBottom} className={styles.footerBottom}>
                <a className={styles.footerBottomToTop} onClick={scrollToTop}>
                    <p className={`detail`}>
                        <span className={`textColorOffWhite`}>
                            Back to Top
                        </span>
                    </p>
                </a>
                <div className={styles.footerBottomCopyright}>
                    <p className={`detail`}>
                        <span className={`textColorOffWhite`}>©2025 V.002</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer