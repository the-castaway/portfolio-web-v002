"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF, Environment, Lightformer, useTexture, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from 'maath'
import dynamic from 'next/dynamic';
// Components
import Brackets from "@/app/components/global/3D/brackets"
import Logo from "@/app/components/global/3D/logo"
// Context
import { useScreenSize } from "@/app/context/screenSizeContext";

export default function SceneBuilder() {
    // Three
    const { viewport } = useThree();
    // Context
    const { isMobile } = useScreenSize();

    return (
        <>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 8]} />
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5}>
                <fog attach="fog" args={['#0E0E10', 8, 12]} />
                <Logo />

            </group >
            {/* Rig */}
            <Rig />
            {/* Environment */}
            <Environment files="/media/3D/environment.exr" environmentIntensity={1} resolution={1024}>
                <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
            </Environment>
            {/* EffectComposer */}

        </>
    );
}

const Rig = () => {
    useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [Math.sin(-state.pointer.x) * 0.8, state.pointer.y * 0.3, 8],
            0.2,
            delta,
        )
        state.camera.lookAt(0, 0, 0)
    })
}