import { motion } from "framer-motion";

import { revealHeading, viewport } from "../../utils/motion";

import "./ProjectHero.scss";

export default function ProjectHero({ featuredImage, title }) {
    return (
        <motion.section
            className="project-hero"
            aria-labelledby="project-hero-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
        >
            <div className="project-hero__media" aria-hidden="true">
                <img
                    className="project-hero__image"
                    src={featuredImage}
                    alt=""
                    loading="eager"
                    decoding="async"
                />
            </div>

            <div className="project-hero__content">
                <div className="container">
                    <motion.h3
                        className="project-hero__title"
                        id="project-hero-title"
                        variants={revealHeading}
                    >
                        {title}
                    </motion.h3>
                </div>
            </div>
        </motion.section>
    );
}
