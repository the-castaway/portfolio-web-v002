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

        <Canvas className={styles.homeBannerModel}>
          <LogoModel />
        </Canvas>

        <div className={styles.homeBannerDetails}>




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
