import { motion } from "framer-motion";

import { revealSection, viewport } from "../../utils/motion";

import "./ProjectTechnical.scss";

export default function ProjectTechnical({ technical }) {
    if (!technical) {
        return null;
    }

    const { intro, items = [], title } = technical;

    return (
        <motion.section
            className="project-technical"
            aria-labelledby="project-technical-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <motion.div
                    className="project-technical__layout"
                    variants={revealSection}
                >
                    <div className="project-technical__intro">
                        <motion.h3
                            className="project-technical__title"
                            id="project-technical-title"
                        >
                            {title}
                        </motion.h3>

                        {intro && (
                            <p className="project-technical__body">
                                {intro}
                            </p>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="project-technical__list" aria-label="Technical details">
                            {items.map((item) => (
                                <div className="project-technical__item" key={item.label}>
                                    <p className="project-technical__label">
                                        {item.label}
                                    </p>

                                    <p className="project-technical__value">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}
