import React, { useEffect, useRef, useState } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text, Environment, PerspectiveCamera, SpotLight, MeshDistortMaterial, PerformanceMonitor, Lightformer } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, N8AO, TiltShift2 } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { DirectionalLight } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Perf } from 'leva';
import { easing } from 'maath'



export default function LogoModel() {
    const { nodes } = useGLTF("/media/3D/jc_logo.glb");
    const { viewport } = useThree()
    const logo = useRef(null);
    const logoLeft = useRef(null);
    const logoRight = useRef(null);
    const marquee = useRef(null);
    const logoLeftMat = useRef(null);
    gsap.registerPlugin(ScrollTrigger)
    const trigger = document.getElementById("trigger");

    useFrame(() => {
        logo.current.rotation.z -= 0.006
        logo.current.rotation.y -= 0.003
    })

    useEffect(() => {
        console.log(trigger)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                pin: false,
                start: 'top bottom',
                end: '+2000',
                scrub: 1,
                markers: true,
            }
        });
        tl.to(logoRight.current.rotation, {
            z: -Math.PI / 4,
        }, 0)
        tl.to(logoRight.current.position, {
            x: 5,
        }, 0)
        tl.to(logoLeft.current.rotation, {
            z: Math.PI / 4,
        }, 0)
        tl.to(logoLeft.current.position, {
            x: -5,
        }, 0)
        const marqueeTL = gsap.timeline();
        marqueeTL.to(marquee.current.position, {
            repeat: 200,
            x: -2,
            duration: 10,
            ease: 'none',
        })
    }, [])

    return (
        <>
            {/* <Perf position="top-left" /> */}
            <PerspectiveCamera
                makeDefault
                fov={20}
                position={[0, 0, 160]}
            />
            <PerformanceMonitor onDecline={() => degrade(true)} />
            <fog attach="fog" args={['#0E0E10', 160, 185]} />
            <group scale={viewport.width / 3.75}>
                <Text ref={marquee} position={[0, 0, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                    DESIGNER + DEVELOPER + DESIGNER + DEVELOPER
                </Text>
                <ambientLight intensity={1} />
                <group ref={logo} position={[0, 0, 1]} scale={[0.5, 0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh ref={logoLeft} {...nodes.logo_left}>
                        <MeshTransmissionMaterial
                            thickness={0.3}
                            samples={16}
                            resolution={1024}
                            roughness={0.001}
                            transmission={1}
                            anisotropicBlur={10}
                            envMapIntensity={0.5}
                            clearcoat={1}
                            ior={1.05}
                            iridescence={1}
                            iridescenceIOR={2}
                            iridescenceThicknessRange={[1000, 1400]}
                            chromaticAberration={0.15}
                            anisotropy={0.25}
                            color='white'
                            transparent={true}
                            backside={false} />
                    </mesh>
                    <mesh ref={logoRight} {...nodes.logo_right}>
                        <MeshTransmissionMaterial
                            thickness={0.3}
                            samples={16}
                            resolution={1024}
                            roughness={0.001}
                            transmission={1}
                            anisotropicBlur={10}
                            envMapIntensity={0.5}
                            clearcoat={1}
                            ior={1.05}
                            iridescence={1}
                            iridescenceIOR={2}
                            iridescenceThicknessRange={[1000, 1400]}
                            chromaticAberration={0.15}
                            anisotropy={0.25}
                            color='white'
                            transparent={true}
                            backside={false} />
                    </mesh>
                </group>
                <Rig />
                <Environment preset='city' environmentIntensity={0.2} />
            </group >
        </>
    );
}

function Rig() {
    useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [Math.sin(-state.pointer.x) * 10, state.pointer.y * 6, 160],
            0.2,
            delta,
        )
        state.camera.lookAt(0, 0, 0)
    })
}