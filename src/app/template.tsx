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
                    border: 'solid 1px black',
                    height: '100px',
                    width: '100px',
                    position: 'fixed',
                    top: '50%',
                    background: "#dddd"

                }} />
            {children}
        </div>
    )
}