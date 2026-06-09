import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
    revealButton,
    revealHeading,
    revealParagraph,
    revealSection,
    staggerFast,
    viewport,
} from "../../utils/motion";

import "./AboutClosingCta.scss"

export default function AboutClosingCta() {
    return (
        <motion.section
            className="about-closing-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealSection}
        >
            <div className="container">
                <motion.div
                    className="about-closing-cta__inner"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        className="about-closing-cta__content"
                        variants={revealHeading}
                    >
                        <h5 className="about-closing-cta__heading">
                            Have a vision for a space?
                        </h5>

                        <motion.p
                            className="about-closing-cta__text"
                            variants={revealParagraph}
                        >
                            Let us bring technical precision and artistic
                            sensitivity to your next project.
                        </motion.p>
                    </motion.div>
                    <motion.div
                        className="about-closing-cta__actions"
                        variants={revealButton}
                    >
                        <Link
                            to="/contact"
                            className="btn-secondary"
                        >
                            Discuss a Project
                        </Link>


                    </motion.div>

                </motion.div>
            </div>
        </motion.section>
    );
}
