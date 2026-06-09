import { motion } from "framer-motion";

import { revealSection, viewport } from "../../utils/motion";

import "./ProjectOverview.scss";

export default function ProjectOverview({ overview }) {
    if (!overview) {
        return null;
    }

    const { body, title } = overview;

    return (
        <motion.section
            className="project-overview"
            aria-labelledby="project-overview-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <motion.div
                    className="project-overview__content"
                    variants={revealSection}
                >
                    <motion.h3
                        className="project-overview__title"
                        id="project-overview-title"
                    >
                        {title}
                    </motion.h3>

                    {body && (
                        <p className="project-overview__body">
                            {body}
                        </p>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}
