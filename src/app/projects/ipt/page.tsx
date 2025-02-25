// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "../../styles/pages/project.module.css"
// Components
import Banner from "../../components/projects/banner";
// Data
import { Projects } from '../../projects/projects'


export default function Page() {

    // Initialize GSAP timelines and plugins
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        ScrollSmoother.create({
            content: "#smooth-content",
            wrapper: "#smooth-wrapper",
            smooth: 2,
            effects: true,
        });

    }, []);

    return (
        <div>
            <main className={styles.project}>
                {/* Smooth Scroller */}
                <div id="smooth-wrapper" className={styles.homeScroll}>
                    <div id="smooth-content" className={styles.homeScrollContent}>
                        <Banner media={Projects[0].thumbnail} title={'Interactive Product Tour'} />
                        {/* Intro */}
                        <section className={styles.projectIntro}>
                            <div className={`${styles.projectIntroContent} grid`}>
                                <div className={styles.projectIntroNumber}>
                                    <p className={`detail`}>
                                        <span className={`textColorOffBlack`}>Featured Work</span>
                                    </p>
                                    <p className={`textFontDetail textColorOffWhite`}>
                                        {Projects[0].number} / 006
                                    </p>
                                </div>
                                <div className={styles.projectIntroInvolvement}>
                                    <p className={`detail`}>
                                        <span className={`textColorOffBlack`}>
                                            Involvement
                                        </span>
                                    </p>
                                    <ul className={`${styles.projectIntroInvolvementList} textFontHighlight textColorGrey`}>
                                        {Projects[0].involvement.map((involvement) =>
                                            <li key={involvement}><i>{involvement}</i></li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <div className={styles.spacer} />
                    </div>
                </div>
            </main>
        </div>
    );
}
