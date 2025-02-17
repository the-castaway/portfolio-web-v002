"use client"
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshTransmissionMaterial, useGLTF, Environment, PerspectiveCamera, useTexture, Detailed } from "@react-three/drei";
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from 'maath'
import { useScreenSize } from "../../context/screenSizeContext";
//import Brackets from './brackets';

export default function HomeScene() {
    // Refs
    const logo = useRef(null);
    const logoLeft = useRef(null);
    const logoRight = useRef(null);
    const marquee = useRef(null);
    const marqueeText = useRef(null);
    const trigger = document.getElementById("trigger");
    // Context
    const { isMobile } = useScreenSize();
    // Three
    const { nodes } = useGLTF("/media/3D/jc_logo_model.glb");
    const { viewport } = useThree();
    const marqueeTexture = useTexture('/media/3D/marquee_texture.png')
    marqueeTexture.wrapS = marqueeTexture.wrapT = THREE.RepeatWrapping
    marqueeTexture.repeat.set(9, 1);
    const maskTexture = useTexture('/media/3D/marquee_mask.jpg')
    maskTexture.wrapS = maskTexture.wrapT = THREE.ClampToEdgeWrapping;
    maskTexture.repeat.set(1, 1);
    // Plugins
    gsap.registerPlugin(ScrollTrigger)

    // Scroll timeline
    const getScrollTL = () => {
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                pin: false,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                markers: false,
            }
        });
        scrollTL.to(marqueeText.current.position, {
            z: 10,
        }, 0)
        scrollTL.to(logoRight.current.rotation, {
            z: -3,
        }, 0)
        scrollTL.to(logoRight.current.position, {
            x: 10,
        }, 0)
        scrollTL.to(logoLeft.current.rotation, {
            z: -4,
        }, 0)
        scrollTL.to(logoLeft.current.position, {
            x: -10,
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
            <PerspectiveCamera
                makeDefault
                fov={20}
                position={[0, 0, 8]}
            />
            <fog attach="fog" args={['#0E0E10', 8, 12]} />
            <group scale={isMobile ? viewport.width / 2.5 : viewport.width / 5}>
                {/* Marquee */}
                <group ref={marquee} position={[0, 0, -5]} rotation={[0, Math.PI, 0]}>
                    <mesh ref={marqueeText}>
                        <cylinderGeometry args={[5, 5, 0.25, 128, 32, true]} />
                        <meshBasicMaterial map={marqueeTexture} alphaMap={maskTexture} toneMapped={false} transparent={true} />
                    </mesh>
                </group>
                {/* Logo */}
                <group ref={logo} position={[0, 0, 1]} scale={[0.4, 0.4, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh ref={logoLeft} {...nodes.logo_left}>
                        <MeshTransmissionMaterial
                            thickness={1}
                            samples={8}
                            resolution={1024}
                            transmission={1}
                            anisotropicBlur={2}
                            envMapIntensity={1}
                            clearcoat={1}
                            clearcoatRoughness={1}
                            ior={1.1}
                            iridescence={2}
                            iridescenceIOR={1}
                            iridescenceThicknessRange={[100, 400]}
                            chromaticAberration={0.5}
                            emissive='#ECECEC'
                            emissiveIntensity={0.01}
                            color='#ECECEC'
                            metalness={0}
                            roughness={0}
                            backside={false} />
                    </mesh>
                    <mesh ref={logoRight} {...nodes.logo_right}>
                        <MeshTransmissionMaterial
                            thickness={1}
                            samples={8}
                            resolution={1024}
                            transmission={1}
                            anisotropicBlur={2}
                            envMapIntensity={1}
                            clearcoat={1}
                            clearcoatRoughness={1}
                            ior={1.1}
                            iridescence={2}
                            iridescenceIOR={1}
                            iridescenceThicknessRange={[100, 400]}
                            chromaticAberration={0.5}
                            emissive='#ECECEC'
                            emissiveIntensity={0.01}
                            color='#ECECEC'
                            metalness={0}
                            roughness={0}
                            backside={false} />
                    </mesh>
                </group>
                {/* <EffectComposer>
                    <Vignette eskil={false} offset={0.5} darkness={1.1} />
                    <DepthOfField focusDistance={0.1} focalLength={0.5} bokehScale={2} />
                </EffectComposer> */}
                {/* Camera rig */}
                <Rig />
                {/* <Brackets /> */}
                <pointLight position={[-2, 0, -2]} lookAt={[0, 0, 0]} intensity={10} color="white" />
                <pointLight position={[0, 1, -4]} lookAt={[0, 0, 0]} intensity={10} color="white" />
                <Environment files="/media/3D/monotone_environment.exr" environmentIntensity={2} resolution={1024} />
            </group >

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
    // By the time we're here the model is loaded, this is possible through React suspense

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
        // Rotate the object around
        ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
        // If they're too far up, set them back to the bottom
        if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    })

    // Using drei's detailed is a nice trick to reduce the vertex count because
    // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
    return (
        <Detailed ref={ref} distances={[0, 65, 80]}>
            <mesh {...nodes.logo_left}>
                <meshStandardMaterial
                    color="#0E0E10"
                    metalness={1} // Fully metallic
                    roughness={0} // Slightly smooth for reflections
                />
            </mesh>
        </Detailed>
    )
}


const Brackets = ({ speed = 1, count = 40, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => {
    return (
        // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
        // As of three > r154 if postprocessing is used the canvas can not have tonemapping (which is what "flat" is, no tonemapping)
        <>

            {/* As of three > r153 lights work differently in threejs, to get similar results as before you have to add decay={0} */}
            <spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} />
            {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
            {Array.from({ length: count }, (_, i) => <Bracket key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
            <Environment preset="sunset" />
            {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster)
          The normal-pass is not required either, saves a bit of performance */}
            {/* <EffectComposer disableNormalPass multisampling={0}>
                <DepthOfField target={[0, 0, 60]} focalLength={0.2} bokehScale={1} height={700} />
            </EffectComposer> */}
        </>
    )
}