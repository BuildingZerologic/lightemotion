import { motion } from "framer-motion";

import {
    revealCard,
    revealSection,
    staggerContainer,
    viewport,
} from "../../utils/motion";

import "./ProjectConcept.scss";

export default function ProjectConcept({ concept }) {
    if (!concept) {
        return null;
    }

    const { intro, pillars = [], title } = concept;

    return (
        <motion.section
            className="project-concept"
            aria-labelledby="project-concept-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <motion.div
                    className="project-concept__intro"
                    variants={revealSection}
                >
                    <motion.h3
                        className="project-concept__title"
                        id="project-concept-title"
                    >
                        {title}
                    </motion.h3>

                    {intro && (
                        <p className="project-concept__body">
                            {intro}
                        </p>
                    )}
                </motion.div>

                {pillars.length > 0 && (
                    <motion.div
                        className="project-concept__grid"
                        variants={staggerContainer}
                    >
                        {pillars.map((pillar) => (
                            <motion.article
                                className="project-concept__item"
                                key={pillar.label}
                                variants={revealCard}
                            >
                                 
                                <h3 className="project-concept__item-title">
                                    {pillar.title}
                                </h3>

                                <p className="project-concept__item-text">
                                    {pillar.description}
                                </p>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}
