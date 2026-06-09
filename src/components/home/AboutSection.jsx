import "./AboutSection.scss";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { revealEyebrow, viewport } from "../../utils/motion";


export default function AboutSection() {

    const sectionRef = useRef(null);

    // Track scroll progress of this section through the viewport.
    // Overlay fades from opaque (text hidden) to transparent (text fully revealed).
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 85%", "start 15%"],
    });

    // 0.85 → text is visually hidden behind the overlay
    // 0    → overlay gone, full black text visible
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0]);

    return (
        <motion.section
            className="about-section"
            ref={sectionRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
        >
            <div className="container">
                <div className="about-section__content">

                    <motion.p
                        className="about-section__eyebrow"
                        variants={revealEyebrow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        Who We Are
                    </motion.p>

                    {/* Wrapper is relative so the overlay can sit absolute on top of the text */}
                    <div className="about-section__text-wrapper">
                        <p className="about-section__description">
                            We create architectural lighting environments that bring atmosphere,
                            materiality, and emotion into harmony. Each lighting solution is
                            thoughtfully designed to complement modern architecture with clarity,
                            precision, and purpose. Designed with intention, built to elevate how
                            spaces are experienced and remembered.
                        </p>

                        {/* The overlay: same colour as the section background.
                            Fades out as the section scrolls into view,
                            revealing the black text beneath — exactly how John Cullen does it. */}
                        <motion.div
                            className="about-section__overlay"
                            style={{ opacity: overlayOpacity }}
                            aria-hidden="true"
                        />
                    </div>

                </div>
            </div>
        </motion.section>
    );
}
