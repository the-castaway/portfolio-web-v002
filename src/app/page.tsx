// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef, useMemo } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// Styles
import styles from "@/app/styles/pages/home.module.css"
// Components
import Image from "next/image";
import Scene from "@/app/components/home/scene/scene";
import Banner from "@/app/components/home/banner";
import Link from "@/app/components/global/link";
import Button from "@/app/components/global/button";
// Context 
import { useScreenSize } from "@/app/context/screenSizeContext";
// Data
import { Projects } from '@/app//projects/projects';

export default function Home() {
  // Refs
  const homeFeaturedStatic = useRef<HTMLDivElement>(null!)
  const homeFeaturedPreviewsList = useRef<HTMLDivElement>(null!)
  //variables
  const projects = useMemo(() => Projects.slice(0, 6), []);
  // Context
  const { isMobile } = useScreenSize();

  const getUIIntroTL = () => {
    const nav = document.getElementById(`nav`);
    const footer = document.getElementById(`footer`);
    const UIIntroTL = gsap.timeline();
    UIIntroTL.from([nav, footer], {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'ease'
    }, 0)

    return UIIntroTL;
  }

  // Featured intro / outro timeline
  const getFeaturedIntroTL = (ctx: gsap.Context) => {
    ctx.add(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: homeFeaturedPreviewsList.current,
          pin: false,
          start: `top bottom`,
          end: `bottom top`,
          scrub: false,
          markers: false,
          toggleActions: "play reverse play reverse",
        },
      }).to(
        homeFeaturedStatic.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "ease",
        },
        0
      );
    });
  };

  // Featured work timeline
  const getFeaturedTimelines = (ctx: gsap.Context) => {
    const previews = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedPreviewMedia}`
    );
    const medias = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedPreviewMediaContainer}`
    );
    const titles = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedTitle}`
    );
    const involvements = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedInvolvementList}`
    );
    const companyNames = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedCompanyName}`
    );
    const activeNumbers = gsap.utils.toArray<HTMLElement>(
      `.${styles.homeFeaturedActiveNumber}`
    );
    previews.forEach((preview, index) => {
      ctx.add(() => {
        const previewIntroTL = gsap.timeline({ paused: true })
          .to(
            [titles[index], involvements[index], companyNames[index], activeNumbers[index]],
            {
              opacity: 1,
              y: 0,
              zIndex: 1,
              pointerEvents: 'all',
              duration: 0.2,
              ease: "ease",
            },
            0
          );
        const previewOutroTL = gsap.timeline({ paused: true })
          .to(
            [titles[index], involvements[index], companyNames[index], activeNumbers[index]],
            {
              opacity: 0,
              y: -10,
              zIndex: 0,
              pointerEvents: 'none',
              duration: 0.2,
              ease: "ease",
            },
            0
          );
        gsap.timeline({
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: preview,
            pin: false,
            start: `top bottom`,
            end: `bottom top`,
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onEnter: () => previewIntroTL.play(),
            onEnterBack: () => previewOutroTL.reverse(),
            onLeave: () => previewOutroTL.play(),
            onLeaveBack: () => previewIntroTL.reverse(),
          },
        }).to(
          medias[index],
          {
            y: "28%",
            ease: "none",
          }
        );
      })
    });
  };

  // Initialize GSAP timelines and plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
      content: "#smooth-content",
      wrapper: "#smooth-wrapper",
      smooth: 1,
      effects: true,
    });

    if (!isMobile) {
      const ctx = gsap.context((self) => {
        getUIIntroTL();
        getFeaturedIntroTL(self);
        getFeaturedTimelines(self);
      });
      return () => ctx.revert();
    }
  }, [isMobile]);

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
                {isMobile ?
                  <div className={`${styles.homeFeaturedMobile} grid`}>
                    {
                      projects.map((project) =>
                        <Link href={`/projects/${project.href}`} key={project.key}>
                          <div className={styles.homeFeaturedProject}>
                            <p className={`detail`}>
                              <span className={`textColorOffBlack`}>Featured Work</span>
                            </p>
                            <p className={`${styles.homeFeaturedNumberText} textFontDetail textColorOffWhite`}>
                              {project.number} / 006
                            </p>
                            <div className={styles.homeFeaturedPreviewMedia}>
                              <div className={styles.homeFeaturedPreviewMediaOverlay} />
                              <Image src={project.thumbnail_mobile} alt="thumbnail" fill={true} sizes="100%" loading="lazy" style={{ objectFit: "cover" }} />
                            </div>
                            <h1 className={styles.homeFeaturedTitleText}>
                              {project.name}
                            </h1>
                            <ul className={`${styles.homeFeaturedInvolmentListItems} textFontHighlight textColorGrey`}>
                              {project.involvement.map((involvement) =>
                                <li key={involvement}><i>{involvement}</i></li>)
                              }
                            </ul>
                          </div>
                        </Link>)
                    }
                  </div>
                  :
                  <div className={`${styles.homeFeaturedPreviews} grid`}>
                    <div ref={homeFeaturedPreviewsList} className={styles.homeFeaturedPreviewsList}>
                      {
                        projects.map((project) =>
                          <Link href={`/projects/${project.href}`} key={project.key}>
                            <div className={styles.homeFeaturedPreviewMedia}>
                              <div className={styles.homeFeaturedPreviewMediaOverlay} />
                              <div className={styles.homeFeaturedPreviewMediaContainer}>
                                <Image src={project.thumbnail_desktop} alt="thumbnail" fill={true} sizes="100%" loading="lazy" style={{ objectFit: "cover" }} />
                              </div>
                            </div>
                          </Link>)
                      }
                    </div>
                  </div>
                }
              </section>
              {/* CTA */}
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
                      <a className={styles.homeCTASocial} href="https://www.google.com">
                        X
                      </a>
                      <span className={`textColorGrey`}>/</span>
                      <a className={styles.homeCTASocial} href="https://www.google.com">
                        IG
                      </a>
                      <span className={`textColorGrey`}>/</span>
                      <a className={styles.homeCTASocial} href="https://www.google.com">
                        LI
                      </a>
                    </p>
                  </div>
                  <div className={styles.homeCTAButton}>
                    <Button href={'https://www.google.com'}>
                      Contact
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div >
        {/* Featured Static Text */}
        {isMobile ? null :
          <div ref={homeFeaturedStatic} className={styles.homeFeaturedStatic}>
            <div className={`${styles.homeFeaturedStaticContainer} grid`}>
              {/* Number */}
              <div className={styles.homeFeaturedNumber}>
                <p className={`detail`}>
                  <span className={`textColorOffBlack`}>Featured Works</span>
                </p>
                <div className={styles.homeFeaturedNumberContainer}>
                  <div className={styles.homeFeaturedActiveNumbers}>
                    {
                      projects.map((project) =>
                        <div className={styles.homeFeaturedActiveNumber} key={project.key}>
                          <p className={`${styles.homeFeaturedNumberText} textFontDetail textColorOffWhite`}>
                            {project.number}
                          </p>
                        </div>)
                    }
                  </div>
                  <p className={`${styles.homeFeaturedNumberText} textFontDetail textColorOffWhite`}>
                    /006
                  </p>
                </div>
              </div>
              {/* Title */}
              <div className={styles.homeFeaturedTitles}>
                {
                  projects.map((project) =>
                    <Link href={project.href} key={project.key}>
                      <div className={styles.homeFeaturedTitle}>
                        <h1 className={styles.homeFeaturedTitleText}>
                          {project.name}
                        </h1>
                      </div>
                    </Link>)
                }
              </div>
              {/* Company */}
              <div className={styles.homeFeaturedCompany}>
                <p className={`detail`}>
                  <span className={`textColorOffBlack`}>Company</span>
                </p>
                <div className={styles.homeFeaturedCompanyNames}>
                  {
                    projects.map((project) =>
                      <div className={styles.homeFeaturedCompanyName} key={project.key}>
                        <p className={`detail`}>
                          <span className={`textColorGrey`}>{project.company}</span>
                        </p>
                      </div>)
                  }
                </div>
              </div>
              {/* Involvement */}
              <div className={styles.homeFeaturedInvolvement}>
                <p className={`detail`}>
                  <span className={`textColorOffBlack`}>
                    Involvement
                  </span>
                </p>
                <div className={styles.homeFeaturedInvolvementLists}>
                  {
                    projects.map((project) =>
                      <div className={styles.homeFeaturedInvolvementList} key={project.key}>
                        <ul className={`${styles.homeFeaturedInvolmentListItems} textFontHighlight textColorGrey`}>
                          {project.involvement.map((involvement) =>
                            <li key={involvement}><i>{involvement}</i></li>)
                          }
                        </ul>
                      </div>)
                  }
                </div>
              </div>
            </div>
          </div>}
      </main >
    </div >
  );
}
