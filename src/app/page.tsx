// `app/home.tsx` is the UI for the `/` URL
"use client"
import Image from "next/image";
import styles from "./styles/page.module.css";

import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function Home() {

  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Create imgRef reference
  const imgRef = useRef<HTMLImageElement>(null)

  // Effect when image and context are loaded
  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas === null)
      return

    const context = canvas.getContext('2d')

    if (context === null)
      return

    // Get the `img` from reference
    const image = imgRef.current

    if (image === null)
      return

    // Draw the image to the context
    context.drawImage(image, 0, 0)
  }, [imgRef])

  const route = useRouter()
  return (
    <div className="grid">
      <main className={styles.main}>
        <canvas
          className='col-start-15 col-span-10'
          ref={canvasRef}
          style={{
            border: 'solid 1px black',
          }}
        ></canvas>
        <Image
          // attach a reference
          ref={imgRef}
          // source to the image
          src={"/media/next.svg"}
          width={180}
          height={38}
          // Or import in a next.js fashion
          // import myImage from './myimage.png'
          // src={myImage}
          alt=""
          priority={true}
        // Hide it from displaying
        // style={{
        //   display: 'none',
        // }}
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </div>
  );
}
