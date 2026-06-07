import { useRef, useEffect, useState } from "react";

export default function TechParallax() {
    const stickyRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const logos = [
        { name: "HTML5", icon: "fa-brands fa-html5" },
        { name: "CSS3", icon: "fa-brands fa-css3-alt" },
        { name: "PHP", icon: "fa-brands fa-php" },
        { name: "Laravel", icon: "fa-brands fa-laravel" },
        { name: "React", icon: "fa-brands fa-react" },
        { name: "React Native", icon: "fa-brands fa-react" },
        { name: "MySQL", icon: "fa-solid fa-database" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sticky = stickyRef.current;
            if (!sticky) return;

            const rect = sticky.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // How far the sticky block has moved within the viewport
            const distance = viewportHeight - rect.top;
            const total = viewportHeight; // full progress occurs within one viewport height

            const pct = Math.min(Math.max(distance / total, 0), 1);
            setProgress(pct);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="tech-parallax-section">
            <div className="tech-parallax-sticky" ref={stickyRef}>
                <h2 className="home-section-heading">Technologies I Work With</h2>

                <div className="tech-row">
                    {logos.map((logo, i) => {
                        const revealPoint = i / logos.length;
                        const visible = progress >= revealPoint;

                        return (
                            <div
                                key={logo.name}
                                className={`tech-logo ${visible ? "visible" : ""}`}
                                style={{
                                    transitionDelay: `${i * 0.15}s`
                                }}
                            >
                                <i className={logo.icon}></i>
                                <span>{logo.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}