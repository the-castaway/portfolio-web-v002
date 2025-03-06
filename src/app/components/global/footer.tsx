"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
// Styles
import styles from "@/app/styles/global/footer.module.css"

const Footer = () => {
    // State 
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(false);
    // Refs
    const footerTL = useRef<gsap.core.Timeline | null>(null);
    const footerSignatureText = useRef<HTMLDivElement>(null);
    const footerVersionText = useRef<HTMLDivElement>(null);
    const footerProgressBar = useRef<HTMLDivElement>(null);
    const footerProgressBarFill = useRef<HTMLDivElement>(null);

    // Initialize GSAP timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            footerTL.current = gsap.timeline({ paused: true });
            footerTL.current
                .to(
                    footerProgressBar.current,
                    {
                        opacity: 0,
                        width: 0,
                        flexGrow: 0,
                        duration: 0.3,
                    },
                    0
                )
                .to(
                    [footerVersionText.current, footerSignatureText.current],
                    {
                        color: "#ececec",
                        duration: 0.3,
                    },
                    0
                );
        })

        return () => {
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

            // Animate progress bar width
            gsap.to(footerProgressBarFill.current, { width: `${scrolled}%`, duration: 0.3, ease: "power2.out" });

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
    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <footer id='footer' className={`${styles.footer} grid`}>
            <div className={styles.footerSignature}>
                <p className={`detail`}>
                    <span ref={footerSignatureText} className={`textColorDarkGrey`}>
                        ://JAIMECASTANEDA
                    </span>
                </p>
            </div>
            <div className={styles.footerVersion}>
                <p className={`detail`}>
                    <span ref={footerVersionText} className={`textColorDarkGrey`}>
                        ©2025 V.002
                    </span>
                </p>
            </div>
            <div className={styles.footerScrollTracker}>
                {isAtBottom ?
                    <a onClick={scrollToTop} href="">
                        <p className={`detail`}>
                            BACK&nbsp;TO&nbsp;TOP
                        </p>
                    </a> :
                    <p className={`detail`}>
                        SCROLL
                    </p>
                }
                <div ref={footerProgressBar} className={styles.footerScrollTrackerProgressBar}>
                    <div ref={footerProgressBarFill} className={styles.footerScrollTrackerProgressBarFill} />
                </div>
                <p className={`${styles.footerScrollTrackerPercentage} detail`}>
                    <span>
                        [
                    </span>
                    <span className={styles.footerScrollTrackerPercentageText}>
                        {Math.round(scrollPercent)}%
                    </span>
                    <span>
                        ]
                    </span>
                </p>
            </div>
        </footer>
    )
}

export default Footer