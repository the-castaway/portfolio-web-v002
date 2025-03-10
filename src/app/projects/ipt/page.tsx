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
import Media from "@/app/components/global/media";
import Section from "@/app/components/projects/section";
import Anchors from "@/app/components/projects/anchors";
import Scene from "@/app/components/global/scene/scene";
import CTA from "@/app/components/projects/cta";
// Context 
import { useScreenSize } from "@/app/context/screenSizeContext";
// Data
import { Projects } from '@/app//projects/projects';
const PROJECT_NUMBER = 0;

export default function Project() {
    // Project
    const project = Projects[PROJECT_NUMBER];
    const isLastProject = project.key === Projects.length - 1;
    const nextProject = isLastProject ? Projects[0] : Projects[project.key + 1];

    // Refs
    const projectAnchored = useRef<HTMLDivElement>(null!);
    const projectStaticDetails = useRef<HTMLDivElement>(null!);
    const projectStaticAnchors = useRef<HTMLDivElement>(null!);
    // Context
    const { isMobile } = useScreenSize();

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
            if (!isMobile) {
                getScrollTL(self);
            }
        })
        return () => {
            ctx.revert();
        }
    }, [isMobile]);

    const projectDetails =
        <div className={styles.projectDetails}>
            <div className={styles.projectStaticDetailsNumber}>
                <p className={`detail`}>
                    <span className={`textColorOffBlack`}>Featured Work</span>
                </p>
                <p className={`detail textColorGrey`}>
                    {project.number} / 006
                </p>
            </div>
            <div className={styles.projectStaticDetailsCompany}>
                <p className={`detail`}>
                    <span className={`textColorOffBlack`}>Company</span>
                </p>
                <p className={`detail textColorGrey`}>
                    {project.company}
                </p>
            </div>
            <div className={styles.projectStaticDetailsInvolvement}>
                <p className={`detail`}>
                    <span className={`textColorOffBlack`}>
                        Involvement
                    </span>
                </p>
                <ul className={`${styles.projectStaticDetailsInvolvementList} textFontHighlight textColorGrey`}>
                    {project.involvement.map((involvement) =>
                        <li key={involvement}><i>{involvement}</i></li>)
                    }
                </ul>
            </div>
        </div>;

    return (
        <div>
            <main className={styles.project}>
                {/* Smooth Scroller */}
                <div id="smooth-wrapper" className={styles.projectScroll}>
                    <div id="smooth-content" className={styles.projectScrollContent}>
                        <div className={styles.projectContent}>
                            {/* Intro */}
                            <section className={styles.projectIntro}>
                                <div className={`${styles.projectIntroContent} grid`}>
                                    <div className={styles.projectIntroTitle}>
                                        <h1>{project.name}</h1>
                                        <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        {isMobile ? <>{projectDetails}</> : null}
                                    </div>

                                </div>
                            </section>
                            <div className={`${styles.projectSection} grid`}>
                                <div className={styles.projectSectionContentNarrow}>
                                    <Media src={project.thumbnail_desktop} aspectRatio={"4:5"} />
                                </div>
                            </div>
                            <section ref={projectAnchored}>
                                <Section id={'Overview'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Parallax, GSAP, Web, Motion</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectPreviewMedia}>
                                                <div className={styles.projectPreviewMediaContainer}>
                                                    <Image src={project.thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Background'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Background</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectPreviewMedia}>
                                                <div className={styles.projectPreviewMediaContainer}>
                                                    <Image src={project.thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Concept'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Concept</i>
                                            </h2>
                                            <p className={`textColorGrey`}>The interactive product tour is designed to be featured on our product pages using canvas elements, leveraging WebGL and Three.js for 3D rendering, and GSAP for animating transitions between states.</p>
                                        </div>
                                        <div className={styles.projectSectionContentWide}>
                                            <div className={styles.projectPreviewMedia}>
                                                <div className={styles.projectPreviewMediaContainer}>
                                                    <Image src={project.thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" priority style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Section>
                                <Section id={'Results'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorGrey`}>
                                                    Results
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    The results of this module were significant. We contributed to the goal of creating more interactive and immersive experiences while also substantially improving key metrics. The average time spent on the page increased by over 30 seconds, the learning engagement metric improved by over 8%, and the add-to-cart rate increased by 1%.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +8%
                                                        </p>

                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +8%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +8%
                                                        </p>

                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +8%
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.projectResultsCollabs}>
                                                <div className={styles.projectSectionText}>
                                                    <p className={`detail textColorGrey`}>
                                                        Collaborators
                                                    </p>
                                                </div>
                                                <a href={'https://www.google.com'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Dan Kupsco</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.google.com'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Dan Kupsco</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.google.com'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Dan Kupsco</b>
                                                    </p>
                                                </a>
                                            </div>

                                        </div>

                                    </div>
                                </Section>
                            </section>
                            {/* CTA */}
                            <CTA nextProjectLink={nextProject.href} nextProjectName={nextProject.name} nextProjectNumber={nextProject.number} />
                        </div>
                    </div>
                </div>
                {/* Scene */}
                <Scene />
                {/* Project Static Text */}
                {isMobile ? null : <section className={`${styles.projectStatic} grid`}>
                    <div className={styles.projectStaticContent}>
                        <div ref={projectStaticDetails} className={styles.projectStaticDetails}>
                            {projectDetails}
                        </div>
                        <div ref={projectStaticAnchors} className={styles.projectStaticAnchors}>
                            <p className={`detail`}>
                                <span className={`textColorOffBlack`}>Project Info</span>
                            </p>
                            <Anchors />
                        </div>
                    </div>
                </section>}
            </main>
        </div>
    );
}
