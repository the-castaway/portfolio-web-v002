"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "../styles/featured.module.css"
// Components
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import RGBMedia from './RGBmedia'
import Image from "next/image";

const Featured = () => {
    const featuredIntroContainer = useRef<HTMLDivElement>(null!);
    const featuredWorkContainer = useRef<HTMLDivElement>(null!);
    const featuredWorkTitles = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = () => {

        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: featuredWorkTitles.current,
                pin: true,
                pinSpacing: false,
                start: "top center",
                end: "bottom bottom",
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true,
            }
        });
        return scrollTL;
    }

    // Initialize timelines
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            getScrollTL();
        })
        return () => {
            ctx.revert();
        }
    }, [])

    return (
        <div className={styles.featured}>
            <div ref={featuredIntroContainer} className={styles.featuredIntroContainer}>
                <div className={`${styles.featuredIntro} grid`}>
                    <div className={styles.featuredIntroHeader}>
                        <h2>
                            Featured
                        </h2>
                    </div>
                    <div className={styles.featuredIntroHeader}>
                        <h2>
                            <span className={` highlight textColorGrey`}>
                                Work
                            </span>
                        </h2>
                        <p className={`detail`}>
                            <span className={`${styles.featuredIntroHeaderNumber} detail textColorGrey`}>
                                [ 016 ]
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div ref={featuredWorkContainer} className={`${styles.featuredWorkContainer} grid`}>
                <div ref={featuredWorkTitles} className={styles.featuredWorkTitles}>
                    <div className={styles.featuredWorkTitle}>
                        Interactive Product Tour
                    </div>
                    <div className={styles.featuredWorkTitle}>
                        Meta News Hub
                    </div>
                    <div className={styles.featuredWorkTitle}>
                        Scroll to Play
                    </div>
                    <div className={styles.featuredWorkTitle}>
                        Community Voices Hub
                    </div>
                    <div className={styles.featuredWorkTitle}>
                        Metaverse Explainer
                    </div>
                    <div className={styles.featuredWorkTitle}>
                        MTIA v2
                    </div>
                </div>
                <div className={styles.featuredWorkPreviews}>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/ipt_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/news_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/stp_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/cv_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/metaverse_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                    <div className={styles.featuredWorkPreview}>
                        <div className={styles.featuredWorkPreviewMedia}>
                            <Image src={'/media/thumbnails/mtia_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkDetails}>
                            Company Meta Platforms
                            Involvement
                        </div>
                    </div>
                </div>
                <div className={styles.featuredWorkScroll}>
                    <div className={styles.featuredWorkScrollList}>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/ipt_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/news_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/stp_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/cv_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/metaverse_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                        <div className={styles.featuredWorkScrollListNode}>
                            <Image src={'/media/thumbnails/mtia_thumbnail.webp'} alt="thumbnail" fill={true} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Canvas>
                <RGBMedia imageUrl="/media/thumbnails/ipt_thumbnail.webp" />
            </Canvas> */}
        </div>
    )
}

export default Featured;