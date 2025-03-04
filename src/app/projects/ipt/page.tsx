// `app/projects/ipt.tsx` is the UI for the `/projects/ipt` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "../../styles/pages/project.module.css"
// Components
import Banner from "../../components/projects/banner";
import Image from "next/image";
import Section from "../../components/projects/section";
import Anchors from "../../components/projects/anchors";
// Data
import { Projects } from '../../projects/projects'

export default function Project() {
    // Refs
    const projectStaticDetails = useRef<HTMLDivElement>(null!);
    const projectStaticAnchors = useRef<HTMLDivElement>(null!);

    const getScrollTL = () => {
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                pin: false,
                start: innerHeight / 2,
                end: () => innerHeight / 2,
                scrub: false,
                markers: false,
                toggleActions: "play none reverse none",
            },
        }).to(projectStaticDetails.current, {
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
    }

    // Initialize GSAP timelines and plugins
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        ScrollSmoother.create({
            content: "#smooth-content",
            wrapper: "#smooth-wrapper",
            smooth: 2,
            effects: true,
        });

        const ctx = gsap.context(() => {
            getScrollTL();
        })
        return () => {
            ctx.revert();
        }

    }, []);

    return (
        <div>
            <main className={styles.project}>
                {/* Smooth Scroller */}
                <div id="smooth-wrapper" className={styles.homeScroll}>
                    <div id="smooth-content" className={styles.homeScrollContent}>
                        {/* <Banner media={Projects[0].thumbnail_desktop} title={'Interactive Product Tour'} /> */}
                        {/* Intro */}
                        <section className={styles.projectIntro}>
                            <div className={`${styles.projectIntroContent} grid`}>
                                <div className={styles.projectIntroTitle}>
                                    <h1>Interactive Product Tour</h1>
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
                        <section id={"AnchorLinked"}>

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
                            <Section id={'Concept'}>
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
                            <Section id={'Results'}>
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
                            {/* <div id={'Overview'} className={styles.projectOverview}>
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
                            </div>
                            <div id={'Background'} className={styles.projectOverview}>
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
                            </div>
                            <div id={'Concept'} className={styles.projectOverview}>
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
                            </div>
                            <div id={'Results'} className={styles.projectOverview}>
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
                            </div> */}
                        </section>

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
                            <Anchors />
                            {/* <div className={styles.projectStaticAnchor}>
                                <a href={"#Overview"} className={`detail`}>
                                    <span className={`textColorOffWhite`}>Overview</span>
                                </a>
                            </div>
                            <div className={styles.projectStaticAnchor}>
                                <a href={"#Background"} className={`detail`}>
                                    <span className={`textColorDarkGrey`}>Background</span>
                                </a>
                            </div>
                            <div className={styles.projectStaticAnchor}>
                                <a href={"#Concept"} className={`detail`}>
                                    <span className={`textColorDarkGrey`}>Concept</span>
                                </a>
                            </div>
                            <div className={styles.projectStaticAnchor}>
                                <a href={"#Results"} className={`detail`}>
                                    <span className={`textColorDarkGrey`}>Results</span>
                                </a>
                            </div>
                            <div className={styles.projectStaticAnchor}>
                                <a className={`detail`}>
                                    <span className={`textColorDarkGrey`}>Back to work</span>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
