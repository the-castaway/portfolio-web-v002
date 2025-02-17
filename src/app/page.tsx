// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "./styles/home.module.css"
// Components
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene/scene";
//import Brackets from "./components/scene/brackets";
import Banner from "./components/home/banner";
import Featured from "./components/home/featured";
// Context 
import { useScreenSize } from "./context/screenSizeContext";


export default function Home() {
  // Refs

  // Context
  const { isMobile } = useScreenSize();

  // Initialize timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
      content: "#smooth-content",
      wrapper: "#smooth-wrapper",
      smooth: 1,
      effects: true
    })
  }, [isMobile])

  return (
    <div>
      <main className={styles.home}>
        {/* Banner */}
        <Banner />
        {/* Canvas Scene */}
        <Scene />

        <div id="smooth-wrapper" className={styles.homeScroll}>
          <div id="smooth-content" className={styles.homeScrollContent}>
            <section className={styles.homeBannerSpacer}></section>
            <div className={styles.homeContent}>
              {/* Intro */}
              <section className={styles.homeIntro}>
                <div className={`${styles.homeIntroDetails} grid`}>
                  <div className={styles.homeIntroDetail}>
                    <p className={`${styles.homeIntroDetailHeader} detail`}>
                      <span className={`textColorOffBlack`}>
                        FOLIO FEATURES
                      </span>
                    </p>
                    <p className={`${styles.homeIntroDetailText} textFontDetail`}>
                      006
                    </p>
                  </div>
                </div>
                <div className={`${styles.homeIntroHeader} grid`}>
                  <div className={styles.homeIntroHeaderText}>
                    <h1>
                      I lead, direct, and create award winning product experiences.
                    </h1>
                  </div>
                </div>
                <div className={`${styles.homeIntroDetails} grid`}>
                  <div className={styles.homeIntroDetail}>
                    <p className={`${styles.homeIntroDetailHeader} detail`}>
                      <span className={`textColorOffBlack`}>
                        PURVIEW
                      </span>
                    </p>
                    <ul className={`${styles.homeIntroList} textFontHighlight textColorGrey`}>
                      <li>
                        <i>Product Design</i>
                      </li>
                      <li>
                        <i>Creative Direction</i>
                      </li>
                      <li>
                        <i>UI/UX Design</i>
                      </li>
                      <li>
                        <i>Front-end Eng</i>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <Featured />
              </section>

            </div>
          </div>
        </div >
      </main >
    </div >
  );
}
