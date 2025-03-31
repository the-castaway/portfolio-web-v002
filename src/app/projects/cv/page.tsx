// `app/projects/cv.tsx` is the UI for the `/projects/cv` URL
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

const PROJECT_NUMBER = 3;

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
                                            The Community Voices Hub is a web app showcasing Meta’s Community Voices video series, highlighting how people use Meta’s products to create positive global impact. Designed as a living portfolio, it emphasizes the meaningful ways Meta contributes to the world. The site features an interactive user flow with perspective and depth of field, aligning seamlessly with Meta’s new branding.
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
                                                <i>Perspective, Depth of field, GSAP, Web</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                One of Meta’s key objectives—and by extension, its marketing communications team—is to reinforce its continued relevance and future potential. The Community Voices series has been instrumental in shifting brand sentiment by showcasing the positive impact of Meta’s products on users’ lives. I led the design and engineering of the Community Voices Hub, crafting an experience that integrates perspective and innovation into each module. The site not only highlights individual stories but also provides a platform to amplify their causes and drive meaningful support.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/cv/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
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
                                                    No dedicated hub to showcase Community Voices stories—previously shared only on social media.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    No platform for the community to promote their causes or initiatives.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    High priority on Community Voices as a key initiative to strengthen Meta’s public image.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Limited resources allocated for web development.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Previously produced stories did not account for web assets, requiring adaptation.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Will be integrated into about.meta.com as a flagship initiative.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Reduce bounce rate on about.meta.com overall.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Increase views of Community Voices films.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Drive engagement with community initiatives like charities, FB Donations, and organization discovery.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Existing tech stack lacked tweening capabilities, making perspective animations challenging.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Community Voices previews already existed on about.meta.com as simple looping videos linking to social accounts.
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
                                                Through the use of animations, transitions, and UI design, we crafted a user flow that allows users to sequentially learn more about Community Voices stories. By engaging users with these visual elements, we managed to tell our stories thoroughly and effectively.
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
                                                    <source src="/media/projects/cv/demo.webm" type="video/webm" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/home1.webp"
                                                    alt="CV scene home 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/home2.webp"
                                                    alt="CV scene home 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/home3.webp"
                                                    alt="CV scene home 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/home4.webp"
                                                    alt="CV scene home 4"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/home5.webp"
                                                    alt="CV scene home 5"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    When a user selects a story, the summary thumbnail smoothly transitions into the full summary page, seamlessly revealing additional content and the featured video.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/summary1.webp"
                                                    alt="CV scene summary 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/summary2.webp"
                                                    alt="CV scene summary 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/summary3.webp"
                                                    alt="CV scene summary 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/summary4.webp"
                                                    alt="CV scene summary 4"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/cv/summary5.webp"
                                                    alt="CV scene summary 5"
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
                                                    This project was the first of its kind and served as a proof of concept for launching a site on Meta’s internal React renderer. It also paved the way for implementing the same renderer on Meta’s main communications corporate site, about.meta.com.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    By utilizing animations and interactive transitions, we created a site that achieved excellent bounce rates and engagement rates during testing.
                                                </p>
                                            </div>
                                            <div className={styles.projectResults}>
                                                <div className={styles.projectResultsStats}>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Bounce Rate
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            -60%
                                                        </p>
                                                    </div>
                                                    <div className={styles.projectResultsStat}>
                                                        <p className={`detail textColorDarkGrey`}>
                                                            Learning Engagement
                                                        </p>
                                                        <p className={styles.projectResultsStatNumber}>
                                                            92%
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
                                                <a href={'https://www.linkedin.com/in/patriciageagea/'} className={styles.projectResultsCollab}>
                                                    <p className={`detail textColorGrey`}>
                                                        [ DES ]
                                                    </p>
                                                    <p className={styles.projectResultsCollabName}>
                                                        <b>Patricia Geagea</b>
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
