"use client"
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "../../styles/banner.module.css"
// Context 
import { useScreenSize } from "../../context/screenSizeContext";

export default function Banner() {
    // Refs
    const banner = useRef<HTMLDivElement>(null!);
    const bannerUIDetails = useRef<HTMLDivElement>(null!);
    const bannerTopLeftText = useRef<HTMLDivElement>(null!);
    const bannerTopRightText = useRef<HTMLDivElement>(null!);
    const bannerBottomRightText = useRef<HTMLDivElement>(null!);
    const bannerBottomLeftText = useRef<HTMLDivElement>(null!);
    // Context
    const { isMobile } = useScreenSize();

    // Banner intro timeline
    const getBannerIntroTL = () => {
        const bannerIntroTL = gsap.timeline();
        const bannerUIDetailsHeight = isMobile ? "50%" : "25%";
        const bannerUIDetailsWidth = isMobile ? "85%" : "calc(66vw - 100px)";
        bannerIntroTL
            .to(bannerUIDetails.current,
                {
                    width: bannerUIDetailsWidth,
                    height: bannerUIDetailsHeight,
                    duration: 0.5,
                    delay: 0.5,
                    ease: 'ease'
                }, 0)
            .to([bannerTopLeftText.current, bannerTopRightText.current, bannerBottomRightText.current, bannerBottomLeftText.current],
                {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.8,
                }, 0)
        return bannerIntroTL;
    }

    // Scroll timeline
    const getScrollTL = () => {
        const bannerUIDetailsHeight = isMobile ? "55%" : "20%";
        const bannerUIDetailsWidth = isMobile ? "90%" : "50%";
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                pin: false,
                start: 0,
                end: () => innerHeight / 2,
                scrub: 1,
                markers: false,
            }
        });
        scrollTL.to(bannerUIDetails.current, {
            width: bannerUIDetailsWidth,
            height: bannerUIDetailsHeight,
            opacity: 0,
            duration: 0.5,
        }, 0)
        return scrollTL;
    }

    // Initialize timelines
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            getBannerIntroTL();
            getScrollTL();
        })
        return () => {
            ctx.revert();
        }
    }, [isMobile])

    return (
        <div ref={banner} className={styles.homeBanner}>
            <div className={styles.homeBannerUI}>
                <div ref={bannerUIDetails} className={styles.homeBannerUIDetails}>
                    <div className={styles.homeBannerUIDetailsTopLeft}>
                        <div className={styles.homeBannerUIDetailsTopLeftCorner} />
                        <p ref={bannerTopLeftText} className={`${styles.homeBannerUIDetailsTopLeftText} detail textColorGrey`}>
                            <span className={`textColorBlue`}>
                                Jaime Castaneda
                            </span>
                        </p>
                    </div>
                    <div className={styles.homeBannerUIDetailsTopRight}>
                        <p ref={bannerTopRightText} className={`${styles.homeBannerUIDetailsTopRightText} detail textColorGrey`}>
                            <span className={`textColorDarkGrey`}>
                                @the_casta_way
                            </span>
                        </p>
                        <div className={styles.homeBannerUIDetailsTopRightCorner} />
                    </div>
                    <div className={styles.homeBannerUIDetailsBottomRight}>
                        <p ref={bannerBottomRightText} className={`${styles.homeBannerUIDetailsBottomRightText} detail textColorGrey`}>
                            <span className={`textColorDarkGrey`}>
                                ©2025 V.002
                            </span>
                        </p>
                        <div className={styles.homeBannerUIDetailsBottomRightCorner} />
                    </div>
                    <div className={styles.homeBannerUIDetailsBottomLeft}>
                        <div className={styles.homeBannerUIDetailsBottomLeftCorner} />
                        <p ref={bannerBottomLeftText} className={`${styles.homeBannerUIDetailsBottomLeftText} detail textColorGrey`}>
                            <span className={`textColorDarkGrey`}>
                                2025 Folio
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
