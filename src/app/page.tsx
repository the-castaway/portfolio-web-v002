// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Styles
import styles from "./styles/home.module.css"
// Components
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import LogoModel from "./components/scene/logoModel";
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
  // Vars
  const { isMobile } = useScreenSize();
  // Plugins
  //gsap.registerPlugin(ScrollTrigger)

  // Banner intro timeline
  const getBannerIntroTL = () => {
    const bannerIntroTL = gsap.timeline();
    const bannerUIDetailsHeight = isMobile ? "50%" : "20%";
    bannerIntroTL
      .to(bannerUIDetails.current,
        {
          width: '85%',
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
    const bannerUIDetailsHeight = isMobile ? "55%" : "25%";
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
      width: '90%',
      height: bannerUIDetailsHeight,
      duration: 0.5,
    }, 0)
    scrollTL.to(banner.current,
      {
        opacity: 0,
        duration: 0.5,
      }, 0)
    return scrollTL;
  }

  // Initialize timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      getBannerIntroTL();
      getScrollTL();
    })
    return () => {
      ctx.revert();
    }
  }, [isMobile])

  return (
    <div>
      <main className={styles.home}>
        {/* Banner */}
        <div ref={banner} className={styles.homeBanner}>
          <Canvas ref={bannerModel} className={styles.homeBannerModel}>
            <LogoModel />
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
          <div className={styles.homeBannerIcons} >
            <svg width="124" height="23" viewBox="0 0 124 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M111.726 0.871033C105.625 0.871033 100.661 5.83449 100.661 11.9355C100.661 18.0366 105.625 23 111.726 23C117.827 23 122.79 18.0366 122.79 11.9355C122.79 5.83449 117.827 0.871033 111.726 0.871033ZM117.416 11.6133C117.395 10.205 117.242 8.84183 116.967 7.57985C117.767 7.8093 118.509 8.09225 119.177 8.42611C120.933 9.30395 121.964 10.4254 122.123 11.6133H117.416ZM116.772 11.6133H112.048V6.88957C113.532 6.91149 114.962 7.08551 116.266 7.39552C116.576 8.69939 116.75 10.1296 116.772 11.6133ZM112.048 6.24505V1.53811C113.236 1.69666 114.357 2.7279 115.235 4.48422C115.569 5.15194 115.852 5.89508 116.081 6.69364C114.819 6.41907 113.456 6.26503 112.048 6.24505ZM111.403 1.53811V6.24505C109.995 6.26568 108.632 6.41907 107.37 6.69364C107.599 5.89443 107.882 5.15194 108.216 4.48422C109.094 2.7279 110.215 1.69666 111.403 1.53811ZM111.403 6.88957V11.6133H106.68C106.702 10.1296 106.876 8.69939 107.186 7.39552C108.489 7.08486 109.92 6.91149 111.403 6.88957ZM106.035 11.6133H101.328C101.487 10.4254 102.518 9.30395 104.274 8.42611C104.942 8.09225 105.685 7.8093 106.484 7.57985C106.209 8.84183 106.055 10.205 106.035 11.6133ZM106.035 12.2578C106.056 13.6661 106.209 15.0292 106.484 16.2912C105.684 16.0624 104.942 15.7788 104.274 15.4449C102.519 14.5671 101.487 13.4456 101.328 12.2578H106.035ZM106.68 12.2578H111.403V16.9815C109.92 16.9596 108.489 16.7856 107.186 16.4755C106.875 15.1717 106.702 13.7415 106.68 12.2578ZM111.403 17.626V22.3329C110.215 22.1744 109.094 21.1432 108.216 19.3868C107.882 18.7191 107.599 17.976 107.37 17.1774C108.632 17.452 109.995 17.606 111.403 17.626ZM112.048 22.3329V17.626C113.456 17.6054 114.819 17.452 116.081 17.1774C115.852 17.9766 115.569 18.7191 115.235 19.3868C114.357 21.1432 113.236 22.1744 112.048 22.3329ZM112.048 16.9815V12.2578H116.772C116.75 13.7415 116.576 15.1717 116.266 16.4755C114.962 16.7862 113.532 16.9596 112.048 16.9815ZM117.416 12.2578H122.123C121.964 13.4456 120.933 14.5671 119.177 15.4449C118.509 15.7788 117.766 16.0618 116.967 16.2912C117.242 15.0292 117.396 13.6661 117.416 12.2578ZM121.895 9.66553C121.333 8.99007 120.515 8.37455 119.466 7.84926C118.666 7.44966 117.767 7.11967 116.796 6.86508C116.541 5.89443 116.211 4.99468 115.812 4.19612C115.287 3.14619 114.671 2.3283 113.996 1.76627C117.922 2.64153 121.02 5.7391 121.895 9.66553ZM109.456 1.76563C108.78 2.32765 108.165 3.14619 107.639 4.19547C107.24 4.99468 106.91 5.89379 106.655 6.86444C105.684 7.11967 104.785 7.44966 103.986 7.84862C102.936 8.37326 102.118 8.98942 101.556 9.66488C102.432 5.7391 105.529 2.64153 109.456 1.76563ZM101.556 14.2055C102.118 14.881 102.936 15.4965 103.986 16.0218C104.785 16.4214 105.684 16.7514 106.654 17.006C106.91 17.9766 107.24 18.8764 107.639 19.6749C108.163 20.7249 108.779 21.5428 109.455 22.1048C105.529 21.2295 102.432 18.132 101.556 14.2055ZM113.996 22.1054C114.671 21.5434 115.287 20.7249 115.812 19.6756C116.211 18.8764 116.541 17.9773 116.796 17.0066C117.767 16.7514 118.666 16.4214 119.466 16.0224C120.516 15.4978 121.333 14.8816 121.895 14.2062C121.02 18.132 117.922 21.2295 113.996 22.1054Z" fill="#4A4A4A" />
              <path d="M81.0107 0.743134L80.7961 1.35092C84.9507 2.81978 87.7428 6.76876 87.7428 11.1779C87.7428 15.5871 84.9513 19.5361 80.7961 21.0049L81.0107 21.6127C85.4225 20.053 88.3873 15.8597 88.3873 11.1779C88.3873 6.49613 85.4225 2.30287 81.0107 0.743134Z" fill="#4A4A4A" />
              <path d="M73.8494 1.35092L73.6348 0.743134C69.223 2.30287 66.2582 6.49613 66.2582 11.1779C66.2582 15.8597 69.2224 20.053 73.6341 21.6127L73.8488 21.0049C69.6948 19.5361 66.9028 15.5871 66.9028 11.1779C66.9028 6.76876 69.6948 2.81978 73.8494 1.35092Z" fill="#4A4A4A" />
              <path d="M77.6451 0.435608H77.0006V21.9194H77.6451V0.435608Z" fill="#4A4A4A" />
              <path d="M17.1003 16.272C14.537 14.7355 11.8861 13.1467 11.8861 11.1777C11.8861 9.20871 14.537 7.61996 17.1003 6.08343C19.8176 4.45472 22.6277 2.77059 22.6277 0.43613H21.9832C21.9832 2.40514 19.3323 3.99389 16.769 5.53043C15.3214 6.39795 13.848 7.28095 12.7872 8.26964C13.2602 7.49622 13.8706 6.76404 14.4971 6.01317C15.8544 4.3864 17.2576 2.7042 17.2576 0.435486H16.613C16.613 2.47024 15.3446 3.99067 14.0021 5.60004C13.219 6.53846 12.4217 7.49557 11.8861 8.57257V0.435486H11.2416V8.57257C10.706 7.49557 9.90872 6.53846 9.12563 5.60004C7.78309 3.99067 6.51467 2.47024 6.51467 0.435486H5.87015C5.87015 2.7042 7.27328 4.3864 8.63064 6.01317C9.25711 6.76468 9.86747 7.49622 10.3406 8.26964C9.27903 7.28095 7.80565 6.39731 6.3587 5.53043C3.79479 3.99389 1.14452 2.40514 1.14452 0.43613H0.5C0.5 2.77059 3.31011 4.45472 6.02742 6.08343C8.59068 7.61996 11.2416 9.20871 11.2416 11.1777C11.2416 13.1467 8.59068 14.7355 6.02742 16.272C3.31011 17.9007 0.5 19.5849 0.5 21.9193H1.14452C1.14452 19.9503 3.79544 18.3616 6.3587 16.825C7.80629 15.9575 9.27967 15.0745 10.3406 14.0852C9.86747 14.8586 9.25711 15.5908 8.63064 16.3416C7.27328 17.9684 5.87015 19.6506 5.87015 21.9193H6.51467C6.51467 19.8846 7.78309 18.3641 9.12563 16.7548C9.90872 15.8163 10.706 14.8592 11.2416 13.7822V21.9193H11.8861V13.7822C12.4217 14.8592 13.219 15.8163 14.0021 16.7548C15.3446 18.3641 16.613 19.8846 16.613 21.9193H17.2576C17.2576 19.6506 15.8544 17.9684 14.4971 16.3416C13.8706 15.5901 13.2602 14.8586 12.7872 14.0852C13.8487 15.0739 15.3221 15.9575 16.769 16.825C19.3329 18.3616 21.9832 19.9503 21.9832 21.9193H22.6277C22.6284 19.5855 19.8182 17.9014 17.1003 16.272Z" fill="#4A4A4A" />
              <path d="M44.5285 0L34.9033 5.55706V16.6712L44.5285 22.2283L54.1538 16.6712V5.55706L44.5285 0ZM44.8508 0.930044L53.187 5.74269L44.8508 10.556V0.930044ZM44.2063 10.556L35.87 5.74333L44.2063 0.930044V10.556ZM43.884 11.1141L35.5478 15.9268V6.30149L43.884 11.1141ZM44.2063 11.6723V21.2982L35.87 16.4856L44.2063 11.6723ZM44.8508 11.6723L53.187 16.4849L44.8508 21.2982V11.6723ZM45.1731 11.1141L53.5093 6.30149V15.9274L45.1731 11.1141Z" fill="#4A4A4A" />
            </svg>
          </div>
        </div>
        {/* Intro */}
        <div ref={trigger} id="trigger" className={styles.homeIntro}>
          <div className={`${styles.homeIntroHeader} grid`}>
            <div className={styles.homeIntroHeaderText}>
              <h1>
                Product designer at the crossroads of <br /><span className={`textColorBlue textFontHighlight`}><i>design</i></span> and <span className={`textColorBlue`}><i>development</i></span>
              </h1>
            </div>
          </div>
          <div className={`${styles.homeIntroDetails} grid`}>
            <div className={styles.homeIntroDetails1}>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorGrey`}>
                  [ 01 ]
                </span>
              </p>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorLightGrey`}>CURRENTLY DESIGN + ENGINEERING LEAD</span> <span className={`textColorDarkGrey`}>@META</span>
              </p>
            </div>
            <div className={styles.homeIntroDetails2}>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorGrey`}>
                  [ 02 ]
                </span>
              </p>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorLightGrey`}>OVER 10 YEARS OF INDUSTRY EXPERIENCE</span>
              </p>
            </div>
            <div className={styles.homeIntroDetails3}>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorGrey`}>
                  [ 02 ]
                </span>
              </p>
              <p className={`${styles.navModalContentContactTextNumber} detail`}>
                <span className={`textColorLightGrey`}>DEEP PROFICIENCY IN DESIGN AND ENGINEERING </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return (<div />);
}
