// `app/projects/stp.tsx` is the UI for the `/projects/stp` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "@/app/styles/pages/project.module.css"
// Components
import Media from "@/app/components/global/media";
import Section from "@/app/components/projects/section";
import Anchors from "@/app/components/projects/anchors";
import Scene from "@/app/components/global/scene/scene";
import CTA from "@/app/components/projects/cta";
// Context 
import { useScreenSize } from "@/app/context/screenSizeContext";
// Data
import { Projects } from '@/app//projects/projects';

const PROJECT_NUMBER = 1;

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
                                            Scroll to Play is an interactive module that seamlessly integrates video or image sequences into the scrolling experience. It either plays a series of images frame by frame or buffers a video in sync with the user's scroll, providing an immersive, cinematic effect.
                                        </p>
                                        <p className={`textColorGrey`}>
                                            Built for maximum flexibility, this module empowers Meta developers to insert unlimited content, media (whether videos or image sequences), and control how and when elements appear, animate, and interact. Its adaptable framework ensures a smooth, engaging experience across various use cases.
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
                                                <i>GSAP, Canvas, Motion, Ecoding</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                To push immersive web experiences beyond individual projects, we developed Scroll to Play—a highly scalable module designed to enhance entire platforms and sites. One of the most dynamic modules at Meta, it shares a common backend while delivering vastly different front-end visuals, making it both modular and adaptable.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                Performance was a key focus, ensuring smooth playback by optimizing payload size—limiting image sequences or buffering at lower resolutions for lower-end devices. Built using Canvas for rendering and GSAP for animation, the module allows developers to control how much scrolling is required to cycle through media.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                I designed and built the first version of this module, which quickly gained traction across Meta. With widespread adoption, it has since evolved through contributions from dozens of teams.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/stp/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
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
                                                    Conducted competitive analysis, identifying competitors integrating similar features into their sites.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Achieved breakthroughs in dynamic video scrubbing and image sequence scrubbing, enhancing interactivity and user experience.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    This was plugged into an existing workflow for the “what is the metaverse?” site.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    I had trouble getting the greenlight for this as a stand alone module.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    I knew this module would have a larger impact than the site it was featured in, so scalability was crucial.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Increase time spent on page.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Increase scroll depth.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Don’t break the hosting site.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Make it scalable. So developer experience is also important.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Lower end devices will have a harder time downloading huge payloads like an array of images.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Video scrubbing will also be difficult for devices with low bandwidths.
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
                                                The two main things that were kept in mind for this project was scalability and performance, since this would be used by teams across the company for a variety of use cases.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                We needed to accommodate a few different scenarios. Different methods of implementation (Full-bleed or inline), as well as different screen sizes, different lengths of sequences, dynamic content, while allowing developers to determine at what frame content fades in and out, and scalable hosting of images through the CMS.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                >
                                                    <source src="/media/projects/stp/metaverse.webm" type="video/webm" />
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
                                                    <source src="/media/projects/stp/rbs.webm" type="video/webm" />
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
                                                    <source src="/media/projects/stp/brand.webm" type="video/webm" />
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
                                                    <source src="/media/projects/stp/quest3s.webm" type="video/webm" />
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
                                                    <source src="/media/projects/stp/str.webm" type="video/webm" />
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
                                                    Scroll to Play saw widespread adoption across Meta, with over 70% of platforms integrating it in some capacity. The module significantly boosted key metrics, increasing time spent on page by 8%, learning engagement by 20%, and add-to-cart rates (where applicable) by 6%.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Adoption
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            ~70%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Time Spent
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +8%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Learning Engagement
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +20%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Add to Cart
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            +6%
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
                                                <a href={'https://www.linkedin.com/in/majimmy88/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ ENG ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Jimmy Ma</b>
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
