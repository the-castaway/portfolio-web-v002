"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
// Styles
import styles from "@/app/styles/global/nav.module.css";
// Components
import NavLink from "@/app/components/global/navLink"
import NavLogo from "@/app/components/global/navLogo";
// Context
import { useScreenSize } from "@/app/context/screenSizeContext";

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
    // Context
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
        const navButtonWidth = isMobile ? "calc(100vw - 20px)" : "max(35vw, 350px)";
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
        <nav id='nav' className={styles.nav}>
            <NavLogo />
            <div className={`${styles.navDetails} grid`}>
                <div className={styles.navTitleContainer}>
                    <p className={`detail`}>Product&nbsp;Designer<br /><span className={`textColorGrey`}>+ Developer</span></p>
                </div>
                <div className={styles.navCurrentlyContainer}>
                    <p className={`detail`}>
                        Currently<br /><span className={`textColorGrey`}>@TikTok</span>
                    </p>
                </div>
                <div className={styles.navGeoContainer}>
                    <p className={`detail`}>
                        SF,&nbsp;Bay&nbsp;Area<br /><span className={`textColorGrey`}>{currentTime}</span>
                    </p>
                </div>
            </div>
            <div ref={navOverlay} className={styles.navOverlay} onClick={() => { collapseNav(); }} />
            <div ref={navButton} className={styles.navButton}>
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
                            <div className={styles.navModalContentHeader}>
                                <p className={`detail textColorGrey`}>
                                    <span className={`textColorGrey`}>
                                        Directory
                                    </span>
                                </p>
                            </div>
                            <div className={styles.navModalContentDirectoryList} >
                                <NavLink href="/" label="Work" number="[ 01 ]" active={true} />
                                <NavLink href="/archive" label="About" number="[ 02 ]" active={false} />
                                <NavLink href="/about" label="Lab" number="[ 03 ]" active={false} />
                                <NavLink href="/about" label="Archive" number="[ 04 ]" active={false} />
                            </div>
                        </div>
                        <div className={styles.navModalContentContact}>
                            <div className={styles.navModalContentHeader}>
                                <p className={`detail textColorGrey`}>
                                    <span className={`textColorGrey`}>
                                        Contact
                                    </span>
                                </p>
                            </div>
                            <div className={styles.navModalContentContactList}>
                                <a href='mailto:hello@jaimecastaneda.com' className={styles.navModalContentContactLink}>
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
                                <a href='https://www.linkedin.com/in/the-casta-way/' className={styles.navModalContentContactLink}>
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
                                <a href='https://www.instagram.com/the_casta_way/' className={styles.navModalContentContactLink}>
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