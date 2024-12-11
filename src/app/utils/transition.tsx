import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const transitionPageIn = () => {
    const mask = document.getElementById("mask")
    const transitionPageInTL = gsap.timeline();
    transitionPageInTL.set(
        mask,
        {
            y: 0,
        })
        .to(
            mask,
            {
                y: 100,
                duration: 2
            })
}

export const transitionPageOut = (href: string, router: AppRouterInstance) => {
    const mask = document.getElementById("mask")
    const transitionPageOutTL = gsap.timeline();
    transitionPageOutTL.set(
        mask,
        {
            y: 100,
        })
        .to(
            mask,
            {
                y: 0,
                duration: 2,
                onComplete: () => { router.push(href) }
            })

}