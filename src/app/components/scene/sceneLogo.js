"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF, Environment, useTexture, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from 'maath'
// Context
import { useScreenSize } from "../../context/screenSizeContext";

export default function SceneLogo() {
    // Refs
    const logo = useRef(null);
    const logoModel = useRef(null);
    const logoLeft = useRef(null);
    const logoRight = useRef(null);
    const marquee = useRef(null);
    const marqueeText = useRef(null);
    // Three
    const { nodes } = useGLTF("/media/3D/jc_logo_model.glb");
    const marqueeTexture = useTexture('/media/3D/marquee_texture.png')
    marqueeTexture.wrapS = marqueeTexture.wrapT = THREE.RepeatWrapping
    marqueeTexture.repeat.set(9, 1);
    const maskTexture = useTexture('/media/3D/marquee_mask.jpg')
    maskTexture.wrapS = maskTexture.wrapT = THREE.ClampToEdgeWrapping;
    maskTexture.repeat.set(1, 1);
    const { viewport } = useThree();
    // Context
    const { isMobile } = useScreenSize();
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
        scrollTL
            .to(marqueeText.current.position, {
                z: 10,
            }, 0)
            .to(marqueeText.current.material, {
                opacity: 0,
            }, 0)
            .to(logoModel.current.rotation, {
                z: -Math.PI,
            }, 0)
            .to(logo.current.position, {
                z: 10,
            }, 0)
            .to(logoRight.current.rotation, {
                z: -4,
            }, 0)
            .to(logoRight.current.position, {
                x: 2,
            }, 0)
            .to(logoLeft.current.rotation, {
                z: -4,
            }, 0)
            .to(logoLeft.current.position, {
                x: -2,
            }, 0)
        return scrollTL;
    }

    // Intro timeline
    const getIntroTL = () => {
        const introTL = gsap.timeline();
        introTL
            .from(marquee.current.position, {
                z: -10,
                duration: 0.4,
                ease: 'ease',
                delay: 0.5
            }, 0)
            .from(marqueeText.current.material, {
                opacity: 0,
                duration: 0.4,
                ease: 'ease',
                delay: 0.5
            }, 0)
            .from(logo.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.4,
                ease: 'ease',
                delay: 0.5
            }, 0)
            .to(logo.current.rotation, {
                z: -Math.PI,
                duration: 1,
                ease: "sine.out",
                delay: 0.5
            }, 0)
        return introTL;
    }

    // Initiate timelines
    useEffect(() => {
        const ctx = gsap.context(() => {
            getIntroTL();
            getScrollTL();
        })
        return () => {
            ctx.revert();
        }
    }, [])

    // Constant animations
    useFrame((_state, delta) => {
        logo.current.rotation.z -= 0.005
        logo.current.rotation.y -= 0.0001
        marqueeText.current.material.map.offset.x += delta / 15
    })

    return (
        <>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 8]} />
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5}>
                <fog attach="fog" args={['#0E0E10', 8, 12]} />
                {/* Marquee */}
                <group ref={marquee} position={[0, 0, -5]} rotation={[0, Math.PI, 0]}>
                    <mesh ref={marqueeText}>
                        <cylinderGeometry args={[5, 5, 0.25, 128, 32, true]} />
                        <meshBasicMaterial map={marqueeTexture} alphaMap={maskTexture} toneMapped={false} transparent={true} />
                    </mesh>
                </group>
                {/* Logo */}
                <group ref={logo} position={[0, 0, 1]} scale={[0.4, 0.4, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                    <group ref={logoModel}>
                        <mesh ref={logoLeft} {...nodes.logo_left}>
                            <MeshTransmissionMaterial
                                thickness={1}
                                samples={8}
                                resolution={1024}
                                transmission={1}
                                anisotropicBlur={1}
                                envMapIntensity={1}
                                clearcoat={1}
                                clearcoatRoughness={0}
                                ior={1.1}
                                iridescence={2}
                                iridescenceIOR={1}
                                iridescenceThicknessRange={[100, 400]}
                                chromaticAberration={0.2}
                                emissive='#ECECEC'
                                emissiveIntensity={0.01}
                                color='#ECECEC'
                                metalness={0}
                                roughness={0}
                                backside={false}
                            />
                        </mesh>
                        <mesh ref={logoRight} {...nodes.logo_right}>
                            <MeshTransmissionMaterial
                                thickness={1}
                                samples={8}
                                resolution={1024}
                                transmission={1}
                                anisotropicBlur={1}
                                envMapIntensity={1}
                                clearcoat={1}
                                clearcoatRoughness={0}
                                ior={1.1}
                                iridescence={2}
                                iridescenceIOR={1}
                                iridescenceThicknessRange={[100, 400]}
                                chromaticAberration={0.2}
                                emissive='#ECECEC'
                                emissiveIntensity={0.01}
                                color='#ECECEC'
                                metalness={0}
                                roughness={0}
                                backside={false}
                            />
                        </mesh>
                    </group>
                </group>
            </group >
            {/* Rig */}
            <Rig />
            {/* Environment */}
            <Environment files="/media/3D/environment.exr" environmentIntensity={1} resolution={1024} />
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