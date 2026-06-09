import { motion } from "framer-motion";

import {
    EASE,
    revealHeading,
    revealSection,
    staggerContainer,
    viewport,
    viewportLow,
} from "../../utils/motion";

import "./ServicesHero.scss";

export default function ServicesHero() {
    return (
        <motion.section
            className="services-hero"
            data-navbar-transparent
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
        >
            <motion.img
                src="/images/services/serviceshero.webp"
                alt="Architectural lighting installation illuminating a refined interior space"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                variants={{
                    hidden:  { opacity: 0, scale: 1.04 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
                }}
            />

            <div className="services-hero__overlay" aria-hidden="true" />

            <motion.h3
                className="services-hero__heading"
                variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: EASE } },
                }}
            >
                Lighting That Shapes Spaces
            </motion.h3>
        </motion.section>
    );
}
