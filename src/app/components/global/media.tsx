"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "@/app/styles/global/media.module.css"
// Components
import Image from "next/image";

const mediaAspectRatio: Record<"4:5" | "5:4" | "4:3" | "16:9", string> = {
    "4:5": styles.mediaAspect4By5,
    "5:4": styles.mediaAspect5By4,
    "4:3": styles.mediaAspect4By3,
    "16:9": styles.mediaAspect16By9,
} as const;

const mediaMovement: Record<string, number> = {
    "4:5": 28,
    "5:4": 40,
    "4:3": 25,
    "16:9": 28,
}

interface Props {
    src: string;
    aspectRatio: keyof typeof mediaAspectRatio;
    isPriority?: boolean;
}

export default function Media({ src, aspectRatio, isPriority = false }: Props) {
    // Refs
    const media = useRef<HTMLDivElement>(null!)
    const mediaContainer = useRef<HTMLDivElement>(null!)

    // Scroll timeline
    const getScrollTL = () => {
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: media.current,
                pin: false,
                start: `top bottom`,
                end: `bottom top`,
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true,
            },
        }).to(mediaContainer.current, {
            yPercent: mediaMovement[aspectRatio],
            ease: "none",
        })
        return scrollTL;
    }

    // Initialize GSAP timelines and plugins
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            getScrollTL();
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={media} className={`${styles.media} ${mediaAspectRatio[aspectRatio]}`}>
            <div className={styles.mediaOverlay} />
            <div ref={mediaContainer} className={styles.mediaContainer}>
                <Image src={src} alt="media" fill={true} sizes="100%" priority={isPriority ? true : false} loading={isPriority ? "eager" : "lazy"} style={{ objectFit: "cover" }} />
            </div>
        </div>
    );
}