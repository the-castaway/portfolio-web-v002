"use client"
import { useEffect } from "react";
export default function Loading() {
    useEffect(() => {
        const timeline = gsap.timeline();
        timeline.to(".loader", { opacity: 1, duration: 0.5 });
        // Example animations; modify as needed
        timeline.to(".loader-element", { y: 0, opacity: 1, stagger: 0.2 });
    }, []);

    return (
        <div className="loader">
            <div className="loader-element">Loading...</div>
        </div>
    );
}