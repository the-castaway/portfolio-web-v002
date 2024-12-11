"use client"

import { useEffect } from "react"
import { transitionPageIn } from "./utils/transition"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") {
            transitionPageIn()
        }
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
                    transform: "rotate(0)",
                    pointerEvents: 'none',
                    zIndex: '100',
                    boxSizing: 'content-box',
                }}>
                <div id="mask-bottom"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        bottom: '0%',
                        left: '0%',
                        transform: 'translate(0%, 100%)',
                        background: "#0e0e10",
                    }} />
                <div id="mask-top"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        transform: 'translate(0%, -100%)',
                        background: "#0e0e10",
                    }} />
                <div id="mask-left"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        transform: 'translate(-100%, 0%)',
                        background: "#0e0e10",
                    }} />
                <div id="mask-right"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0%',
                        right: '0%',
                        transform: 'translate(100%, 0%)',
                        background: "#0e0e10",
                    }} />
                <div id="mask-border"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '50%',
                        left: 'calc(50% - 1px)',
                        transform: 'translate(-50%, -50%)',
                        boxSizing: 'content-box',
                        border: "1px solid #303030",
                        borderRadius: '20px',
                    }}
                >
                    <div id="mask-corner-top-left"
                        style={{
                            height: '20px',
                            width: '20px',
                            position: 'absolute',
                            top: '0%',
                            left: '0%',
                            transform: 'translate(-100%, -100%)',
                            borderTop: '1px solid #ececec',
                            borderLeft: '1px solid #ececec',
                            borderRadius: '5px 0 0 0',
                        }} />

                    <div id="mask-corner-top-right"
                        style={{
                            height: '20px',
                            width: '20px',
                            position: 'absolute',
                            top: '0%',
                            right: '0%',
                            transform: 'translate(100%, -100%)',
                            borderTop: '1px solid #ececec',
                            borderRight: '1px solid #ececec',
                            borderRadius: '0 5px 0 0',
                        }} />

                    <div id="mask-corner-bottom-left"
                        style={{
                            height: '20px',
                            width: '20px',
                            position: 'absolute',
                            bottom: '0%',
                            left: '0%',
                            transform: 'translate(-100%, 100%)',
                            borderBottom: '1px solid #ececec',
                            borderLeft: '1px solid #ececec',
                            borderRadius: '0 0 0 5px',
                        }} />

                    <div id="mask-corner-bottom-right"
                        style={{
                            height: '20px',
                            width: '20px',
                            position: 'absolute',
                            bottom: '0%',
                            right: '0%',
                            transform: 'translate(100%, 100%)',
                            borderBottom: '1px solid #ececec',
                            borderRight: '1px solid #ececec',
                            borderRadius: '0 0 5px 0',
                        }} />
                </div>
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