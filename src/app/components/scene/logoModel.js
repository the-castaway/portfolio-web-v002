import React, { useEffect, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text, SpotLight } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function LogoModel() {
    const { nodes } = useGLTF("/media/3D/jc_logo.glb");
    const { viewport } = useThree()
    const logo = useRef(null);
    useFrame(() => {
        logo.current.rotation.x += 0.002
        logo.current.rotation.y += 0.002
    })
    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    })

    useEffect(() => {
        console.log(nodes)
    }, [])
    return (
        <group scale={viewport.width / 3.75}>
            <Text position={[0, 0, -2]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                hello world!
            </Text>
            <ambientLight />
            <group ref={logo} position={[0, 0, -1]} scale={[0.6, 0.6, 0.6]}>
                <mesh {...nodes.logo_left}>
                    <MeshTransmissionMaterial {...materialProps} />
                </mesh>
                <mesh {...nodes.logo_right}>
                    <MeshTransmissionMaterial {...materialProps} />
                </mesh>
            </group>

        </group >
    );
}