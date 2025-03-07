"use client"
import React, { Suspense, useRef } from "react";
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
// Styles
import styles from "@/app/styles/global/scene.module.css"
// Components
const SceneBuilder = dynamic(() => import('@/app/components/global/3D/sceneBuilder'), { ssr: true });
const Builder = dynamic(() => import('@/app/components/global/3D/builder'), { ssr: true });

export default function Scene() {
    const pathname = usePathname();
    // Refs
    const sceneLogo = useRef<HTMLDivElement>(null!);
    const sceneBrackets = useRef<HTMLDivElement>(null!);

    return (
        <div className={styles.scene}>
            <div ref={sceneLogo} className={styles.sceneLogo}>
                <Canvas className={styles.sceneCanvas} shadows gl={{ antialias: false }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                        {pathname === "/" && <SceneBuilder />}
                        {pathname.startsWith("/projects") && <Builder />}
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
