"use client"
import React, { Suspense } from 'react'
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic';
// Styles
import styles from "../../../styles/global/scene.module.css"
// Components
const SceneBrackets = dynamic(() => import('./sceneBrackets'), { ssr: true });

export default function Scene() {
    // Refs
    const sceneBrackets = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = (ctx: gsap.Context) => {
        ctx.add(() => {
            gsap.timeline({
                scrollTrigger: {
                    pin: false,
                    start: () => ScrollTrigger.maxScroll(window) - 200,
                    end: () => ScrollTrigger.maxScroll(window),
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                }
            }).to(sceneBrackets.current, {
                opacity: 1,
                y: 0,
                delay: 0.2,
                ease: 'ease',
            },
                0
            )
        });
    }

    // Initiate timelines
    useLayoutEffect(() => {
        // Plugins
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context((self) => {
            getScrollTL(self);
        })
        return () => {
            ctx.revert();
        }
    }, [])

    return (
        <div className={styles.scene}>
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
