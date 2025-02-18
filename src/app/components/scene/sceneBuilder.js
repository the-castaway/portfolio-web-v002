"use client"
import React, { useEffect, useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { MeshTransmissionMaterial, useGLTF, Environment, PerspectiveCamera, useTexture, Detailed } from "@react-three/drei";
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing';
import { useFrame, useThree, Canvas } from '@react-three/fiber'

// Context
import { useScreenSize } from "../../context/screenSizeContext";

import { easing } from 'maath'
// Components
import SceneLogo from "./sceneLogo"
import SceneBrackets from "./sceneBrackets"

export default function SceneBuilder() {
    const { viewport } = useThree();
    // Context
    const { isMobile } = useScreenSize();

    return (
        <>
            <PerspectiveCamera
                makeDefault
                fov={20}
                position={[0, 0, 8]}
            />
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5}>
                <Suspense fallback={null}>
                    <SceneLogo />
                </Suspense>
                <Suspense fallback={null}>
                    <SceneBrackets />
                </Suspense>
            </group>
            {/* Camera rig */}
            <Rig />
            {/* <Brackets /> */}
            <Environment files="/media/3D/monotone_environment.exr" environmentIntensity={1} resolution={1024} />
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

