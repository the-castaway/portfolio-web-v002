import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Plane, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import '../utils/shaders/shaders'

const RGBMedia = ({ imageUrl }) => {
    const materialRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.tDiffuse.value = texture;
        }
    }, [texture]);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.amount.value = Math.sin(clock.getElapsedTime()) * 0.01; // Dynamic effect
        }
    });

    return (
        <Plane args={[1, 1.5]} position={[0, 0, 0]}>
            <colorShiftMaterial ref={materialRef} />
        </Plane>
    );
};

export default RGBMedia;
