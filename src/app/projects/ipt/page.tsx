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
                                        <p className={`textColorGrey`}>
                                            The Interactive Product Tour is a scalable, 3D module that brings hardware products to life. Users can rotate, zoom, and explore key features through interactive hotspots that reveal detailed information. When a hotspot is clicked, the model dynamically animates—rotating, moving, and zooming into the area of interest.
                                        </p>
                                        <p className={`textColorGrey`}>
                                            Designed for flexibility, this module enables Meta to seamlessly integrate any hardware product while supporting unlimited hotspots and diverse media types. It has become the standard for all future product pages at Meta.
                                        </p>
                                        {isMobile ? <>{projectDetails}</> : null}
                                    </div>

                                </div>
                            </section>
                            <div className={`${styles.projectSection} grid`}>
                                <div className={styles.projectSectionContentNarrow}>
                                    <Media src={project.thumbnail_desktop} aspectRatio={"4:5"} isPriority={true} />
                                </div>
                            </div>
                            <section ref={projectAnchored}>
                                <Section id={'Overview'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>ThreeJS, GSAP, Web, Motion</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                As Meta embraced the metaverse and prioritized immersive technologies, its corporate site needed to reflect this shift. To enhance learning engagement, improve add-to-cart metrics, and bring immersive experiences to the web, we developed a suite of interactive modules. The Interactive Product Tour was the first 3D experience in Meta’s corporate stack, setting the foundation for future modules with scalable code, reusable libraries, and comprehensive documentation.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/ipt/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Considerations'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Things to keep in mind</i>
                                            </h2>
                                        </div>
                                        <div className={styles.projectSectionContentColumnLeft}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Reasoning
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Top-down desire for immersive experiences on web surfaces. This is in an effort to closer align goals to company initiatives which revolved around the metaverse and digital immersion,
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Bottom-up desire to grow and implement WebGL codebase. I needed a good excuse to greenlight a ThreeJS proof of concept.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Limited resourcing.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Tight deadline.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Short testing window.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Limited access to product teams.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Inability to import large packages to existing web app,
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Successfully implement Three JS experience without causing regression across the web app. Don’t break anything.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Replace existing carousel module and improve on it’s learning engagement metrics.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Sell headsets…. Increase Add to Cart metric. Profit.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    PRO: Companies like IKEA and Wayfair boosted sales by 35% and 20%, respectively, after integrating 3D experiences into their e-commerce platforms.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    PRO: 3D previews has been linked to a 40% increase in customer satisfaction.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    CON: Every second of delay in loading time can reduce conversions by up to 7% and increase bounce rates by 32%.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Concept'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Let’s conceptualize</i>
                                            </h2>
                                            <p className={`textColorGrey`}>Throughout the design process, we worked closely with engineering, product, legal, and marcomms to ensure our solutions aligned with technical, business, and brand requirements. We designed a solution that lets users select the hardware they want to explore, accommodating a wide range of use cases.</p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/overview1.webp"
                                                    alt="IPT scene overview 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/overview2.webp"
                                                    alt="IPT scene overview 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/overview3.webp"
                                                    alt="IPT scene overview 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    Our flexible hotspot framework enables precise placement of interactive hotspots on any piece of hardware, seamlessly integrating additional content that appears upon selection. This allows for an intuitive and immersive user experience, enhancing product exploration and engagement.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot1.webp"
                                                    alt="IPT scene hotspot 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot2.webp"
                                                    alt="IPT scene hotspot 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot3.webp"
                                                    alt="IPT scene hotspot 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot4.webp"
                                                    alt="IPT scene hotspot 4"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot5.webp"
                                                    alt="IPT scene hotspot 5"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/ipt/hotspot6.webp"
                                                    alt="IPT scene hotspot 6"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                >
                                                    <source src="/media/projects/ipt/demo.webm" type="video/webm" />
                                                    Your browser does not support the video tag.
                                                </video>
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
                                                    The results of this module were significant. We contributed to the goal of creating more interactive and immersive experiences while also substantially improving key metrics. The average time spent on the page increased by over 30%, the learning engagement metric improved by over 40%, and the add-to-cart rate increased by 3%.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Time Spent
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +30%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Learning Engagement
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +40%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Add to Cart
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +3%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            -8%
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
                                                <a href={'https://www.linkedin.com/in/kupsco/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ PM ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Dan Kupsco</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.linkedin.com/in/eugeneteu/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Eugene Teu</b>
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
                {
                    isMobile ? null : <section className={`${styles.projectStatic} grid`}>
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
                    </section>
                }
            </main >
        </div >
    );
}
