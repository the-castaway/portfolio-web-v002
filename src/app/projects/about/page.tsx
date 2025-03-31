// `app/projects/cp.tsx` is the UI for the `/projects/cp` URL
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

const PROJECT_NUMBER = 5;

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
                    {project.number} /00{Projects.length}
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
                                            The About Meta Platform is Meta’s main corporate site, providing information about the company’s initiatives, community, products, and services. It also serves as a hub for critical communications, tailored for users. As Meta’s primary marketing and communications (marcomms) channel, it plays a crucial role in shaping the world’s understanding of the company.
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
                                                <i>SEO, Search, GSAP, Web</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                The About Meta Platform plays a vital role in shaping brand sentiment and how the world perceives Meta. As the company evolved—particularly with its shift toward the metaverse and immersive digital products—the platform transformed alongside it. SEO is a major priority, ensuring we capture and educate as much interested traffic as possible.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                I led all Comms-driven initiatives on the About platform, playing a key role in shaping its design system, libraries, and componentry used across Meta’s main web properties. I also designed and developed immersive experiences, bringing innovation to these initiatives.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/about/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
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
                                                    Create a central hub for users to access key company information.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Top-down initiative to strengthen Meta’s web presence and establish it as a legitimate, authoritative brand.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Enhance company sentiment and build user trust through transparency and accessibility.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    As the main corporate site, it sets the precedent for the style and tech stack used across supporting sites.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Scalable componentry is essential to accommodate and unify supporting sites.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Multiple key content owners span across marketing, comms, policy, and other teams, requiring a flexible and collaborative system.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Empower users to find trust-inspiring information about Meta.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Enable users to explore new products and avenues of innovation.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Increase brand sentiment metrics through transparency and engagement.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Supporting sites need design system and tech stack guidance to maintain consistency.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Desire to migrate and merge corporate sites under the About Meta Platform for streamlined management and unified user experience.
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
                                            <p className={`textColorGrey`}>
                                                Our brand partners invested significant time and effort in defining Meta’s brand, and it was crucial for us to translate that vision to the web. Key elements like perspective, depth, custom gradients, and white space played an essential role in executing the brand styling accurately and creating a cohesive user experience.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home1.webp"
                                                    alt="About scene home 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home2.webp"
                                                    alt="About scene home 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home3.webp"
                                                    alt="About scene home 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home4.webp"
                                                    alt="About scene home 4"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home5.webp"
                                                    alt="About scene home 5"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/about/home6.webp"
                                                    alt="About scene home 6"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
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
                                                    The About Meta Platform has a proven track record of success, reaching millions of users daily and significantly boosting brand awareness. Over the years, it has consistently met and exceeded its goals, serving as a key driver in shaping public perception and engagement with Meta’s initiatives.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            UNAIDED BRAND AWARENESS
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +50%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            AIDED BRAND AWARENESS
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +80%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            19%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Time Spent
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            ~3min
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
                                                        [ TPM ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Dan Kupsco</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.linkedin.com/in/majimmy88/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Jimmy Ma</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.linkedin.com/in/lz422/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Lucy Zhang</b>
                                                    </p>
                                                </a>
                                                <a href={'https://www.linkedin.com/in/ike-ofoegbu/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Ike Ofoegbu</b>
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
