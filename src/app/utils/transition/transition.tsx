"use client"
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const DURATION = 1;
const DELAY = 0.3;
const EASE = "ease";

export const transitionPageIn = () => {
    const mask = document.getElementById("mask");
    const maskTop = document.getElementById("mask-top");
    const maskBottom = document.getElementById("mask-bottom");
    const maskLeft = document.getElementById("mask-left");
    const maskRight = document.getElementById("mask-right");
    const maskBorder = document.getElementById("mask-border");
    const transitionPageInTL = gsap.timeline();
    transitionPageInTL
        .set(mask, { rotate: 90 })
        .set(maskBottom, { bottom: "50%" })
        .set(maskTop, { top: "50%" })
        .set(maskLeft, { left: "50%" })
        .set(maskRight, { right: "50%" })
        .set(maskBorder, { height: 0, width: 0, })
        .to(mask, { rotate: 0, delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskBottom, { bottom: 0, delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskTop, { top: 0, delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskLeft, { left: 0, delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskRight, { right: 0, delay: DELAY, duration: DURATION, ease: EASE }, 0)
        .to(maskBorder, { height: '100vh', width: "100vw", delay: DELAY, duration: DURATION, ease: EASE }, 0)
}

export const transitionPageOut = (href: string, router: AppRouterInstance) => {
    const mask = document.getElementById("mask");
    const maskTop = document.getElementById("mask-top");
    const maskBottom = document.getElementById("mask-bottom");
    const maskLeft = document.getElementById("mask-left");
    const maskRight = document.getElementById("mask-right");
    const maskBorder = document.getElementById("mask-border");
    const transitionPageOutTL = gsap.timeline();
    transitionPageOutTL
        .set(mask, { y: 0 })
        .set(maskBottom, { bottom: 0 })
        .set(maskTop, { top: 0 })
        .set(maskLeft, { left: 0 })
        .set(maskRight, { right: 0 })
        .set(maskBorder, { height: "100vh", width: "100vw" })
        .to(mask, { rotate: 90, duration: DURATION, ease: EASE, onComplete: () => { router.push(href) } }, 0)
        .to(maskBottom, { bottom: "50%", duration: DURATION, ease: EASE }, 0)
        .to(maskTop, { top: "50%", duration: DURATION, ease: EASE }, 0)
        .to(maskLeft, { left: "50%", duration: DURATION, ease: EASE }, 0)
        .to(maskRight, { right: "50%", duration: DURATION, ease: EASE }, 0)
        .to(maskBorder, { height: 0, width: 0, duration: DURATION, ease: EASE }, 0)
}