"use client"
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const DURATION = 0.8;
const DELAY = 0.3;
const EASE = "power1.out";

export const transitionPageIn = () => {
    const maskContent = document.getElementById("mask-content");
    const maskBorder = document.getElementById("mask-border");
    const transitionPageInTL = gsap.timeline();
    transitionPageInTL
        .set(maskContent, { opacity: 0 })
        .set(maskBorder, { opacity: 1, height: 0, width: 0, })
        .to(maskBorder, { opacity: 0, height: '30vh', width: "30vw", delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskContent, { opacity: 1, delay: 0.8, duration: DURATION, ease: EASE }, 0)
    return transitionPageInTL;
}

export const transitionPageOut = (href: string, router: AppRouterInstance) => {
    const maskContent = document.getElementById("mask-content");
    const maskBorder = document.getElementById("mask-border");
    const transitionPageOutTL = gsap.timeline();
    transitionPageOutTL
        .set(maskContent, { opacity: 1 })
        .set(maskBorder, { opacity: 0, height: "30vh", width: "30vh", rotate: 90, })
        .to(maskContent, { opacity: 0, delay: 0, duration: DURATION / 2, ease: EASE }, 0)
        .to(maskBorder, { opacity: 1, height: 0, width: 0, rotate: 0, delay: 0.3, duration: DURATION, ease: EASE, onComplete: () => { router.push(href) } }, 0)
}

export const transitionHomeIn = () => {
    const maskContent = document.getElementById("mask-content");
    const nav = document.getElementById("nav");
    const footer = document.getElementById("footer");
    const transitionHomeInTL = gsap.timeline();
    transitionHomeInTL
        .set(maskContent, { opacity: 1 })
        .set(nav, { opacity: 0 })
        .set(footer, { opacity: 0 })
        .to([nav, footer], { opacity: 1, delay: 0.7, duration: DURATION, ease: EASE }, 0)
}