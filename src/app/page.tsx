// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "./styles/pages/home.module.css"
// Components
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene/scene";
import Banner from "./components/home/banner";
// Context 
import { useScreenSize } from "./context/screenSizeContext";


export default function Home() {
  // Refs
  const homeFeaturedStatic = useRef<HTMLDivElement>(null!)
  const homeFeaturedPreviewsList = useRef<HTMLDivElement>(null!)



  // Scroll timeline
  const getFeaturedIntroTL = () => {
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: homeFeaturedPreviewsList.current,
        pin: false,
        start: `top bottom`,
        end: `bottom top`,
        scrub: false,
        markers: true,
        toggleActions: 'play reverse play reverse'
      }
    });

    scrollTL.to(homeFeaturedStatic.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'ease',
    }, 0)

    return scrollTL;
  }

  // Initialize timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
      content: "#smooth-content",
      wrapper: "#smooth-wrapper",
      smooth: 1,
      effects: true
    })


    const ctx = gsap.context(() => {
      //getIntroTL();
      getFeaturedIntroTL();
    })
    return () => {
      ctx.revert();
    }
  }, [])

  return (
    <div>
      <main className={styles.home}>
        {/* Banner */}
        <Banner />
        {/* Canvas Scene */}
        <Scene />
        {/* Smooth Scroller */}
        <div id="smooth-wrapper" className={styles.homeScroll}>
          <div id="smooth-content" className={styles.homeScrollContent}>
            {/* Spacer for Banner */}
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
              {/* Featured */}
              <section className={styles.homeFeatured}>
                <div className={`${styles.homeFeaturedPreviews} grid`}>
                  <div ref={homeFeaturedPreviewsList} className={styles.homeFeaturedPreviewsList}>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/ipt_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/news_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/stp_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/cv_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/metaverse_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                    <div className={styles.homeFeaturedPreviewMedia}>
                      <Image src={'/media/thumbnails/mtia_thumbnail.webp'} alt="thumbnail" fill={true} />
                    </div>
                  </div>
                </div>
              </section>
              {/* Featured */}
              <section className={styles.homeCTA}>
                <div className={`${styles.homeCTAContent} grid`}>
                  <div className={styles.homeCTAHeader}>
                    <p className={`highlight`}>
                      <span className={`${styles.homeCTAHeaderText} textColorOffWhite`}><i>DROP A LINE_</i></span>
                    </p>
                  </div>
                  <div className={styles.homeCTATitle}>
                    <p className={`detail`}>
                      <span className={`textColorGrey`}>Design and Engineering Lead for Web @Meta</span>
                    </p>
                  </div>
                  <div className={styles.homeCTALocale}>
                    <p className={`detail`}>
                      <span className={`textColorGrey`}>Bay Area California</span>
                    </p>
                  </div>
                  <div className={styles.homeCTASocials}>
                    <p className={`detail`}>
                      <span className={`textColorGrey`}>X / IG / LI</span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div >
        {/* Featured Static Text */}
        <div ref={homeFeaturedStatic} className={styles.homeFeaturedStatic}>
          <div className={`${styles.homeFeaturedStaticContainer} grid`}>
            <div className={styles.homeFeaturedNumber}>
              <p className={`detail`}>
                <span className={`textColorOffBlack`}>Featured Works</span>
              </p>
              <p className={`detail`}>
                <span className={`textColorOffWhite`}>001 / 006</span>
              </p>
            </div>
            <div className={styles.homeFeaturedTitle}>
              <h1>
                Meta News Platform
              </h1>
            </div>
            <div className={styles.homeFeaturedCompany}>
              <p className={`detail`}>
                <span className={`textColorOffBlack`}>Company</span>
              </p>
              <p className={`detail`}>
                <span className={`textColorGrey`}>Meta Platforms</span>
              </p>
            </div>
            <div className={styles.homeFeaturedInvolvement}>
              <p className={`detail`}>
                <span className={`textColorOffBlack`}>
                  Involvement
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
              </ul>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
}
