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
import HomeScene from "./components/scene/homeScene";
//import Brackets from "./components/scene/brackets";
import Featured from "./components/home/featured";
// Context 
import { useScreenSize } from "./context/screenSizeContext";


export default function Home() {
  // Refs
  const banner = useRef<HTMLDivElement>(null!);
  const bannerModel = useRef<HTMLCanvasElement>(null!);
  const bannerUIDetails = useRef<HTMLDivElement>(null!);
  const bannerTopLeftText = useRef<HTMLDivElement>(null!);
  const bannerTopRightText = useRef<HTMLDivElement>(null!);
  const bannerBottomRightText = useRef<HTMLDivElement>(null!);
  const bannerBottomLeftText = useRef<HTMLDivElement>(null!);
  const trigger = useRef<HTMLDivElement>(null!);
  // Context
  const { isMobile } = useScreenSize();

  // Banner intro timeline
  const getBannerIntroTL = () => {
    const bannerIntroTL = gsap.timeline();
    const bannerUIDetailsHeight = isMobile ? "50%" : "25%";
    const bannerUIDetailsWidth = isMobile ? "85%" : "calc(66vw - 100px)";
    bannerIntroTL
      .to(bannerUIDetails.current,
        {
          width: bannerUIDetailsWidth,
          height: bannerUIDetailsHeight,
          duration: 0.5,
          delay: 0.5,
          ease: 'ease'
        }, 0)
      .to([bannerTopLeftText.current, bannerTopRightText.current, bannerBottomRightText.current, bannerBottomLeftText.current],
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
        }, 0)
      .from(bannerModel.current,
        {
          opacity: 0,
          delay: 0.5,
        }, 0)
    return bannerIntroTL;
  }

  // Scroll timeline
  const getScrollTL = () => {
    console.log(isMobile)
    const bannerUIDetailsHeight = isMobile ? "55%" : "20%";
    const bannerUIDetailsWidth = isMobile ? "90%" : "50%";
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: trigger.current,
        pin: false,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        markers: false,
      }
    });
    scrollTL.to(bannerUIDetails.current, {
      width: bannerUIDetailsWidth,
      height: bannerUIDetailsHeight,
      opacity: 0,
      duration: 0.5,
    }, 0)
    scrollTL.to(banner.current,
      {
        opacity: 0,
        duration: 0.5,
      }, 1)
    return scrollTL;
  }

  // Initialize timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const ctx = gsap.context(() => {
      getBannerIntroTL();
      getScrollTL();
    })
    ScrollSmoother.create({
      content: "#smooth-content",
      wrapper: "#smooth-wrapper",
      smooth: 1,
      effects: true
    })
    return () => {
      ctx.revert();
    }
  }, [isMobile])

  return (
    <div>
      <main className={styles.home}>
        {/* Banner */}
        <section ref={banner} className={styles.homeBanner}>
          <Canvas ref={bannerModel} className={styles.homeBannerModel} gl={{ antialias: false }} dpr={[1, 1.5]}>
            <HomeScene />
          </Canvas>
          <div className={styles.homeBannerUI}>
            <div ref={bannerUIDetails} className={styles.homeBannerUIDetails}>
              <div className={styles.homeBannerUIDetailsTopLeft}>
                <div className={styles.homeBannerUIDetailsTopLeftCorner} />
                <p ref={bannerTopLeftText} className={`${styles.homeBannerUIDetailsTopLeftText} detail textColorGrey`}>
                  <span className={`textColorBlue`}>
                    Jaime Castaneda
                  </span>
                </p>
              </div>
              <div className={styles.homeBannerUIDetailsTopRight}>
                <p ref={bannerTopRightText} className={`${styles.homeBannerUIDetailsTopRightText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    @the_casta_way
                  </span>
                </p>
                <div className={styles.homeBannerUIDetailsTopRightCorner} />
              </div>
              <div className={styles.homeBannerUIDetailsBottomRight}>
                <p ref={bannerBottomRightText} className={`${styles.homeBannerUIDetailsBottomRightText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    ©2025 V.002
                  </span>
                </p>
                <div className={styles.homeBannerUIDetailsBottomRightCorner} />
              </div>
              <div className={styles.homeBannerUIDetailsBottomLeft}>
                <div className={styles.homeBannerUIDetailsBottomLeftCorner} />
                <p ref={bannerBottomLeftText} className={`${styles.homeBannerUIDetailsBottomLeftText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    2025 Folio
                  </span>
                </p>
              </div>
            </div>
          </div>

        </section>
        <div id="smooth-wrapper" className={styles.homeScroll}>
          <div id="smooth-content">
            <section className={styles.homeBannerSpacer}></section>
            {/* Intro */}
            <section ref={trigger} id="trigger" className={styles.homeIntro}>
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
        </div >
      </main >
    </div >
  );
}
