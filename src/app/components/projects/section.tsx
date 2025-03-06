"use client"
import { ReactNode } from "react";

interface AnchorLinkedSectionProps {
    id: string;
    children: ReactNode;
}

export default function Section({ id, children }: AnchorLinkedSectionProps) {
    return (
        <section id={id} data-anchor={id}>
            {children}
        </section>
    );
}