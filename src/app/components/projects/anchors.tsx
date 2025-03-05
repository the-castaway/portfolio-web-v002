"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// Styles
import styles from "../../styles/projects/anchors.module.css"


export default function Anchors() {
    const [sections, setSections] = useState<string[]>([]);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        // Select all sections with `data-anchor`
        const sectionElements = gsap.utils.toArray<HTMLElement>("section[data-anchor]");
        //const scrollWrapper = document.getElementById(`smooth-wrapper`)
        const sectionIds = sectionElements.map((el) => el.getAttribute("id")!);
        setSections(sectionIds);


        // sectionElements.forEach((section) => {
        //     ScrollTrigger.create({
        //         trigger: section,
        //         start: "top center",
        //         end: "bottom center",
        //         onEnter: () => setActiveSection(section.id),
        //         onEnterBack: () => setActiveSection(section.id),
        //     });
        // });

        // return () => ScrollTrigger.getAll().forEach((st) => st.kill()); // Cleanup on unmount
    }, []);

    const handleClick = (id: string, event: React.MouseEvent) => {
        const scrollWrapper = document.getElementById(`smooth-wrapper`)
        event.preventDefault(); // Prevent default jump behavior
        // gsap.to("#smooth-wrapper", { // ✅ Scroll the GSAP wrapper, not window
        //     duration: 1.2,
        //     scrollTo: { y: `#${id}`, offsetY: 50 },
        //     ease: "power2.out",
        // });


        gsap.to(window, { duration: 2, scrollTo: { y: `#${id}`, offsetY: 50 } });

        // window.scrollTo({ top: 0 });
    };

    return (
        <ul className={styles.anchors} >
            {sections.map((id) => (
                <li key={id} className={styles.anchor} >
                    <a key={id} href={`#${id}`} onClick={(e) => handleClick(id, e)}>
                        <span
                            className={`detail textColorDarkGrey`}
                        >
                            {id.replace(/-/g, " ")}
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}