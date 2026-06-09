import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import { EASE, viewport } from "../../utils/motion";

import "./Hero.scss";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            className="hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >

            <motion.div
                className="hero__video-wrapper"
                variants={{
                    hidden:  { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
                }}
            >

                <video
                    className="hero__video"
                    autoPlay={!shouldReduceMotion}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/hero-poster.webp"
                    aria-hidden="true"
                >
                    <source src="/videos/herovideo.mp4" type="video/mp4" />
                </video>

            </motion.div>

            <div className="hero__overlay"></div>

            <div className="container">

                <motion.div
                    className="hero__content"
                    variants={{
                        hidden:  { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 } },
                    }}
                >

                    <h4 className="hero__title">
                        Lighting Solutions For Business
                    </h4>

                    <div className="hero__actions">

                        <Link to="/contact"
                            className="btn-light"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            START COLLABORATION
                        </Link>

                    </div>

                </motion.div>

            </div>

        </motion.section>
    );
}
