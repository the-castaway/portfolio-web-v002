"use client"
import React, { Suspense } from 'react'
import { useLayoutEffect, useRef } from "react";
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
    const sceneLogo = useRef<HTMLDivElement>(null!);
    const sceneBrackets = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = (ctx: gsap.Context) => {
        ctx.add(() => {
            gsap.timeline({
                scrollTrigger: {
                    pin: false,
                    start: 0,
                    end: () => innerHeight / 2,
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: false,
                }
            }).to(sceneLogo.current, {
                opacity: 0,
                zIndex: -2,
            }, 0
            ).to(sceneBrackets.current, {
                opacity: 1,
                y: 0,
                zIndex: -1,
                delay: 0.2,
                ease: 'ease',
            },
                0
            )
        });
        ctx.add(() => {
            gsap.timeline({
                scrollTrigger: {
                    pin: false,
                    start: innerHeight,
                    end: () => innerHeight * 2.5,
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: false,
                }
            }).to(sceneBrackets.current, {
                opacity: 0,
                delay: 0.2,
                ease: 'ease',
            },
                0
            ).set(sceneBrackets.current, {
                opacity: 0,
                y: '20%',
            })
        });
        ctx.add(() => {
            gsap.timeline({
                scrollTrigger: {
                    pin: false,
                    start: () => ScrollTrigger.maxScroll(window) - 200,
                    end: () => ScrollTrigger.maxScroll(window),
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: false,
                }
            }).set(sceneBrackets.current, {
                opacity: 0,
                y: '20%',
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
