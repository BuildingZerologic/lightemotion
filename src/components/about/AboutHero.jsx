import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { EASE, revealHeading, revealParagraph, viewport } from "../../utils/motion";

import "./AboutHero.scss";

const desktopVideo = "/videos/aboutushero.mp4";
const mobileVideo = "/videos/aboutushero.mp4";

function useDesktopVideo() {
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.matchMedia("(min-width: 768px)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const handleChange = (event) => setIsDesktop(event.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isDesktop;
}

export default function AboutHero() {
    const shouldReduceMotion = useReducedMotion();
    const isDesktop = useDesktopVideo();
    const videoSource = isDesktop ? desktopVideo : mobileVideo;

    // Respect prefers-reduced-motion: collapse y translations and durations
    const heading = {
        hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.01 : 0.8, ease: EASE } },
    };

    const description = {
        hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
        visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.01 : 0.75, delay: shouldReduceMotion ? 0 : 0.14, ease: EASE } },
    };

    const videoReveal = {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0.01 : 1, delay: shouldReduceMotion ? 0 : 0.36, ease: EASE } },
    };

    return (
        <motion.section
            className="about-hero"
            aria-labelledby="about-hero-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <motion.div
                    className="about-hero__content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <motion.h3
                        className="about-hero__title"
                        id="about-hero-title"
                        variants={heading}
                    >
                        Who we are
                    </motion.h3>

                    <motion.p
                        className="about-hero__description"
                        variants={description}
                    >
                        We engineer lighting environments that shape atmosphere, elevate architecture, and evoke emotion. 
                        Blending technical precision with artistic sensitivity, Lightemotion creates spaces designed to be felt as much as they are seen. 
                        We treat light as a living architectural element, a structural tool that has the power to redefine volume, direct human focus, and unveil hidden textures. 
                        From the initial blueprint analysis to final on-site calibration, our team crafts bespoke illumination strategies that seamlessly integrate into contemporary design, turning physical structures into fluid, sensory experiences.
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                className="about-hero__video-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={videoReveal}
            >

                <div className="about-hero__video-overlay" />
 

                <video
                    key={videoSource}
                    className="about-hero__video"
                    autoPlay={!shouldReduceMotion}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/about-hero-poster.webp"
                    aria-hidden="true"
                >
                    <source src={videoSource} type="video/mp4" />
                </video>
            </motion.div>
        </motion.section>
    );
}
