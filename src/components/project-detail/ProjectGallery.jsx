import { motion } from "framer-motion";

import {
    revealCard,
    revealSection,
    staggerContainer,
    viewportLow,
} from "../../utils/motion";

import "./ProjectGallery.scss";

export default function ProjectGallery({ images = [], title }) {
    if (!images.length) {
        return null;
    }

    return (
        <motion.section
            className="project-gallery"
            aria-labelledby="project-gallery-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
        >
            <div className="container">
                <motion.div
                    className="project-gallery__intro"
                    variants={revealSection}
                >
                    <motion.h3
                        className="project-gallery__title"
                        id="project-gallery-title"
                    >
                        Gallery
                    </motion.h3>
                </motion.div>

                <motion.div
                    className="project-gallery__grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportLow}
                >
                    {images.map((image) => (
                        <motion.figure
                            className={`project-gallery__item project-gallery__item--${image.aspect || "landscape"}`}
                            key={image.id}
                            variants={revealCard}
                        >
                            <div className="project-gallery__media">
                                <img
                                    className="project-gallery__image"
                                    src={image.src}
                                    alt={image.alt || `${title} gallery image`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </motion.figure>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
