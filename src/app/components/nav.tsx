import TransitionLink from "./TransitionLink";

const Navigation = () => {
    return (
        <nav>
            <TransitionLink href="/" label="home" />
            <TransitionLink href="/archive" label="archive" />
            <TransitionLink href="/about" label="about" />
        </nav>
    )
}

export default Navigation