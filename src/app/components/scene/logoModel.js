import React, { useEffect, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text, Environment, PerspectiveCamera } from "@react-three/drei";
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
    gsap.registerPlugin(ScrollTrigger)
    const trigger = document.getElementById("trigger");

    useFrame(() => {
        //logo.current.rotation.x += 0.002
        logo.current.rotation.z -= 0.006
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
        tl.to(logo.current.scale, {
            x: 3,
            y: 3,
            z: 3,
        }, 0)
        tl.to(logoRight.current.rotation, {
            z: 10,
        }, 0)
        tl.to(logoRight.current.position, {
            x: 2,
        }, 0)
        tl.to(logoLeft.current.rotation, {
            z: 10,
        }, 0)
        tl.to(logoLeft.current.position, {
            x: -2,
        }, 0)

    }, [])
    return (
        <>
            <PerspectiveCamera
                makeDefault
                fov={50}
                position={[0, 0, 100]}
            />
            <group scale={viewport.width / 3.75}>
                <Text position={[0, 0, -2]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                    DESIGNER + DEVELOPER + DESIGNER + DEVELOPER
                </Text>
                <ambientLight intensity={1} />
                <group ref={logo} position={[0, 0, -1]} scale={[0.6, 0.6, 0.6]} rotation={[1.3, 0, 0]}>
                    <mesh ref={logoLeft} {...nodes.logo_left}>
                        <MeshTransmissionMaterial {...materialProps} />
                    </mesh>
                    <mesh ref={logoRight} {...nodes.logo_right}>
                        <MeshTransmissionMaterial {...materialProps} />
                    </mesh>
                </group>
                <Environment preset='sunset' />
                <EffectComposer>
                    <DepthOfField {...postProcessingProps}        // Resolution of the effect
                    />
                </EffectComposer>
            </group >
        </>
    );
}