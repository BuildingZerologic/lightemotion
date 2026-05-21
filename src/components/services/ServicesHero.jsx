import { motion } from "framer-motion";

import "./ServicesHero.scss";

export default function ServicesHero() {
    return (
        <section className="services-hero" data-navbar-transparent>
            <motion.img
                src="/images/services/serviceshero.webp"
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />

            <div className="services-hero__overlay" aria-hidden="true" />
        </section>
    );
}
