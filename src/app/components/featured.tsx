"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

// Styles
import styles from "../styles/featured.module.css"
// Components
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import RGBMedia from './RGBmedia'

const Featured = () => {
    return (
        <div className={styles.featured}>
            <div className={styles.featuredIntroContainer}>
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






            <Canvas>
                <RGBMedia imageUrl="/media/thumbnails/ipt_thumbnail.webp" />
            </Canvas>
        </div>
    )
}

export default Featured;