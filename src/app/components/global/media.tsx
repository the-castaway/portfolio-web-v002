"use client"

// Styles
import styles from "@/app/styles/global/media.module.css"
// Components
import Image from "next/image";

const aspectRatioClasses = {
    "4:5": "aspect-4-5",
    "16:9": "aspect-16-9",
    "3:4": "aspect-3-4",
    "5:4": "aspect-5-4",
} as const;

interface Props {
    src: string,
    aspectRatio: keyof typeof aspectRatioClasses,
}

export default function Media({ src, aspectRatio }: Props) {
    return (
        // <div className={aspectRatioClasses[aspectRatio]}>
        <div className={styles.media}>
            <div className={styles.mediaOverlay} />
            <div className={styles.mediaContainer}>
                <Image src={src} alt="media" fill={true} sizes="100%" loading="lazy" style={{ objectFit: "cover" }} />
            </div>
        </div>
    )
}