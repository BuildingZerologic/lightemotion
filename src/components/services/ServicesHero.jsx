import { motion } from "framer-motion";

import "./ServicesHero.scss";

export default function ServicesHero() {
    return (
        <section className="services-hero" data-navbar-transparent>
            <motion.img
                src="/images/services/serviceshero.webp"
                alt="Architectural lighting installation illuminating a refined interior space"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />

            <div className="services-hero__overlay" aria-hidden="true" />

            <motion.h2
                className="services-hero__heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.9,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                Lighting That Shapes Spaces
            </motion.h2>
        </section>
    );
}
