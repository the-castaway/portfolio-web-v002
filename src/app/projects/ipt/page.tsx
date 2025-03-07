// `app/projects/ipt.tsx` is the UI for the `/projects/ipt` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "@/app/styles/pages/project.module.css"
// Components
import Image from "next/image";
import Section from "@/app/components/projects/section";
import Anchors from "@/app/components/projects/anchors";
import CTA from "@/app/components/projects/cta";
// Data
import { Projects } from '@/app/projects/projects'

export default function Project() {
    // Refs
    const projectAnchored = useRef<HTMLDivElement>(null!);
    const projectStaticDetails = useRef<HTMLDivElement>(null!);
    const projectStaticAnchors = useRef<HTMLDivElement>(null!);

    const getScrollTL = (ctx: gsap.Context) => {
        ctx.add(() => {
            const anchorIntroTL = gsap.timeline({ paused: true })
                .to(projectStaticDetails.current, {
                    y: -10,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'ease',
                }, 0).to(projectStaticAnchors.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.2,
                    ease: `ease`,
                }, ">")

            const anchorOutroTL = gsap.timeline({ paused: true })
                .to(projectStaticAnchors.current, {
                    y: -10,
                    opacity: 0,
                    duration: 0.2,
                    ease: `ease`,
                }, 0)

            gsap.timeline({
                scrollTrigger: {
                    trigger: projectAnchored.current,
                    pin: false,
                    start: `top center`,
                    end: `bottom center`,
                    scrub: false,
                    markers: false,
                    invalidateOnRefresh: true,
                    onEnter: () => anchorIntroTL.play(),
                    onEnterBack: () => anchorOutroTL.reverse(),
                    onLeave: () => anchorOutroTL.play(),
                    onLeaveBack: () => anchorIntroTL.reverse(),
                },
            })
        })
    }

    // Initialize GSAP timelines and plugins
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        ScrollSmoother.create({
            content: "#smooth-content",
            wrapper: "#smooth-wrapper",
            smooth: 1,
            effects: true,
        });

        const ctx = gsap.context((self) => {
            getScrollTL(self);
        })
        return () => {
            ctx.revert();
        }
    }, []);

    return (
        <div>
            <main className={styles.project}>
                {/* Smooth Scroller */}
                <div id="smooth-wrapper" className={styles.projectScroll}>
                    <div id="smooth-content" className={styles.projectScrollContent}>
                        <div className={styles.projectContent}>
                            {/* <Banner media={Projects[0].thumbnail_desktop} title={'Interactive Product Tour'} /> */}
                            {/* Intro */}
                            <section className={styles.projectIntro}>
                                <div className={`${styles.projectIntroContent} grid`}>
                                    <div className={styles.projectIntroTitle}>
                                        <h1>{Projects[0].name}</h1>
                                        <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                    </div>
                                </div>
                            </section>
                            <section className={styles.projectPreview}>
                                <div className={`${styles.projectPreviewContent} grid`}>
                                    <div className={styles.projectPreviewMedia}>
                                        {/* <div className={styles.projectPreviewMediaOverlay} /> */}
                                        <div className={styles.projectPreviewMediaContainer}>
                                            <Image src={Projects[0].thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section ref={projectAnchored}>
                                <Section id={'Overview'}>
                                    <div className={`${styles.projectOverviewContent} grid`}>
                                        <div className={styles.projectPreviewText}>
                                            <h2 className={`highlight`}>
                                                <i>Parallax, GSAP, Web, Motion</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectPreviewMedia}>

                                            <div className={styles.projectPreviewMediaContainer}>
                                                <Image src={Projects[0].thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Background'}>
                                    <div className={`${styles.projectOverviewContent} grid`}>
                                        <div className={styles.projectPreviewText}>
                                            <h2 className={`highlight`}>
                                                <i>Background</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectPreviewMedia}>

                                            <div className={styles.projectPreviewMediaContainer}>
                                                <Image src={Projects[0].thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Concept'}>
                                    <div className={`${styles.projectOverviewContent} grid`}>
                                        <div className={styles.projectPreviewText}>
                                            <h2 className={`highlight`}>
                                                <i>Concept</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectPreviewMedia}>

                                            <div className={styles.projectPreviewMediaContainer}>
                                                <Image src={Projects[0].thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Results'}>
                                    <div className={`${styles.projectOverviewContent} grid`}>
                                        <div className={styles.projectPreviewText}>
                                            <h2 className={`highlight`}>
                                                <i>Results</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectPreviewMedia}>

                                            <div className={styles.projectPreviewMediaContainer}>
                                                <Image src={Projects[0].thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                            </section>
                            {/* CTA */}
                            <CTA id={""} children={undefined} />
                        </div>
                    </div>
                </div>
                {/* Project Static Text */}
                <section className={`${styles.projectStatic} grid`}>
                    <div className={styles.projectStaticContent}>
                        <div ref={projectStaticDetails} className={styles.projectStaticDetails}>
                            <div className={styles.projectStaticDetailsNumber}>
                                <p className={`detail`}>
                                    <span className={`textColorOffBlack`}>Featured Work</span>
                                </p>
                                <p className={`detail textColorGrey`}>
                                    {Projects[0].number} / 006
                                </p>
                            </div>
                            <div className={styles.projectStaticDetailsCompany}>
                                <p className={`detail`}>
                                    <span className={`textColorOffBlack`}>Company</span>
                                </p>
                                <p className={`detail textColorGrey`}>
                                    {Projects[0].company}
                                </p>
                            </div>
                            <div className={styles.projectStaticDetailsInvolvement}>
                                <p className={`detail`}>
                                    <span className={`textColorOffBlack`}>
                                        Involvement
                                    </span>
                                </p>
                                <ul className={`${styles.projectStaticDetailsInvolvementList} textFontHighlight textColorGrey`}>
                                    {Projects[0].involvement.map((involvement) =>
                                        <li key={involvement}><i>{involvement}</i></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div ref={projectStaticAnchors} className={styles.projectStaticAnchors}>
                            <p className={`detail`}>
                                <span className={`textColorOffBlack`}>Project Info</span>
                            </p>
                            <Anchors />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
