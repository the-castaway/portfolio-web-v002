import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
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
        logo.current.rotation.z -= 0.008
        logo.current.rotation.y -= 0.008
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
                markers: false,
            }
        });
        tl.to(logoRight.current.rotation, {
            z: -Math.PI / 4,
        }, 0)
        tl.to(logoRight.current.position, {
            x: 10,
        }, 0)
        tl.to(logoLeft.current.rotation, {
            z: Math.PI / 4,
        }, 0)
        tl.to(logoLeft.current.position, {
            x: -10,
        }, 0)
        const marqueeTL = gsap.timeline();
        const textWidth = 2;
        marqueeTL.to(marquee.current.position, {
            repeat: -1,
            x: -textWidth,
            duration: 10,
            ease: 'none',
        })



        // const logoMatTL = gsap.timeline();
        // logoMatTL.from(logoLeftMat.current, {
        //     transmission: 1,
        //     duration: 1,
        //     ease: 'ease',
        // })
    }, [])

    return (
        <>
            <PerspectiveCamera
                makeDefault
                fov={20}
                position={[0, 0, 160]}
            />
            <fog attach="fog" args={['#0E0E10', 180, 250]} />
            <group scale={viewport.width / 3.75}>
                <Text ref={marquee} position={[0, 0, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                    DESIGNER + DEVELOPER + DESIGNER + DEVELOPER
                </Text>
                <ambientLight intensity={1} />
                <group ref={logo} position={[0, 0, 1]} scale={[0.5, 0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh ref={logoLeft} {...nodes.logo_left}>
                        <MeshTransmissionMaterial
                            ref={logoLeftMat}
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

// function Banner(props) {
//     const ref = useRef()
//     const texture = <Text position={[0, 0, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
//         DESIGNER + DEVELOPER + DESIGNER + DEVELOPER
//     </Text>
//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//     const scroll = useScroll()
//     useFrame((state, delta) => {
//         ref.current.material.time.value += Math.abs(scroll.delta) * 4
//         ref.current.material.map.offset.x += delta / 2
//     })
//     return (
//         <mesh ref={ref} {...props}>
//             <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
//             <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
//         </mesh>
//     )
// }