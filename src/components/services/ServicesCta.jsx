import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { reveal, staggerReveal } from "./servicesAnimations";

import "./ServicesCta.scss";

export default function ServicesCta() {
    return (
        <section className="services-cta" aria-labelledby="services-cta-title">
            <img
                src="/images/services/servicecta.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />

            <div className="services-cta__overlay" aria-hidden="true" />

            <motion.div
                className="services-cta__content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={staggerReveal}
            >
                <motion.h2
                    className="services-cta__title"
                    id="services-cta-title"
                    variants={reveal}
                >
                    What should your space feel like?
                </motion.h2>

                <motion.div variants={reveal}>
                    <Link to="/contact" className="btn-light">
                        Let's connect
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
