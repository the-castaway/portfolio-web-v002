"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// Styles
import styles from "@/app/styles/projects/anchors.module.css"

export default function Anchors() {
    const [sections, setSections] = useState<string[]>([]);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        const ctx = gsap.context(() => {
            // Select all sections with `data-anchor`
            const sectionElements = gsap.utils.toArray<HTMLElement>("section[data-anchor]");
            const sectionIds = sectionElements.map((el) => el.getAttribute("id")!);
            setSections(sectionIds);
            sectionElements.forEach((section) => {
                ScrollTrigger.create({
                    trigger: section,
                    scroller: window,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveSection(section.id),
                    onEnterBack: () => setActiveSection(section.id),
                });
            });
        })
        return () => {
            ctx.revert();
        }
    }, []);

    const scrollToSection = (id: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default jump behavior
        gsap.to(window, { duration: 2, scrollTo: { y: `#${id}`, offsetY: 50 } });
    };

    return (
        <ul className={styles.anchors} >
            {sections.map((id) => (
                <li key={id} className={styles.anchor} >
                    <a key={id} href={`#${id}`} onClick={(e) => scrollToSection(id, e)}>
                        <span
                            className={`detail ${activeSection === id ? "textColorOffWhite" : "textColorGrey"} ${styles.anchorText}`}
                        >
                            {id.replace(/-/g, " ")}
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}