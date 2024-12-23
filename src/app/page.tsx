// `app/home.tsx` is the UI for the `/` URL
"use client"
import { useEffect, useRef } from "react";
// Styles
import styles from "./styles/home.module.css"
// Components
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import LogoModel from "./components/scene/logoModel";


export default function Home() {
  return (

    <div>
      <main className={styles.home}>

        <div className={styles.homeBanner}>
          <Canvas className={styles.homeBannerModel}>
            <LogoModel />
          </Canvas>
          <div className={styles.homeBannerUI}>
            <div className={styles.homeBannerUIDetails}>
              <div className={styles.homeBannerUIDetailsTopLeft}>
                <div className={styles.homeBannerUIDetailsTopLeftCorner} />
                <p className={`${styles.homeBannerUIDetailsTopLeftText} detail textColorGrey`}>
                  <span className={`textColorBlue`}>
                    Jaime Castaneda
                  </span>
                </p>
              </div>
              <div className={styles.homeBannerUIDetailsTopRight}>
                <p className={`${styles.homeBannerUIDetailsTopRightText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    @the_casta_way
                  </span>
                </p>
                <div className={styles.homeBannerUIDetailsTopRightCorner} />
              </div>
              <div className={styles.homeBannerUIDetailsBottomRight}>
                <p className={`${styles.homeBannerUIDetailsBottomRightText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    ©2025 V.002
                  </span>
                </p>
                <div className={styles.homeBannerUIDetailsBottomRightCorner} />
              </div>
              <div className={styles.homeBannerUIDetailsBottomLeft}>
                <div className={styles.homeBannerUIDetailsBottomLeftCorner} />
                <p className={`${styles.homeBannerUIDetailsBottomLeftText} detail textColorGrey`}>
                  <span className={`textColorDarkGrey`}>
                    2025 Folio
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>



        <div id="trigger" style={{ marginTop: '100vh', height: '200vh' }}>
          <ol>
            <li>
              Get started by editing <code>src/app/page.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
