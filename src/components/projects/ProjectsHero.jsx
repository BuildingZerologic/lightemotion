import { motion } from "framer-motion";

import {
    revealHeading,
    revealParagraph,
    staggerFast,
    viewport,
} from "../../utils/motion";

import "./ProjectsHero.scss";

export default function ProjectsHero() {
    return (
        <motion.section
            className="projects-hero"
            aria-labelledby="projects-hero-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerFast}
        >
            <div className="container">
                <motion.div
                    className="projects-hero__content"
                    variants={staggerFast}
                >

                    <motion.h3
                        className="projects-hero__title"
                        id="projects-hero-title"
                        variants={revealHeading}
                    >
                        Our Work
                    </motion.h3>

                    <motion.p
                        className="projects-hero__description"
                        variants={revealParagraph}
                    >
                        Explore spaces across India shaped by thoughtful lighting - from homes and hotels to workplaces, retail spaces, and landmarks.                    </motion.p>
                </motion.div>
            </div>
        </motion.section>
    );
}
