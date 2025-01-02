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

const Featured = () => {
    const featuredIntroContainer = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = () => {

        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: featuredIntroContainer.current,
                pin: true,
                pinSpacing: false,
                pinReparent: true,
                start: "top top",
                end: "+=1000",
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
                        <p className={`detail`}>
                            <span className={`${styles.featuredIntroHeaderNumber} detail textColorGrey`}>
                                [ 016 ]
                            </span>
                        </p>
                    </div>
                    <div className={styles.featuredBrackets}>
                        <div className={styles.featuredBracketTopLeft} />
                        <div className={styles.featuredBracketTopRight} />
                        <div className={styles.featuredBracketBottomRight} />
                        <div className={styles.featuredBracketBottomLeft} />
                    </div>
                    <div className={styles.featuredIntroDescription}>
                        <p className={` highlight`}>
                            <i>
                                We pool our expertise to turn your wildest projects
                            </i>
                        </p>
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