"use client"
import React, { Suspense } from 'react'
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber'
// Styles
import styles from "@/app/styles/global/scene.module.css"
// Components
import SceneBrackets from '@/app/components/global/scene/sceneBrackets';

export default function Scene() {
    // Refs
    const sceneBrackets = useRef<HTMLDivElement>(null!);

    // Scroll timeline
    const getScrollTL = (ctx: gsap.Context) => {
        ctx.add(() => {
            gsap.set(sceneBrackets.current, { opacity: 0 });
            gsap.timeline({
                overwrite: "auto",
                scrollTrigger: {
                    pin: false,
                    scroller: window,
                    start: () => ScrollTrigger.maxScroll(window) - 200,
                    end: () => ScrollTrigger.maxScroll(window),
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                }
            }).fromTo(sceneBrackets.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    y: 0,
                    delay: 0.2,
                    ease: 'ease',
                }
            )
        });
    }

    // Initiate timelines
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context((self) => {
            ScrollTrigger.refresh();
            getScrollTL(self);
        })
        return () => {
            ctx.revert();
        }
    }, [])

    return (
        <div className={styles.scene}>
            <div ref={sceneBrackets} className={styles.sceneBrackets}>
                <Canvas
                    className={styles.sceneCanvas}
                    gl={{ antialias: false, alpha: true }}
                    dpr={[1, 1.5]}
                    onCreated={({ gl }) => {
                        // Check if WebGL2 context was created; if not, Three.js will fall back to WebGL1
                        if (!(gl.getContext() instanceof WebGL2RenderingContext) && !(gl.getContext() instanceof WebGLRenderingContext)) {
                            console.error("Failed to create WebGL context");
                        }
                    }}
                >
                    <Suspense fallback={null}>
                        <SceneBrackets />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
