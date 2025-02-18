"use client"
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, DepthOfField, ToneMapping, Vignette } from '@react-three/postprocessing'
import { easing } from 'maath'
// Context
import { useScreenSize } from "../../context/screenSizeContext";

export default function SceneBrackets() {
    const { viewport } = useThree();
    // Context
    const { isMobile } = useScreenSize();

    return (
        <>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 8]} />
            {/* Render SceneBrackets separately on layer 1 */}
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5} renderOrder={1}>
                <Brackets />
            </group>
            {/* Rig */}
            <Rig />
            {/* Environment */}
            <Environment files="/media/3D/monotone_environment.exr" environmentIntensity={1} resolution={1024} />
            {/* Apply post-processing ONLY to SceneBrackets */}
            <EffectComposer>
                <DepthOfField focusDistance={0} focalLength={0.0} bokehScale={7} height={700} />
                {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
            </EffectComposer>
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

const Bracket = ({ index, z, speed }) => {
    const ref = useRef()
    // useThree gives you access to the R3F state model
    const { viewport, camera } = useThree()
    // getCurrentViewport is a helper that calculates the size of the viewport
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
    // It can automatically handle draco and meshopt-compressed assets without you having to
    // worry about binaries and such ...
    const { nodes } = useGLTF("/media/3D/jc_logo_model.glb");
    // Local component state, it is safe to mutate because it's fixed data
    const [data] = useState({
        // Randomly distributing the objects along the vertical
        y: THREE.MathUtils.randFloatSpread(height * 2),
        // This gives us a random value between -1 and 1, we will multiply it with the viewport width
        x: THREE.MathUtils.randFloatSpread(2),
        // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
        spin: THREE.MathUtils.randFloat(8, 12),
        // Some random rotations, Math.PI represents 360 degrees in radian
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    })

    // useFrame executes 60 times per second
    useFrame((state, dt) => {
        // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
        // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
        // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
        if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
        ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
        // If they're too far up, set them back to the bottom
        if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    })
    return (
        <group ref={ref}>
            <mesh {...nodes.logo_left}>
                <meshStandardMaterial
                    color="#4A4A4A"
                    metalness={1} // Fully metallic
                    roughness={0}
                    toneMapped={false} // Slightly smooth for reflections
                />
            </mesh>
        </group>
    )
}

const Brackets = ({ speed = 1, count = 40, depth = 60, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => {
    return (
        <>
            <spotLight position={[0, 20, 10]} penumbra={5} decay={0} intensity={3} color={'#4552D9'} />
            {Array.from({ length: count }, (_, i) => <Bracket key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
        </>
    )
}