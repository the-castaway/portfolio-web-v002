"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "../styles/featured.module.css"
// Components
import Image from "next/image";

const Featured = () => {
    const featuredWorkDetailsContainer = useRef<HTMLDivElement>(null!);
    const featuredWorkContainer = useRef<HTMLDivElement>(null!);
    const featuredWorkTitles = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = () => {
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: featuredWorkDetailsContainer.current,
                pin: true,
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
            <div ref={featuredWorkDetailsContainer} className={`${styles.featuredWorkDetailsContainer} grid`}>
                <div className={styles.featuredWorkDetailsHeader}>
                    <div className={styles.featuredWorkDetailsHeaderText}>
                        <p className={`detail`}>
                            <span className={`textColorOffBlack`}>Featured Works</span>
                        </p>
                    </div>
                    <div className={styles.featuredWorkDetailsHeaderNumber}>
                        <p className={`detail`}>
                            <span className={`textColorGrey`}>001 / 006</span>
                        </p>
                    </div>
                </div>
                <div className={styles.featuredWorkDetailsTitles}>
                    <div className={styles.featuredWorkDetailsTitle}>
                        <h3 className={`default`}>
                            Interactive Product Tour
                        </h3>

                    </div>
                    {/* <div className={styles.featuredWorkDetailsTitle}>
                        Meta News Hub
                    </div>
                    <div className={styles.featuredWorkDetailsTitle}>
                        Scroll to Play
                    </div>
                    <div className={styles.featuredWorkDetailsTitle}>
                        Community Voices Hub
                    </div>
                    <div className={styles.featuredWorkDetailsTitle}>
                        Metaverse Explainer
                    </div>
                    <div className={styles.featuredWorkDetailsTitle}>
                        MTIA v2
                    </div> */}
                </div>
                <div className={styles.featuredWorkDetailsCompany}>
                    <div className={styles.featuredWorkDetailsCompanyHeader}>
                        <p className={`detail`}>
                            <span className={`textColorOffBlack`}>Company</span>
                        </p>
                    </div>
                    <div className={styles.featuredWorkDetailsCompanyName}>
                        <p className={`detail`}>
                            <span className={`textColorGrey`}>Meta</span>
                        </p>
                    </div>
                </div>
                <div className={styles.featuredWorkDetailsPurview}>
                    <div className={styles.featuredWorkDetailsPurviewHeader}>
                        <p className={`detail`}>
                            <span className={`textColorOffBlack`}>Purview</span>
                        </p>
                    </div>
                    <div className={styles.featuredWorkDetailsPurviewItems}>
                        <p className={`detail`}>
                            <span className={`textColorGrey`}>UI / UX</span>
                        </p>
                    </div>
                </div>
            </div>

            <div ref={featuredWorkContainer} className={`${styles.featuredWorkContainer} grid`}>

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
            </div>
            {/* <Canvas>
                <RGBMedia imageUrl="/media/thumbnails/ipt_thumbnail.webp" />
            </Canvas> */}
        </div>
    )
}

export default Featured;