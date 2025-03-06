"use client"
import { ReactNode } from "react";
// Styles
import styles from "@/app/styles/pages/project.module.css"

interface AnchorLinkedSectionProps {
    id: string;
    children: ReactNode;
}

export default function CTA({ id, children }: AnchorLinkedSectionProps) {
    return (
        <section className={styles.projectCTA}>
            <div className={`${styles.projectCTAContent} grid`}>
                <div className={styles.projectCTABack}>
                    <div className={styles.projectCTABackButton}>
                        <div className={`detail textColorGrey`}>
                            Back to projects
                        </div>
                        <div>
                            Back
                        </div>

                    </div>
                </div>
                <div className={styles.projectCTANext}>
                    <div className={styles.projectCTANextButton}>
                        <div className={`detail textColorGrey`}>
                            Back to projects
                        </div>
                        <div>
                            <div className={`detail textColorGrey`}>
                                PR. 002 / 006
                            </div>
                            Community Voices Hub
                        </div>
                    </div>
                </div>
                <div className={styles.projectCTATitle}>
                    <p className={`detail`}>
                        <span className={`textColorGrey`}>Design and Engineering Lead for Web @Meta</span>
                    </p>
                </div>
                <div className={styles.projectCTALocale}>
                    <p className={`detail`}>
                        <span className={`textColorGrey`}>Bay Area California</span>
                    </p>
                </div>
                <div className={styles.projectCTASocials}>
                    <p className={`detail`}>
                        <a className={styles.projectCTASocial} href="https://www.google.com">
                            X
                        </a>
                        <span className={`textColorGrey`}>/</span>
                        <a className={styles.projectCTASocial} href="https://www.google.com">
                            IG
                        </a>
                        <span className={`textColorGrey`}>/</span>
                        <a className={styles.projectCTASocial} href="https://www.google.com">
                            LI
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}