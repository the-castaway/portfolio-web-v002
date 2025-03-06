"use client"
import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from 'maath'
// Context
import { useScreenSize } from "../../../context/screenSizeContext";

export default function SceneBrackets() {
    // Refs
    const brackets = useRef(null);
    // Three
    const { viewport } = useThree();
    // Context
    const { isMobile } = useScreenSize();
    // Scroll timeline
    const getScrollTL = (ctx) => {
        ctx.add(() => {
            gsap.timeline({

                scrollTrigger: {
                    pin: false,
                    start: 0,
                    end: () => (innerHeight * 2) + 5,
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                    // snap: {
                    //     snapTo: 0.5,
                    //     duration: { min: 0.2, max: 1 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                    //     ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
                    // }
                }
            })
                .to(brackets.current.position, {
                    keyframes: [
                        { z: 0, ease: "sine.out" },
                        { z: 65, ease: "sine.in" }
                    ],
                    duration: 2
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
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1,
                        duration: { min: 0.2, max: 1 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                        ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
                    }
                }
            }).to(brackets.current.position, {
                z: 0,
            })
        });
    }

    // Initiate timelines
    useEffect(() => {
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
        <>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 8]} />
            {/* Brackets */}
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5} renderOrder={1}>
                <group ref={brackets} position={[0, 0, -65]} >
                    <Brackets />
                </group>
            </group>
            {/* Rig */}
            <Rig />
            {/* Environment */}
            <Environment files="/media/3D/environment.exr" environmentIntensity={1} resolution={1024} />
            {/* Postprocessing */}
            <EffectComposer>
                <DepthOfField
                    focusDistance={0}   // Where you want the focus (set close object position here)
                    focalLength={0.0}   // Smaller value makes blur more pronounced
                    bokehScale={7}      // Controls the blur intensity of out-of-focus objects
                    height={700}        // Resolution of the effect
                />
                <Vignette eskil={false} offset={0.1} darkness={1.2} />
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
    const bracket = useRef()
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    const { nodes } = useGLTF("/media/3D/jc_logo_model.glb");
    const [data] = useState({
        y: THREE.MathUtils.randFloatSpread(height * 1.5),
        x: THREE.MathUtils.randFloatSpread(2),
        spin: THREE.MathUtils.randFloat(8, 12),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    })

    // useFrame executes 60 times per second
    useFrame((state, dt) => {
        if (dt < 0.1) bracket.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
        bracket.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
        if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    })
    return (
        <group ref={bracket}>
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

const Brackets = ({ speed = 1, count = 60, depth = 60, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => {
    return (
        <>
            {Array.from({ length: count }, (_, i) => <Bracket key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
        </>
    )
}