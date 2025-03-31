"use client"
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "@/app/styles/home/banner.module.css"
// Context 
import { useScreenSize } from "@/app/context/screenSizeContext";

export default function Banner() {
    // Refs
    const banner = useRef<HTMLDivElement>(null!);
    const bannerUIDetails = useRef<HTMLDivElement>(null!);
    const bannerTopLeft = useRef<HTMLDivElement>(null!);
    const bannerTopRight = useRef<HTMLDivElement>(null!);
    const bannerBottomRight = useRef<HTMLDivElement>(null!);
    const bannerBottomLeft = useRef<HTMLDivElement>(null!);
    const bannerTopLeftText = useRef<HTMLDivElement>(null!);
    const bannerTopRightText = useRef<HTMLDivElement>(null!);
    const bannerBottomRightText = useRef<HTMLDivElement>(null!);
    const bannerBottomLeftText = useRef<HTMLDivElement>(null!);
    // Context
    const { isMobile } = useScreenSize();

    // Banner intro timeline
    const getBannerIntroTL = (ctx: gsap.Context) => {
        const bannerIntroHeight = isMobile ? "50%" : "22%";
        const bannerIntroWidth = isMobile ? "85%" : "calc(66vw - 100px)";
        ctx.add(() => {
            const bannerIntroTL = gsap.timeline();
            bannerIntroTL
                .to(bannerUIDetails.current,
                    {
                        width: bannerIntroWidth,
                        height: bannerIntroHeight,
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
        })
    }

    // Scroll timeline
    const getScrollTL = (ctx: gsap.Context) => {
        ctx.add(() => {
            const scrollTL = gsap.timeline({
                scrollTrigger: {
                    pin: false,
                    scroller: window,
                    start: "top top",
                    end: () => window.innerHeight / 2,
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                }
            });
            scrollTL.to(bannerTopLeft.current, {
                x: 40,
                y: 20,
                opacity: 0,
                duration: 0.5,
            }, 0).to(bannerTopRight.current, {
                x: -40,
                y: 20,
                opacity: 0,
                duration: 0.5,
            }, 0).to(bannerBottomRight.current, {
                x: -40,
                y: -20,
                opacity: 0,
                duration: 0.5,
            }, 0).to(bannerBottomLeft.current, {
                x: 40,
                y: -20,
                opacity: 0,
                duration: 0.5,
            }, 0)
        })
    }

    // Initialize timelines
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context((self) => {
            requestAnimationFrame(() => getBannerIntroTL(self));
            ScrollTrigger.refresh();
            requestAnimationFrame(() => getScrollTL(self));
        })
        return () => {
            ctx.revert();
        }
    }, [isMobile])

    return (
        <div ref={banner} className={styles.homeBanner}>
            <div className={styles.homeBannerUI}>
                <div ref={bannerUIDetails} className={styles.homeBannerUIDetails}>
                    <div ref={bannerTopLeft} className={styles.homeBannerUIDetailsTopLeft}>
                        <div className={styles.homeBannerUIDetailsTopLeftCorner} />
                        <p ref={bannerTopLeftText} className={`${styles.homeBannerUIDetailsTopLeftText} detail textColorGrey`}>
                            <span className={`textColorBlue`}>
                                Jaime Castaneda
                            </span>
                        </p>
                    </div>
                    <div ref={bannerTopRight} className={styles.homeBannerUIDetailsTopRight}>
                        <p ref={bannerTopRightText} className={`${styles.homeBannerUIDetailsTopRightText} detail textColorGrey`}>
                            <span className={`textColorDarkGrey`}>
                                @the_casta_way
                            </span>
                        </p>
                        <div className={styles.homeBannerUIDetailsTopRightCorner} />
                    </div>
                    <div ref={bannerBottomRight} className={styles.homeBannerUIDetailsBottomRight}>
                        <p ref={bannerBottomRightText} className={`${styles.homeBannerUIDetailsBottomRightText} detail textColorGrey`}>
                            <span className={`textColorDarkGrey`}>
                                ©2025 V.002
                            </span>
                        </p>
                        <div className={styles.homeBannerUIDetailsBottomRightCorner} />
                    </div>
                    <div ref={bannerBottomLeft} className={styles.homeBannerUIDetailsBottomLeft}>
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
