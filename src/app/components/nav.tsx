"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
// Styles
import styles from "../styles/nav.module.css";
// Components
import NavLink from "./navLink"
// Context
import { useScreenSize } from "../context/screenSizeContext";

const Nav = () => {
    // State
    const [currentTime, setCurrentTime] = useState('');
    const [collapsed, setCollapsed] = useState(true);
    // Refs
    const navOverlay = useRef<HTMLDivElement>(null!);
    const navButton = useRef<HTMLDivElement>(null!);
    const navButtonIcon = useRef<HTMLDivElement>(null!);
    const navButtonBorder = useRef<HTMLDivElement>(null!);
    const navModal = useRef<HTMLDivElement>(null!);
    // Vars
    const { isMobile } = useScreenSize();
    // Get current time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const ampm = hours >= 12 ? 'pm' : 'am'
            // Convert hours to 12-hour format
            hours = hours % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}${ampm}`;
            setCurrentTime(formattedTime);
        };
        // Update the time initially
        updateTime();
        // Update the time every minute (60,000 milliseconds)
        const intervalId = setInterval(updateTime, 60000);
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [])

    // Handle expanded nav
    const expandNav = () => {
        setCollapsed(false);
        const expandNavTL = gsap.timeline();
        // Ensure isMobile is up-to-date
        const navButtonWidth = isMobile ? "calc(100vw - 20px)" : "60vw";
        expandNavTL
            .to(navOverlay.current,
                {
                    opacity: 0.6,
                    display: 'block',
                    duration: 0.3,
                    ease: "ease"
                }, 0)
            .to(navButton.current,
                {
                    width: navButtonWidth,
                    height: "calc(100vh - 20px)",
                    duration: 0.3,
                    ease: "ease"
                }, 0)
            .to(navButtonIcon.current,
                {
                    rotate: -45,
                    duration: 0.2,
                    ease: "ease"
                }, 0)
            .to(navButtonBorder.current,
                {
                    opacity: 1,
                    duration: 0.2,
                    ease: "ease"
                }, 0)
            .to(navModal.current,
                {
                    opacity: 1,
                    display: 'block',
                    duration: 0.2,
                    delay: 0.2,
                    ease: "ease"
                }, 0)
    }

    // Handle collapsed nav
    const collapseNav = () => {
        if (collapsed === false) {
            setCollapsed(true);
            const collapseNavTL = gsap.timeline();
            collapseNavTL
                .to(navOverlay.current,
                    {
                        opacity: 0,
                        display: 'none',
                        duration: 0.3,
                        delay: 0.1,
                        ease: "ease",
                    }, 0)
                .to(navButton.current,
                    {
                        width: "60px",
                        height: "60px",
                        duration: 0.3,
                        delay: 0.1,
                        ease: "ease"
                    }, 0)
                .to(navButtonIcon.current,
                    {
                        rotate: 0,
                        duration: 0.2,
                        delay: 0.1,
                        ease: "ease"
                    }, 0)
                .to(navButtonBorder.current,
                    {
                        opacity: 0,
                        duration: 0.2,
                        delay: 0.1,
                        ease: "ease"
                    }, 0)
                .to(navModal.current,
                    {
                        opacity: 0,
                        display: 'none',
                        duration: 0.2,
                        ease: "ease"
                    }, 0)
        }
    }

    // Handle toggle
    const toggleNav = () => {
        if (collapsed) {
            expandNav();
        }
        else {
            collapseNav();
        }
    }

    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.navIcon}`}>
                <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.56452 25.4999L9.38842 17.6872C11.9763 15.1019 11.9763 10.8968 9.38842 8.31223L1.56452 0.499878L2.00272e-05 2.06214L7.82392 9.87483C9.54837 11.5979 9.54837 14.4019 7.82392 16.1249L2.00272e-05 23.9376L1.56452 25.4999Z" className={`${styles.navIconSVG}`} />
                    <path d="M26.4355 25.4999L28 23.9376L20.1768 16.125C18.4513 14.4019 18.4513 11.5979 20.1768 9.87487L28 2.06287L26.4355 0.50061L18.6123 8.31261C16.024 10.8968 16.024 15.1023 18.6123 17.6876L26.4355 25.5003V25.4999Z" className={`${styles.navIconSVG}`} />
                </svg>
            </div>
            <div className={`${styles.navDetails} grid`}>
                <div className={`${styles.navTitleContainer}`}>
                    <p className={`detail`}>Product&nbsp;Designer<br /><span className={`textColorGrey`}>+ Developer</span></p>
                </div>
                <div className={`${styles.navCurrentlyContainer}`}>
                    <p className={`detail`}>
                        Currently<br /><span className={`textColorGrey`}>@Meta</span>
                    </p>
                </div>
                <div className={`${styles.navGeoContainer}`}>
                    <p className={`detail`}>
                        SF,&nbsp;Bay&nbsp;Area<br /><span className={`textColorGrey`}>{currentTime}</span>
                    </p>
                </div>
            </div>
            <div ref={navOverlay} className={styles.navOverlay} onClick={() => { collapseNav(); }} />
            <div ref={navButton} className={`${styles.navButton}`}>
                <div ref={navButtonBorder} className={styles.navButtonBorder} />
                <div ref={navButtonIcon} className={styles.navButtonIcon} onClick={() => { toggleNav(); }}>
                    <div className={styles.navButtonIconVertical} />
                    <div className={styles.navButtonIconHorizontal} />
                </div>
                <div className={styles.navButtonCornerTopLeft} />
                <div className={styles.navButtonCornerTopRight} />
                <div className={styles.navButtonCornerBottomRight} />
                <div className={styles.navButtonCornerBottomLeft} />
                <div ref={navModal} className={styles.navModal}>
                    <div className={styles.navModalContent}>
                        <div className={styles.navModalContentDirectory}>
                            <div className={`${styles.navModalContentHeader}`}>
                                <p className={`detail textColorGrey`}>
                                    <span className={`textColorGrey`}>
                                        Directory
                                    </span>
                                </p>
                            </div>
                            <div className={`${styles.navModalContentDirectoryList}`} onClick={() => { collapseNav(); }} >
                                <NavLink href="/" label="Work" number="[ 01 ]" />
                                <NavLink href="/archive" label="About" number="[ 02 ]" />
                                <NavLink href="/about" label="Lab" number="[ 03 ]" />
                                <NavLink href="/about" label="Archive" number="[ 04 ]" />
                            </div>
                        </div>
                        <div className={styles.navModalContentContact}>
                            <div className={`${styles.navModalContentHeader}`}>
                                <p className={`detail textColorGrey`}>
                                    <span className={`textColorGrey`}>
                                        Contact
                                    </span>
                                </p>
                            </div>
                            <div className={styles.navModalContentContactList}>
                                <a href='www.google.com' className={styles.navModalContentContactLink}>
                                    <div className={styles.navModalContentContactLinkText}>
                                        <p className={`${styles.navModalContentContactTextNumber} detail`}>
                                            <span className={`textColorGrey`}>
                                                [ EM ]
                                            </span>
                                        </p>
                                        <p className={`${styles.navModalContentContactTextLabel} labelSmall`}>
                                            hello@jaimecastaneda.com
                                        </p>
                                    </div>
                                </a>
                                <a href='www.google.com' className={styles.navModalContentContactLink}>
                                    <div className={styles.navModalContentContactLinkText}>
                                        <p className={`${styles.navModalContentContactTextNumber} detail`}>
                                            <span className={`textColorGrey`}>
                                                [ LI ]
                                            </span>
                                        </p>
                                        <p className={`${styles.navModalContentContactTextLabel} labelSmall`}>
                                            the-casta-way
                                        </p>
                                    </div>
                                </a>
                                <a href='www.google.com' className={styles.navModalContentContactLink}>
                                    <div className={styles.navModalContentContactLinkText}>
                                        <p className={`${styles.navModalContentContactTextNumber} detail`}>
                                            <span className={`textColorGrey`}>
                                                [ IG ]
                                            </span>
                                        </p>
                                        <p className={`${styles.navModalContentContactTextLabel} labelSmall`}>
                                            the_casta_way
                                        </p>
                                    </div>
                                </a>
                                <div className={styles.navModalContentContactFooter}>
                                    <div className={styles.navModalContentContactFooterTrademark}>
                                        <p className={`detail`}>
                                            <span className={`textColorDarkGrey`}>©2025 V.002</span>
                                        </p>
                                    </div>
                                    <div className={styles.navModalContentContactFooterGeo}>
                                        <p className={`detail`}>
                                            <span className={`textColorDarkGrey`}>San Francisco, Bay Area {currentTime}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav