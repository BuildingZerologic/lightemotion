import { motion } from "framer-motion";

import { revealSection, viewport } from "../../utils/motion";

import "./ProjectOutcome.scss";

export default function ProjectOutcome({ outcome }) {
    if (!outcome) {
        return null;
    }

    const { body, title } = outcome;

    return (
        <motion.section
            className="project-outcome"
            aria-labelledby="project-outcome-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <motion.div
                    className="project-outcome__content"
                    variants={revealSection}
                >
                    <motion.h3
                        className="project-outcome__title"
                        id="project-outcome-title"
                    >
                        {title}
                    </motion.h3>

                    {body && (
                        <p className="project-outcome__body">
                            {body}
                        </p>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}
