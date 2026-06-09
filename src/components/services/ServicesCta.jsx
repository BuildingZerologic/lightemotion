import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
    revealButton,
    revealHeading,
    staggerFast,
    viewport,
} from "../../utils/motion";

import "./ServicesCta.scss";

export default function ServicesCta() {
    return (
        <motion.section
            className="services-cta"
            aria-labelledby="services-cta-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={staggerFast}
        >
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
                    variants={staggerFast}
                >
                    <motion.h5
                        className="services-cta__title"
                        id="services-cta-title"
                        variants={revealHeading}
                    >
                        Let's connect to find out what your space should feel like
                    </motion.h5>

                    <motion.div variants={revealButton}>
                        <Link to="/contact" className="btn-light">
                            Let's connect
                        </Link>
                    </motion.div>
                </motion.div>
            
        </motion.section>
    );
}
