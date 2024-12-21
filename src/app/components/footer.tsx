"use client"
import styles from "../styles/footer.module.css"

interface Props {
    href: string
    label: string
    number: string
}

const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div className={styles.footerInstructions}>
                <p className={`detail`}>
                    <span className={`textColorDarkGrey`}>Loading [ 100% ]</span>
                </p>
            </div>
            <div className={styles.footerCopyright}>
                <p className={`detail`}>
                    <span className={`textColorDarkGrey`}>©2025 v002</span>
                </p>
            </div>

        </footer>
    )
}

export default Footer