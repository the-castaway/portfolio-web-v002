"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import RGBMedia from './RGBmedia'

const Featured = () => {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas>
                <RGBMedia imageUrl="/media/thumbnails/ipt_thumbnail.webp" />
            </Canvas>
        </div>
    )
}

export default Featured;