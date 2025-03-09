"use client"
import { ReactNode } from "react";
// Components
import Link from "@/app/components/global/link";
// Styles
import styles from "@/app/styles/projects/cta.module.css"

interface AnchorLinkedSectionProps {
    nextProjectLink: string,
    nextProjectName: string,
    nextProjectNumber: string,
}

export default function CTA({ nextProjectLink, nextProjectName, nextProjectNumber }: AnchorLinkedSectionProps) {
    return (
        <section className={styles.cta}>
            <div className={`${styles.ctaContent} grid`}>
                <div className={styles.ctaBack}>
                    <Link href="/">
                        <div className={styles.ctaBackCard}>
                            <div className={`detail textColorGrey`}>
                                Back to projects
                            </div>
                            <div className={styles.ctaBackCardButton}>
                                <div className={styles.ctaBackCardButtonCornerTopLeft} />
                                <div className={styles.ctaBackCardButtonCornerTopRight} />
                                <div className={styles.ctaBackCardButtonCornerBottomRight} />
                                <div className={styles.ctaBackCardButtonCornerBottomLeft} />
                                <div className={styles.ctaBackCardButtonIcon}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.0415 1.13062H18.9403V19.0282" className={styles.ctaBackCardButtonIconSVG} />
                                        <path d="M1.0415 19.0282L18.9403 1.13062" className={styles.ctaBackCardButtonIconSVG} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={styles.ctaNext}>
                    <Link href={nextProjectLink}>
                        <div className={styles.ctaNextCard}>
                            <div className={`detail textColorGrey`}>
                                Next Project
                            </div>
                            <div className={styles.ctaNextCardInfo}>
                                <div className={`detail textColorGrey`}>
                                    PR. {nextProjectNumber} / 006
                                </div>
                                <div className={styles.ctaNextCardTitle}>
                                    <p className={`labelLarge`}>
                                        {nextProjectName}
                                    </p>
                                    <div className={styles.ctaNextCardButton}>
                                        <div className={styles.ctaNextCardButtonCornerTopLeft} />
                                        <div className={styles.ctaNextCardButtonCornerTopRight} />
                                        <div className={styles.ctaNextCardButtonCornerBottomRight} />
                                        <div className={styles.ctaNextCardButtonCornerBottomLeft} />
                                        <div className={styles.ctaNextCardButtonIcon}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.0415 1.13062H18.9403V19.0282" className={styles.ctaNextCardButtonIconSVG} />
                                                <path d="M1.0415 19.0282L18.9403 1.13062" className={styles.ctaNextCardButtonIconSVG} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={styles.ctaTitle}>
                    <p className={`detail`}>
                        <span className={`textColorGrey`}>Design and Engineering Lead for Web @Meta</span>
                    </p>
                </div>
                <div className={styles.ctaLocale}>
                    <p className={`detail`}>
                        <span className={`textColorGrey`}>Bay Area California</span>
                    </p>
                </div>
                <div className={styles.ctaSocials}>
                    <p className={`detail`}>
                        <a className={styles.ctaSocial} href="https://www.google.com">
                            X
                        </a>
                        <span className={`textColorGrey`}>/</span>
                        <a className={styles.ctaSocial} href="https://www.google.com">
                            IG
                        </a>
                        <span className={`textColorGrey`}>/</span>
                        <a className={styles.ctaSocial} href="https://www.google.com">
                            LI
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}