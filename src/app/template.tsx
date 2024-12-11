"use client"

import { useEffect } from "react"
import { transitionPageIn } from "./utils/transition"

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        transitionPageIn()
    }, [])
    return (
        <div>
            <div id="mask"
                style={{
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: '0%',
                    left: '0%',
                    background: "rgba(255, 255, 255, 0.4)",
                    transform: "rotate(0)",
                    pointerEvents: 'none',
                    zIndex: '100',
                }}>
                <div id="mask-bottom"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        bottom: '0%',
                        left: '0%',
                        transform: 'translate(0%, 100%)',
                        background: "#000000",
                        border: "dashed red",
                    }} />
                <div id="mask-top"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        transform: 'translate(0%, -100%)',
                        background: "#000000",
                        border: "dashed red",
                    }} />
                <div id="mask-left"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        transform: 'translate(-100%, 0%)',
                        background: "#000000",
                        border: "dashed red",
                    }} />
                <div id="mask-right"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        right: '0%',
                        transform: 'translate(100%, 0%)',
                        background: "#000000",
                        border: "dashed red",
                    }} />
            </div>
            <div id="mask-content"
                style={{
                    position: 'relative',
                    zIndex: '0',
                }}>
                {children}
            </div>

        </div>
    )
}