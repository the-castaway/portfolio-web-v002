"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
// Styles
import styles from "../../styles/projects/banner.module.css"
// Components
import Image from "next/image";

interface Props {
    media: string
    title: string
}

const Banner = ({ media, title }: Props) => {
    // Refs
    const bannerOverlay = useRef<HTMLDivElement>(null!);

    // Banner intro timeline
    const getScrollTL = () => {
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                pin: false,
                start: 0,
                end: () => innerHeight / 2,
                scrub: 1,
                markers: false,
            }
        });
        scrollTL.to(bannerOverlay.current, {
            opacity: 1,
            ease: 'ease',
        }, 0)
        return scrollTL;
    }

    // Initialize GSAP timelines and plugins
    useEffect(() => {
        const ctx = gsap.context(() => {
            getScrollTL();
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.banner}>
            <div className={`${styles.bannerContent} grid`}>
                <h1 className={styles.bannerContentTitle}>
                    {title}
                </h1>
            </div>
            <div ref={bannerOverlay} className={styles.bannerOverlay} />
            <Image src={media} alt="thumbnail" fill={true} sizes="100%" loading="lazy" style={{ objectFit: "cover" }} />
        </div>
    )
}

export default Banner