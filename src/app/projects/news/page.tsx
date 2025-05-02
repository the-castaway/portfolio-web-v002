// `app/projects/news.tsx` is the UI for the `/projects/news` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
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
        gsap.registerPlugin(ScrollSmoother);
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
                                            The Meta News Hub is a centralized platform for all news and blog channels owned by Meta. It features intuitive search and filtering to help users easily find stories of interest. Serving as a conglomerate site, it unites the efforts of multiple content owners under one roof. Powered by Meta AI, the hub offers dynamic content, personalized recommendations, and has plans to automatically generate content for users in the future, as outlined in its roadmap.
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
                                                <i>AI, Search, GSAP, Web,</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                Meta, like many large companies, faces unique challenges. Effective logistics and communication are crucial, yet issues can still arise. Sometimes, different teams end up working in isolation, which can lead to inefficiencies. Currently, Meta's web operations are experiencing this problem, with numerous web entities managed by separate teams that do not communicate effectively. The Meta News Hub was created to address this issue.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                The Meta News Hub is a centralized platform for all company-related information. It includes sub-hubs for various areas of interest, such as Reality Labs, Family of Apps, and Policies. Featuring its own navigation and search functionality, it makes finding stories easier than ever in Meta’s history.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/news/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
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
                                                    Disjointed approach to building blogs and news channels proved inefficient.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Bottom-up drive to transform about.meta.com into an innovation and impact hub.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Multiple existing blogs and news channels, owned by different teams, each with distinct goals and preferences.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    A significant amount of existing content across various platforms, some built on incompatible tech stacks, needing consolidation and rework.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Empower partners to build and publish content using our robust component libraries.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Develop a scalable framework that allows teams to onboard easily in the future, even if they can’t immediately join.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    28 different blogs exist across the company, each with its own distinct focus.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Each blog is paired with accompanying marketing content, contributing to a fragmented approach.
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
                                                Scalability and navigation were key priorities, requiring robust componentry and complex frameworks to achieve both. We structured the News platform as a conglomerate of hubs, each representing different company pillars (e.g., Reality Labs, Family of Apps, Policies, etc.). This allowed content owners to update their respective hubs independently, ensuring that each hub could operate separately. The design also made future adoption easier, enabling teams to onboard as needed without disrupting the system.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "556 / 2753" }}>
                                                <Image
                                                    src="/media/projects/news/home1.webp"
                                                    alt="News scene home 1"
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
                                                    <source src="/media/projects/news/home.webm" type="video/webm" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                >
                                                    <source src="/media/projects/news/nav.webm" type="video/webm" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    Hubs enable teams across Meta to integrate seamlessly into the blog infrastructure while maintaining unified navigation. They also enhance the user experience by allowing end users to sort and explore content efficiently through categorized hubs.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "556 / 1989" }}>
                                                <Image
                                                    src="/media/projects/news/hub.webp"
                                                    alt="News scene hub"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    The news posts are fully scalable and dynamic, supporting any component or module developed for Meta’s About Platform, ensuring consistency and flexibility across the ecosystem.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "556 / 2576" }}>
                                                <Image
                                                    src="/media/projects/news/post.webp"
                                                    alt="News scene post"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    The Archive or All News section enables users to easily locate specific stories, regardless of their publication date, ensuring seamless access to past content.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "556 / 1240" }}>
                                                <Image
                                                    src="/media/projects/news/archive.webp"
                                                    alt="News scene archive"
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
                                                    <source src="/media/projects/news/archive.webm" type="video/webm" />
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
                                                    While the Meta News Hub project has not yet launched, initiating this project has guaranteed benefits. Significant efficiencies have been realized through the consolidation of 28 blogs and numerous supporting toolkits. By streamlining these web entities, the project has started to improve operational efficiency right from the beginning.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Consolidated Blogs
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            28
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Deprecated Toolkits
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            24
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
