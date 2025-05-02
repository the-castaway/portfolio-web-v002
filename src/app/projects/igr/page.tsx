// `app/projects/cp.tsx` is the UI for the `/projects/cp` URL
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
                                            Instagram Recap is an annual, personalized experience that highlights creators’ key metrics and engagement trends from the past year. Powered by Meta AI, it guides users through their top-performing content, most engaged followers, and favorite interactions. The experience surfaces insights like the number of Reels and Stories created, suggests AI-driven content prompts, and helps creators better understand and optimize their content strategy moving forward.
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
                                                <i>Prototype, Motion, UX Design</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                As Meta deepens the integration of Meta AI across its apps, the Instagram Recap was designed to showcase its value in a creator-first, engaging format. More than just a retrospective, the Recap experience provides content creators with actionable insights—like top-performing Reels and Stories, key audience engagement stats, and personalized highlights from their year.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                Built with a subtle marketing angle, Recap also encourages social sharing of key stats, helping creators celebrate their impact with followers. AI-generated content prompts lower the barrier to entry for creators who are new to using AI, guiding them to experiment and improve their content strategy.
                                            </p>
                                            <p className={`textColorGrey`}>
                                                I led UI/UX design and prototyping for this project, collaborating closely with the MARCOMS team—a long-standing vision finally brought to life. It was both a creative challenge and a passion project that combined storytelling, product design, and the power of AI.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <Media src={"/media/projects/igr/overview.webp"} aspectRatio={"4:5"} isPriority={true} />
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
                                                    MARCOMS wanted to integrate messaging into the FoA experience more gracefully. Their perspective: “We already have eyes on the product — why cannibalize that attention?”
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    There was low adoption of Meta AI among creators for content workflows. Our goal was to explore whether increased visibility and seamless integration could drive broader usage and spark creative experimentation.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    THE DYNAMICS
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Difficulty scheduling consistent engineering sprints for sustained support.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Creator content cadence varies significantly, requiring flexible system design.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Needed prompts that are both useful for creators and engaging for broader audiences.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentColumnRight}>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Goals
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Coverage of Meta AI supporting creators within/ and outside of app experiences
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Increase shares in the last weeks of Q4 without causing regression.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Experience completion rate of 50%.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    +20% increase in prompt/tool usage from baseline in the Meta AI Studio tool.
                                                </p>
                                            </div>
                                            <div className={styles.projectSectionText}>
                                                <h2 className={`detail textColorOffWhite`}>
                                                    The Context
                                                </h2>
                                                <p className={`textColorGrey`}>
                                                    Wrapped-style year-in-review experiences—popularized by platforms like Spotify—set high expectations for shareable, personalized recaps.
                                                </p>
                                                <p className={`textColorGrey`}>
                                                    Content creation rates vary widely across users, so the experience was designed to accommodate both highly active and infrequent creators with tailored insights.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                                <Section id={'Concept'}>
                                    <div className={`${styles.projectSection} grid`}>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <h2 className={`highlight`}>
                                                <i>Let's conceptualize</i>
                                            </h2>
                                            <p className={`textColorGrey`}>
                                                For users who meet a minimum content creation threshold, the Recap launches with a full-screen takeover following the initial splash screen. Designed to temporarily divert users from their typical in-app flow, the experience highlights key metrics such as the number of Reels created and showcases their most popular content. This approach offers a moment of reflection and celebration, reinforcing the creator's impact over the past year.
                                            </p>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/igr/recap1.webp"
                                                    alt="IGR 1"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "4 / 5" }}>
                                                <Image
                                                    src="/media/projects/igr/recap2.webp"
                                                    alt="IGR 2"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "4 / 5" }}>
                                                <Image
                                                    src="/media/projects/igr/recap3.webp"
                                                    alt="IGR 3"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/igr/recap4.webp"
                                                    alt="IGR 4"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    For users with lower levels of content creation, the experience begins at a later stage, focusing instead on community engagement—such as which users interacted with them most and how often they engaged with their favorite accounts. The experience concludes with personalized AI-generated prompts, designed to encourage exploration of Meta AI and Meta AI Studio, helping users get started with AI-driven content creation tools.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "4 / 5" }}>
                                                <Image
                                                    src="/media/projects/igr/recap5.webp"
                                                    alt="IGR 5"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "4 / 5" }}>
                                                <Image
                                                    src="/media/projects/igr/recap6.webp"
                                                    alt="IGR 6"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/igr/recap7.webp"
                                                    alt="IGR 7"
                                                    fill
                                                    sizes="100%"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectSectionText}>
                                                <p className={`textColorGrey`}>
                                                    Users can access the experience through inline gateways within the app. Those with the lowest levels of content creation and engagement are funneled to these optional entry points, rather than being taken directly into the Recap experience. These gateways provide a more passive and context-aware introduction, ensuring the experience remains relevant without disrupting typical usage. Inline access also allows all users to revisit the experience at any time.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectSectionContentNarrow}>
                                            <div className={styles.projectMedia} style={{ aspectRatio: "16 / 9" }}>
                                                <Image
                                                    src="/media/projects/igr/flow.webp"
                                                    alt="IGR Flow"
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
                                                    Although not yet launched, this project marks a significant first for the MARCOMS team by pioneering a native approach to messaging within Meta’s ecosystem. Rather than relying solely on external social platforms, this initiative integrates messaging directly into the family of apps. This innovative strategy not only elevates user engagement but also reinforces Meta AI’s value by delivering campaign narratives in a more authentic and seamless manner.
                                                </p>
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
