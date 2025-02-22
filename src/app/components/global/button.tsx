"use client"
// Styles 
import styles from "../../styles/global/button.module.css"

interface Props {
    href: string
    children: React.ReactNode
}

const Button = ({ href, children }: Props) => {
    return (
        <a className={styles.button} href={href}>
            <div className={styles.buttonCornerTopLeft} />
            <div className={styles.buttonCornerTopRight} />
            <div className={styles.buttonCornerBottomRight} />
            <div className={styles.buttonCornerBottomLeft} />
            {children}
        </a>
    )
}

export default Button