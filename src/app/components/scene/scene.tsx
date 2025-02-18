"use client"
import React, { Suspense } from 'react'
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber'
// Styles
import styles from "../../styles/home/scene.module.css"
// Components
import SceneLogo from "../../components/scene/sceneLogo";
import SceneBrackets from "../../components/scene/sceneBrackets";

export default function Scene() {
    // Refs
    const scene = useRef<HTMLDivElement>(null!);
    const sceneLogo = useRef<HTMLDivElement>(null!);
    const sceneBrackets = useRef<HTMLDivElement>(null!);
    // Plugins
    gsap.registerPlugin(ScrollTrigger)

    // Scroll timeline
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
        scrollTL.to(sceneLogo.current, {
            opacity: 0,
        }, 0)
            .from(sceneBrackets.current, {
                opacity: 0,
                y: '20%',
            }, 0)
        return scrollTL;
    }


    // Initiate timelines
    useEffect(() => {
        const ctx = gsap.context(() => {
            getScrollTL();
        })
        return () => {
            ctx.revert();
        }
    }, [])


    return (
        <div className={styles.scene}>
            <div ref={sceneLogo} className={styles.sceneLogo}>
                <Canvas className={styles.sceneCanvas} gl={{ antialias: false }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                        <SceneLogo />
                    </Suspense>
                </Canvas>
            </div>
            <div ref={sceneBrackets} className={styles.sceneBrackets}>
                <Canvas className={styles.sceneCanvas} gl={{ antialias: false }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                        <SceneBrackets />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
