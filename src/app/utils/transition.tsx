import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const transitionPageIn = () => {
    const mask = document.getElementById("mask");
    const maskTop = document.getElementById("mask-top");
    const maskBottom = document.getElementById("mask-bottom");
    const maskLeft = document.getElementById("mask-left");
    const maskRight = document.getElementById("mask-right");
    const transitionPageInTL = gsap.timeline();
    transitionPageInTL.set(
        mask,
        {
            rotate: 180,
        })
        .set(
            maskBottom,
            {
                bottom: "50%",
            })
        .set(
            maskTop,
            {
                top: "50%",
            })
        .set(
            maskLeft,
            {
                left: "50%",
            })
        .set(
            maskRight,
            {
                right: "50%",
            })
        .to(mask, { rotate: 0, duration: 1 }, 0)
        .to(maskBottom, { bottom: 0, duration: 1 }, 0)
        .to(maskTop, { top: 0, duration: 1 }, 0)
        .to(maskLeft, { left: 0, duration: 1 }, 0)
        .to(maskRight, { right: 0, duration: 1 }, 0)
}

export const transitionPageOut = (href: string, router: AppRouterInstance) => {
    const mask = document.getElementById("mask");
    const maskTop = document.getElementById("mask-top");
    const maskBottom = document.getElementById("mask-bottom");
    const maskLeft = document.getElementById("mask-left");
    const maskRight = document.getElementById("mask-right");
    const transitionPageOutTL = gsap.timeline();
    transitionPageOutTL.set(
        mask,
        {
            y: 0,
        })
        .set(
            maskBottom,
            {
                bottom: 0,
            })
        .set(
            maskTop,
            {
                top: 0,
            })
        .set(
            maskLeft,
            {
                left: 0,
            })
        .set(
            maskRight,
            {
                right: 0,
            })
        .to(mask, { rotate: 180, duration: 1, onComplete: () => { router.push(href) } }, 0)
        .to(maskBottom, { bottom: "50%", duration: 1 }, 0)
        .to(maskTop, { top: "50%", duration: 1 }, 0)
        .to(maskLeft, { left: "50%", duration: 1 }, 0)
        .to(maskRight, { right: "50%", duration: 1 }, 0)

}