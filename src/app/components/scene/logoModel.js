import React, { useEffect, useRef, useState } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text, Environment, PerspectiveCamera, SpotLight, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { DirectionalLight } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


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
        //logo.current.rotation.x += 0.002
        logo.current.rotation.z -= 0.006
        logo.current.rotation.y -= 0.003

    })
    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    })

    const postProcessingProps = useControls({
        focusDistance: { value: 0.1, min: 0, max: 3, step: 0.01 },
        focalLength: { value: 0.1, min: 0, max: 3, step: 0.01 },
        bokehScale: { value: 1, min: 0, max: 10, step: 0.5 },
        height: { value: 480 },
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
        // tl.to(logo.current.scale, {
        //     x: 0,
        //     y: 0,
        //     z: 0,
        // }, 0)
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


    // useEffect(() => {


    //     const tl = gsap.timeline();
    //     // tl.to(logo.current.scale, {
    //     //     x: 0,
    //     //     y: 0,
    //     //     z: 0,
    //     // }, 0)
    //     tl.to(logoLeftMat.current, {
    //         transmission: 1, // Target value
    //         delay: 2,
    //         duration: 2,
    //     }, 0)

    //     console.log(logoLeftMat.current)

    // }, [])
    return (
        <>
            <PerspectiveCamera
                makeDefault
                fov={10}
                position={[0, 0, 500]}
            />
            <group scale={viewport.width / 3.75}>
                <Text ref={marquee} position={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                    DESIGNER + DEVELOPER + DESIGNER + DEVELOPER
                </Text>
                <ambientLight intensity={1} />
                <group ref={logo} position={[0, 0, 1]} scale={[0.6, 0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh ref={logoLeft} {...nodes.logo_left}>
                        <MeshTransmissionMaterial
                            ref={logoLeftMat}
                            thickness={1}
                            samples={16}
                            roughness={0.001}
                            transmission={1}
                            anisotropicBlur={10}
                            envMapIntensity={0.5}
                            clearcoat={2}
                            ior={1.05}
                            iridescence={1}
                            iridescenceIOR={2}
                            iridescenceThicknessRange={[1000, 1400]}
                            transparent={true}
                            backside={true} />
                    </mesh>
                    <mesh ref={logoRight} {...nodes.logo_right}>
                        <MeshTransmissionMaterial
                            thickness={1}
                            samples={16}
                            roughness={0.001}
                            transmission={1}
                            anisotropicBlur={10}
                            envMapIntensity={0.5}
                            clearcoat={2}
                            ior={1.05}
                            iridescence={1}
                            iridescenceIOR={2}
                            iridescenceThicknessRange={[1000, 1400]}
                            transparent={true}
                            backside={false} />
                    </mesh>
                </group>
                <Environment preset='city' environmentIntensity={0.2} />
                {/* <EffectComposer multisampling={0} disableNormalPass={false}>
                    <DepthOfField
                        focusDistance={0}
                        focalLength={1}
                        bokehScale={2}
                        height={480}       // Resolution of the effect
                    />
                </EffectComposer> */}
            </group >
        </>
    );
}