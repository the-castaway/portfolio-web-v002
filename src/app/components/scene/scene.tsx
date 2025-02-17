"use client"
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber'
// Styles
import styles from "../../styles/home/scene.module.css"
// Components
import SceneBuilder from "../../components/scene/sceneBuilder";

export default function Scene() {
    // Refs
    const scene = useRef<HTMLDivElement>(null!);

    return (
        <div ref={scene} className={styles.scene}>
            <Canvas className={styles.sceneCanvas} gl={{ antialias: false }} dpr={[1, 1.5]}>
                <SceneBuilder />
            </Canvas>
        </div>
    );
}
