"use client"
import { useState, useEffect, useRef } from "react"
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
    const footerScrollText = useRef<HTMLParagraphElement>(null);
    const footerBackToTop = useRef<HTMLButtonElement>(null);

    // Update scroll percentage
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setScrollPercent(Math.min(Math.max(scrolled, 0), 100)); // Clamp to 0-100
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <footer className={styles.footer}>
            <div className={styles.footerInstructions}>
                <p className={`${styles.footerText} detail`}>
                    <span className={`textColorDarkGrey`}>
                        Scroll
                    </span>
                </p>
                <p className={`${styles.footerInstructionsPercentage} ${styles.footerText} detail`}>
                    <span className={`textColorDarkGrey`}>
                        [
                    </span>
                    <span className={`${styles.footerInstructionsPercentageText} textColorDarkGrey`}>
                        {Math.round(scrollPercent)}%
                    </span>
                    <span className={`textColorDarkGrey`}>
                        ]
                    </span>
                </p>
            </div>
            <div className={styles.footerCopyright}>
                <p className={`${styles.footerText} detail`}>
                    <span className={`textColorDarkGrey`}>©2025 v002</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer